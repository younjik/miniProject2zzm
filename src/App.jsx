import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BottomNav from "./components/BottomNav.jsx";
import IntroScreen from "./components/screens/IntroScreen.jsx";
import ConceptScreen from "./components/screens/ConceptScreen.jsx";
import PartyScreen from "./components/screens/PartyScreen.jsx";
import RegionScreen from "./components/screens/RegionScreen.jsx";
import MoodCuisineScreen from "./components/screens/MoodCuisineScreen.jsx";
import SubmitScreen from "./components/screens/SubmitScreen.jsx";
import ResultsScreen from "./components/screens/ResultsScreen.jsx";
import DetailScreen from "./components/screens/DetailScreen.jsx";
import { getTargetCoord, getRecommendations } from "./lib/recommend.js";
import { restaurants } from "./data.js";

const FLOW = ["intro", "region", "concept", "mood", "party", "submit"];

const initialAnswers = {
  concept: null,
  round: null,
  partySize: null,
  regionMode: "single",
  region1: "",
  regionA: "",
  regionB: "",
  region1Coord: null,
  regionACoord: null,
  regionBCoord: null,
  moods: [],
  customMoods: [],
  cuisines: [],
  customCuisines: [],
  menuTags: [],
};

function validateStep(step, answers) {
  switch (step) {
    case "concept":
      return !!answers.concept;
    case "party":
      return !!answers.round && !!answers.partySize;
    case "region":
      return !!getTargetCoord(answers);
    case "mood":
      return answers.cuisines.length > 0 || answers.customCuisines.length > 0;
    default:
      return true;
  }
}

const variants = {
  enter: (dir) => ({ x: dir > 0 ? 36 : -36, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -36 : 36, opacity: 0 }),
};

export default function App() {
  const [step, setStep] = useState("intro");
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState(initialAnswers);
  const [results, setResults] = useState([]);
  const [detailId, setDetailId] = useState(null);

  const updateAnswers = (partial) => setAnswers((prev) => ({ ...prev, ...partial }));

  const go = (nextStep, dir) => {
    setDirection(dir);
    setStep(nextStep);
  };

  const handleNext = () => {
    if (!validateStep(step, answers)) return;
    const idx = FLOW.indexOf(step);
    go(FLOW[idx + 1], 1);
  };

  const handleBack = () => {
    const idx = FLOW.indexOf(step);
    go(idx <= 1 ? "intro" : FLOW[idx - 1], -1);
  };

  const handleSubmit = () => {
    setResults(getRecommendations(answers));
    go("results", 1);
  };

  const handleOpenDetail = (id) => {
    setDetailId(id);
    go("detail", 1);
  };

  const handleRestart = () => {
    setAnswers(initialAnswers);
    setResults([]);
    setDetailId(null);
    go("intro", -1);
  };

  const showBottomNav = ["region", "concept", "mood", "party"].includes(step);
  const detailRestaurant = restaurants.find((r) => r.id === detailId) || null;

  const renderScreen = () => {
    switch (step) {
      case "intro":
        return <IntroScreen onStart={() => go("region", 1)} />;
      case "region":
        return <RegionScreen answers={answers} onChange={updateAnswers} onGoHome={handleRestart} />;
      case "concept":
        return (
          <ConceptScreen
            value={answers.concept}
            onChange={(v) => updateAnswers({ concept: v })}
            onGoHome={handleRestart}
          />
        );
      case "mood":
        return <MoodCuisineScreen answers={answers} onChange={updateAnswers} onGoHome={handleRestart} />;
      case "party":
        return <PartyScreen answers={answers} onChange={updateAnswers} onGoHome={handleRestart} />;
      case "submit":
        return <SubmitScreen answers={answers} onBack={() => go("party", -1)} onSubmit={handleSubmit} />;
      case "results":
        return (
          <ResultsScreen
            results={results}
            onBack={() => go("party", -1)}
            onRestart={handleRestart}
            onOpenDetail={handleOpenDetail}
          />
        );
      case "detail":
        return <DetailScreen restaurant={detailRestaurant} onBack={() => go("results", -1)} />;
      default:
        return null;
    }
  };

  return (
    <div className="app-shell">
      <div className="screens-viewport">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className={`screen${step === "intro" ? " screen-center" : ""}`}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>

      {showBottomNav && (
        <BottomNav onBack={handleBack} onNext={handleNext} nextDisabled={!validateStep(step, answers)} />
      )}
    </div>
  );
}
