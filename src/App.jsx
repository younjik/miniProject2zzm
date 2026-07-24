import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BottomNav from "./components/BottomNav.jsx";
import TabBar from "./components/TabBar.jsx";
import LaunchScreen from "./components/screens/LaunchScreen.jsx";
import MapScreen from "./components/screens/MapScreen.jsx";
import CommunityScreen from "./components/screens/CommunityScreen.jsx";
import FavoritesScreen from "./components/screens/FavoritesScreen.jsx";
import ProfileScreen from "./components/screens/ProfileScreen.jsx";
import ConceptScreen from "./components/screens/ConceptScreen.jsx";
import PartyScreen from "./components/screens/PartyScreen.jsx";
import RegionScreen from "./components/screens/RegionScreen.jsx";
import MoodCuisineScreen from "./components/screens/MoodCuisineScreen.jsx";
import SubmitScreen from "./components/screens/SubmitScreen.jsx";
import ResultsScreen from "./components/screens/ResultsScreen.jsx";
import DetailScreen from "./components/screens/DetailScreen.jsx";
import { getTargetCoord, getRecommendations } from "./lib/recommend.js";
import { restaurants } from "./data.js";

const FLOW = ["region", "concept", "mood", "party", "submit"];
const FAVORITES_KEY = "ijjeum_favorites";

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
  excludedCuisines: [],
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
      return (
        answers.cuisines.length > 0 ||
        answers.customCuisines.length > 0 ||
        answers.excludedCuisines.length > 0
      );
    default:
      return true;
  }
}

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 36 : -36, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -36 : 36, opacity: 0 }),
};

const fadeVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [mainView, setMainView] = useState("tabs"); // 'tabs' | 'wizard'
  const [activeTab, setActiveTab] = useState("launch"); // 'map' | 'favorites' | 'launch' | 'community' | 'profile'
  const [step, setStep] = useState("region");
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState(initialAnswers);
  const [results, setResults] = useState([]);
  const [detailId, setDetailId] = useState(null);
  const [favorites, setFavorites] = useState(loadFavorites);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const updateAnswers = (partial) => setAnswers((prev) => ({ ...prev, ...partial }));

  const toggleFavorite = (id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

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
    if (idx <= 0) {
      handleGoHome();
      return;
    }
    go(FLOW[idx - 1], -1);
  };

  const handleSubmit = () => {
    setResults(getRecommendations(answers));
    go("results", 1);
  };

  const openDetail = (id) => {
    setDirection(1);
    setDetailId(id);
  };

  const closeDetail = () => {
    setDirection(-1);
    setDetailId(null);
  };

  const startWizard = () => {
    setAnswers(initialAnswers);
    setResults([]);
    setDetailId(null);
    setDirection(1);
    setStep("region");
    setMainView("wizard");
  };

  const handleGoHome = () => {
    setAnswers(initialAnswers);
    setResults([]);
    setDetailId(null);
    setDirection(-1);
    setMainView("tabs");
  };

  const handleTabChange = (tab) => {
    if (mainView === "wizard") {
      setAnswers(initialAnswers);
      setResults([]);
      setDetailId(null);
      setDirection(-1);
      setMainView("tabs");
      setActiveTab(tab);
      return;
    }
    if (tab === activeTab) return;
    setActiveTab(tab);
  };

  const detailRestaurant = restaurants.find((r) => r.id === detailId) || null;
  const showWizardNav =
    mainView === "wizard" && detailId == null && ["region", "concept", "mood", "party"].includes(step);
  const showTabBar = detailId == null;

  const renderContent = () => {
    if (detailId != null && detailRestaurant) {
      return (
        <DetailScreen
          restaurant={detailRestaurant}
          onBack={closeDetail}
          isFavorite={favorites.includes(detailRestaurant.id)}
          onToggleFavorite={() => toggleFavorite(detailRestaurant.id)}
        />
      );
    }

    if (mainView === "wizard") {
      switch (step) {
        case "region":
          return <RegionScreen answers={answers} onChange={updateAnswers} onGoHome={handleGoHome} />;
        case "concept":
          return (
            <ConceptScreen
              value={answers.concept}
              onChange={(v) => updateAnswers({ concept: v })}
              onGoHome={handleGoHome}
            />
          );
        case "mood":
          return <MoodCuisineScreen answers={answers} onChange={updateAnswers} onGoHome={handleGoHome} />;
        case "party":
          return <PartyScreen answers={answers} onChange={updateAnswers} onGoHome={handleGoHome} />;
        case "submit":
          return <SubmitScreen answers={answers} onBack={() => go("party", -1)} onSubmit={handleSubmit} />;
        case "results":
          return (
            <ResultsScreen
              results={results}
              onBack={() => go("party", -1)}
              onRestart={handleGoHome}
              onOpenDetail={openDetail}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          );
        default:
          return null;
      }
    }

    switch (activeTab) {
      case "launch":
        return <LaunchScreen onStart={startWizard} />;
      case "map":
        return (
          <MapScreen
            onOpenDetail={openDetail}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        );
      case "favorites": {
        const favoriteRestaurants = restaurants.filter((r) => favorites.includes(r.id));
        return (
          <FavoritesScreen
            favoriteRestaurants={favoriteRestaurants}
            onOpenDetail={openDetail}
            onToggleFavorite={toggleFavorite}
          />
        );
      }
      case "community":
        return <CommunityScreen onOpenDetail={openDetail} />;
      case "profile":
        return <ProfileScreen favoriteCount={favorites.length} />;
      default:
        return null;
    }
  };

  const currentKey = detailId != null ? "detail" : mainView === "wizard" ? step : `tab-${activeTab}`;
  const useSlide = detailId != null || mainView === "wizard";
  const isLaunchTab = mainView === "tabs" && activeTab === "launch" && detailId == null;

  return (
    <div className="app-shell">
      <div className="screens-viewport">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={currentKey}
            custom={direction}
            variants={useSlide ? slideVariants : fadeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className={`screen${isLaunchTab ? " screen-center" : ""}`}
          >
            {renderContent()}
            {showWizardNav && (
              <BottomNav
                onBack={handleBack}
                onNext={handleNext}
                nextDisabled={!validateStep(step, answers)}
                nextLabel={step === "party" ? "이쯤하고 장소 찾기" : undefined}
                isFinal={step === "party"}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {showTabBar && <TabBar active={activeTab} onChange={handleTabChange} />}
    </div>
  );
}
