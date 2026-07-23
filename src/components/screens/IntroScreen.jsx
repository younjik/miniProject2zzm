import { motion } from "framer-motion";
import wordmarkUrl from "../../assets/wordmark.png";

export default function IntroScreen({ onStart }) {
  return (
    <div className="hero">
      <motion.img
        src={wordmarkUrl}
        alt="어디서 모일지 고민된다면, 이쯤"
        className="wordmark"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      />
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
