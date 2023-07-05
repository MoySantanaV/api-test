import { useState, useEffect } from "react";
import { AppManagement } from "./Components/AppManagement/AppManagement";
import { GlobalStyles } from "../globalStyles";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { darkTheme, lightTheme } from "./assets/theme";
import "./App.css";

function App() {
  // Recupera el estado inicial de localStorage o establece el predeterminado en false
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("dark-mode");
    return saved ? JSON.parse(saved) : false;
  });

  // Guarda el estado en localStorage siempre que cambie
  useEffect(() => {
    localStorage.setItem("dark-mode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <div className="App">
        <GlobalStyles />
        <AppManagement
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
        />
      </div>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
