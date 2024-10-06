import React from "react";
import "./Header.css";

function Header() {
  return (
    <div onClick={() => window.scroll(0, 0)} className="header">
      <h1>🎥 Entertainment++ 🎬</h1>
    </div>
  );
}

export default Header;
