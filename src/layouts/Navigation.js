import { useState } from "react";
import { FaHome, FaPlusCircle, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

export function Navigation({ formOpen, setFormOpen }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        background: "#fff",
        boxShadow: "inset 0 1px #e3e8ee",
        height: "4rem",
        width: "100vw",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Link to="/">
        <FaHome color="#0f111e40" fontSize="1.5rem" />
      </Link>

      <FaPlusCircle
        color="#0f111e40"
        fontSize="1.5rem"
        onClick={() => {
          setFormOpen(!formOpen);
        }}
      />
      <Link to="/profile">
        <FaUser color="#0f111e40" fontSize="1.5rem" />
      </Link>
    </div>
  );
}
