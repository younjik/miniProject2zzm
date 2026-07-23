import { Map, Heart, Users, User } from "lucide-react";
import pinUrl from "../assets/pin.png";

const LEFT_TABS = [
  { key: "map", label: "지도", Icon: Map },
  { key: "favorites", label: "즐겨찾기", Icon: Heart },
];

const RIGHT_TABS = [
  { key: "community", label: "커뮤니티", Icon: Users },
  { key: "profile", label: "프로필", Icon: User },
];

export default function TabBar({ active, onChange }) {
  const renderTab = ({ key, label, Icon }) => {
    const isActive = active === key;
    return (
      <button
        key={key}
        type="button"
        className={`tab-bar-item${isActive ? " active" : ""}`}
        onClick={() => onChange(key)}
      >
        <Icon size={22} strokeWidth={isActive ? 2.3 : 2} fill={isActive && key === "favorites" ? "currentColor" : "none"} />
        <span>{label}</span>
      </button>
    );
  };

  return (
    <nav className="tab-bar">
      {LEFT_TABS.map(renderTab)}
      <button type="button" className="tab-bar-center" onClick={() => onChange("launch")} aria-label="이쯤 찾아보기">
        <img src={pinUrl} alt="" />
      </button>
      {RIGHT_TABS.map(renderTab)}
    </nav>
  );
}
