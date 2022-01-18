import { useEffect, useState } from "react";
import { AddForm } from "../pages/AddForm";
import { Header } from "./Header";
import { Navigation } from "./Navigation";

export function BaseLayout({ children }) {
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    const scrollY = document.body.style.top;
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
  }, []);
  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <Header />
      {formOpen && <AddForm formOpen={formOpen} setFormOpen={setFormOpen} />}
      <div className="content" style={{ margin: "4rem 0" }}>
        {children}
      </div>
      <Navigation formOpen={formOpen} setFormOpen={setFormOpen} />
    </div>
  );
}
