defmodule UsabilityHeuristics.Host do
  alias UsabilityHeuristics.Main
  alias UsabilityHeuristics.Actions

  require Logger

  # Actions
  def fetch_contents(data) do
    data
    |> Actions.update_host_contents()
  end

  def change_page(data, page) do
    if page in Main.pages do
      %{data | page: page}
      |> Actions.change_page(page)
    else
      data
    end
  end

  def all_reset(data) do
    :random.seed(:os.timestamp)
    flag = true
    data = data |> Map.put(:participants, Enum.into(Enum.map(data.participants, fn { id, _ } ->
      {id,
        %{
          question_text: data.question_text,
          sequence: "question1",
          question1: 0,
          active: true,
          joined: Map.size(data.participants),
          qswap: true,
          one: 0,
          two: 0,
        }
      }
    end), %{}))
                |> Map.put(:joined, Map.size(data.participants))
                |> Map.put(:answered, 0)
                |> Map.put(:one, 0)
                |> Map.put(:two, 0)
    data = data |> Map.put(:participants, data.participants
                |> Map.merge(data.participants
                |> Enum.shuffle
                |> Enum.take_every(2)
                |> Enum.map(fn {id, value} -> {id, Map.put(value, :qswap, false)} end)
                |> Enum.into(%{})))
    Actions.all_reset(data)
  end

  def send_result(data, result) do
    data = data  |> Map.put(:participants, Enum.into(Enum.map(data.participants, fn { id, value } ->
      {id, value |> Map.put(:one, result["one"]) |> Map.put(:two, result["two"])} end), %{}))
                 |> Map.put(:one, result["one"]) |> Map.put(:two, result["two"])
                 |> Map.put(:answered, 0)
    Actions.send_result(data, result)
  end

  def update_question(data, question_text) do
    data = data |> Map.put(:question_text, question_text)
                     |> Map.put(:participants, Enum.into(Enum.map(data.participants, fn { id, value } ->
                       { id, value |> Map.put(:question_text, question_text) } end), %{}))
    Actions.update_question(data, question_text)
  end

  # Utilities
  def format_contents(data) do
    data
  end
end