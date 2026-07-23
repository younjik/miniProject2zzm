const DOT_STEPS = ["concept", "round", "region", "mood", "cuisine", "submit"];

export default function ProgressDots({ step }) {
  if (step === "intro") {
    return <div className="progress-dots" style={{ visibility: "hidden" }} />;
  }
  const activeIdx = DOT_STEPS.indexOf(step);
  const finished = step === "results" || step === "detail";

  return (
    <div className="progress-dots">
      {DOT_STEPS.map((s, i) => {
        const done = finished || i < activeIdx;
        const active = !finished && i === activeIdx;
        return <span key={s} className={`dot${done ? " done" : ""}${active ? " active" : ""}`} />;
      })}
    </div>
  );
}
