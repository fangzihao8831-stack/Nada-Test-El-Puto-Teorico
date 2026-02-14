import { ResultsView } from "@/components/test/ResultsView";

export default function ResultadoPage() {
  return (
    <ResultsView
      nextTestHref="/test"
      homeHref="/dashboard"
      fallosHref="/fallos"
    />
  );
}
