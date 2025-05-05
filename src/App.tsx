import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import QuizPage from "./components/QuizPage";
import ResultPage from "./components/ResultPage";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;