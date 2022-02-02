import { FaBell } from "react-icons/fa";

export function Header() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        zIndex: 1,
        background: "#fff",
        boxShadow: "inset 0 -1px #e3e8ee",
        height: "4rem",
        marginBottom: "4rem",
        width: "100vw",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "0 1.5rem",
        boxSizing: "border-box",
      }}
    >
      <img src="/logo.png" alt="logo" style={{ width: "3rem" }} />
      <FaBell />
    </div>
  );
}
