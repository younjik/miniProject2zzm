import { PARTY_SIZES, ROUNDS } from "../../data.js";
import QuestionLogo from "../QuestionLogo.jsx";
import Dropdown from "../Dropdown.jsx";

export default function PartyScreen({ answers, onChange, onGoHome }) {
  return (
    <>
      <QuestionLogo onClick={onGoHome} />
      <h2 className="step-title">몇 명이서, 몇 차인가요?</h2>
      <p className="step-desc">인원수와 차수에 따라 어울리는 장소가 달라져요.</p>

      <p className="section-label">몇 명이서 모여요?</p>
      <Dropdown
        options={PARTY_SIZES}
        value={answers.partySize}
        onChange={(v) => onChange({ partySize: v })}
        placeholder="인원수를 선택해주세요"
      />

      <p className="section-label">몇 차인가요?</p>
      <Dropdown
        options={ROUNDS}
        value={answers.round}
        onChange={(v) => onChange({ round: v })}
        placeholder="차수를 선택해주세요"
      />
    </>
  );
}
