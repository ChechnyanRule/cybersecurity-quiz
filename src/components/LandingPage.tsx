import { useState } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  MenuItem,
  Select,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { theme } from "../styles/theme";
import { useNavigate } from "react-router-dom";
function LandingPage() {
  const navigate = useNavigate();
  const [questionCount, setQuestionCount] = useState(100);
  const handleStart = () => {
    localStorage.setItem("quiz_question_count", questionCount.toString());
    navigate("/quiz");
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ py: 10 }}>
        <Typography variant="h3" gutterBottom>
          🎯 Cybersecurity Quizz
        </Typography>
        <Typography variant="body1" gutterBottom>
          Assess your foundational knowledge of cybersecurity through a series
          of technical and practical questions.
        </Typography>
        <Box mt={4}>
          <Typography variant="subtitle1">
            Select number of questions:
          </Typography>
          <Select
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            sx={{ minWidth: 120, mr: 2 }}
          >
            {[10, 20, 50, 100, 150, 200].map((num) => (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            ))}
          </Select>
          <Button variant="contained" onClick={handleStart}>
            Start Quiz
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default LandingPage;
