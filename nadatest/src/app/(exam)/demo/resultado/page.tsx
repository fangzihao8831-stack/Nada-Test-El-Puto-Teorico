import { ResultsView } from "@/components/test/ResultsView";

export default function DemoResultadoPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <ResultsView nextTestHref="/demo" homeHref="/" />
    </div>
  );
}
