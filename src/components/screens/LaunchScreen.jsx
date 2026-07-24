import wordmarkUrl from "../../assets/wordmark.png";

export default function LaunchScreen({ onStart }) {
  return (
    <div className="hero">
      <img src={wordmarkUrl} alt="어디서 모일지 고민된다면, 이쯤" className="wordmark" />
      <p className="hero-desc">
        "오늘 갑자기 번개인데, 어디서 만나지?"
        <br />
        리뷰 속 분위기를 분석해
        <br />
        우리 모임에 딱 맞는 장소를 추천해줘요.
      </p>
      <button type="button" className="btn-primary btn-large" onClick={onStart}>
        이쯤 찾아보기
      </button>
    </div>
  );
}
