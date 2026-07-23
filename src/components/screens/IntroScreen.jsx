import { motion } from "framer-motion";
import logoUrl from "../../assets/logo.png";

const FLOW_STEPS = ["어디서 모일까?", "조건 선택", "이쯤 찾아볼게요!", "여기쯤 어때?"];

export default function IntroScreen({ onStart }) {
  return (
    <div className="hero">
      <motion.img
        src={logoUrl}
        alt="이쯤"
        className="logo-hero"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        📍 이쯤
      </motion.h1>
      <motion.p
        className="slogan"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
      >
        어디서 모일지 고민된다면, 이쯤이에요.
      </motion.p>
      <motion.p
        className="hero-desc"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.26 }}
      >
        "오늘 갑자기 번개인데, 어디서 만나지?"
        <br />
        리뷰 속 <b>분위기</b>를 분석해 우리 모임에 딱 맞는 장소를 추천해줘요.
      </motion.p>
      <motion.div
        className="hero-flow"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.34 }}
      >
        {FLOW_STEPS.map((s, i) => (
          <span key={s}>
            {i > 0 && <span className="arrow"> → </span>}
            {s}
          </span>
        ))}
      </motion.div>
      <motion.button
        className="btn-primary btn-large"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.42 }}
        onClick={onStart}
      >
        시작하기
      </motion.button>
    </div>
  );
}
