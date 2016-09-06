defmodule UsabilityHeuristics do
  use Xee.ThemeScript
  require Logger

  require_file "scripts/main.exs"
  require_file "scripts/host.exs"
  require_file "scripts/participant.exs"
  require_file "scripts/actions.exs"

  alias UsabilityHeuristics.Main
  alias UsabilityHeuristics.Host
  alias UsabilityHeuristics.Participant

  # Callbacks
  def script_type do
    :message
  end

  def install, do: nil

  def init do
    {:ok, %{"data" => Main.init()}}
  end

  def wrap_result({:ok, _} = result), do: result
  def wrap_result(result), do: Main.wrap(result)

  def join(data, id) do
    wrap_result(Main.join(data, id))
  end

  # Host router
  def handle_received(data, %{"action" => action, "params" => params}) do
#    Logger.debug("[Allais Paradox] #{action} #{params}")
    result = case {action, params} do
      {"fetch contents", _} -> Host.fetch_contents(data)
      {"change page", page} -> Host.change_page(data, page)
      {"all reset", _}      -> Host.all_reset(data)
      {"send result", result} -> Host.send_result(data, result)
      {"update question", question_text} -> Host.update_question(data, question_text)
      _ -> {:ok, %{"data" => data}}
    end
    wrap_result(result)
  end

  # Participant router
  def handle_received(data, %{"action" => action, "params" => params}, id) do
#    Logger.debug("[Allais Paradox] #{action} #{params}")
    result = case {action, params} do
      {"fetch contents", _} -> Participant.fetch_contents(data, id)
      {"next question", selected} -> Participant.next_question(data, id, selected)
      _ -> {:ok, %{"data" => data}}
    end
    wrap_result(result)
  end
end
