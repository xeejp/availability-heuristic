defmodule UsabilityHeuristics.Main do
  alias UsabilityHeuristics.Actions

  @pages ["waiting", "description", "experiment", "result"]
  @sequence ["question1", "answered"]

  def pages, do: @pages
  def sequence, do: @sequence

  def init do
    %{
      page: "waiting",
      participants: %{},
      joined: 0,
      answered: 0,
      one: 0,
      two: 0,
      question_text: %{
          'question': %{
              text: "Rについて考えてください。",
           },
           'question1': %{
             text: "辞書中の英単語のうち、Rが",
              title: ["①", "②"],
              question: [
                "最初に来るものが多い。", 
                "3番目に来るものが多い。"
              ]
            },
            'answered': %{
              text: "あなたの回答は終了しました。他の参加者の回答が終了するまでこのままお待ちください。",
           },
           'waiting_text': "参加者の登録を待っています。\nこの画面のまましばらくお待ちください。",
           'description_text': "これから、1つ質問をします。\n選択肢のうち、あなたが最も好むものを選択してください。",
          },
        }
  end

  def new_participant(data) do
    %{
      question_text: data.question_text,
      sequence: "question1",
      question1: 0,
      active: true,
      joined: 1,
      qswap: false,
      one: data.one,
      two: data.two,
    }
  end

  def join(data, id) do
    unless Map.has_key?(data.participants, id) do
      new = new_participant(data)
      new = new |> Map.put(:joined, Map.size(data.participants) + 1)
      data = data |> Map.put(:participants, Enum.into(Enum.map(data.participants, fn {id, map} ->
        {id, Map.put(map, :joined, Map.size(data.participants) + 1)}
      end), %{}))
      put_in(data, [:participants, id], new)
      |> Actions.join(id, new)
    else
      data
    end
  end

  def wrap(data) do
    {:ok, %{"data" => data}}
  end
end