import { useState } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import { ThemeContextProvider } from "./Context/ThemeContext.js";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  if (!localStorage.getItem("theme")) {
    localStorage.setItem("theme", "light");
    setTheme("light");
  }
  const setNewTheme = (theme) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  };
  return (
    <ThemeContextProvider value={{ theme, setNewTheme }}>
      <Home />
    </ThemeContextProvider>
  );
}

export default App;
