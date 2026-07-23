import logo from "../assets/logo.png";

export default function Logo({ className = "", style }) {
  return <img src={logo} alt="이쯤" className={className} style={style} />;
}
