import { PARTY_SIZES, ROUNDS } from "../../data.js";
import QuestionLogo from "../QuestionLogo.jsx";
import Dropdown from "../Dropdown.jsx";

export default function PartyScreen({ answers, onChange, onGoHome }) {
  return (
    <>
      <QuestionLogo onClick={onGoHome} />
      <h2 className="step-title">몇 명이서, 몇 차쯤인가요?</h2>
      <p className="step-desc">선택하지 않아도 바로 장소를 찾을 수 있어요.</p>

      <p className="section-label">
        몇 명이서 모여요? <span className="optional-tag">(선택)</span>
      </p>
      <Dropdown
        options={PARTY_SIZES}
        value={answers.partySize}
        onChange={(v) => onChange({ partySize: v })}
        placeholder="상관없어요"
      />

      <p className="section-label">
        몇 차인가요? <span className="optional-tag">(선택)</span>
      </p>
      <Dropdown
        options={ROUNDS}
        value={answers.round}
        onChange={(v) => onChange({ round: v })}
        placeholder="상관없어요"
      />

      <p className="party-optional-hint">
        건너뛰면 앞서 선택한 취향으로 추천해드려요
      </p>
    </>
  );
}
