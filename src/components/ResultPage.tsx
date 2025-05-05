import { useEffect, useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";

function ResultPage() {
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [time, setTime] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("quiz_results") || "[]");
    const last = history[history.length - 1];
    if (last) {
      setScore(last.score);
      setTotal(last.total);
      setTime(last.time ?? 0);
    }

    confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
  }, []);

  const getRank = (score: number, total: number) => {
    const ratio = score / total;
    if (ratio >= 0.9) return "🧠 Cyber Mastermind";
    if (ratio >= 0.75) return "🔐 Security Expert";
    if (ratio >= 0.5) return "🛡️ Security Enthusiast";
    if (ratio >= 0.25) return "👀 Security Newbie";
    return "💤 Wake Up, Hacker";
  };

  return (
    <Box p={4} display="flex" justifyContent="center">
      <Paper sx={{ p: 4, textAlign: "center", maxWidth: 500 }}>
        <Typography variant="h4" gutterBottom>Quiz Complete!</Typography>
        <Typography variant="h6" gutterBottom>Score: {score} / {total}</Typography>
        <Typography variant="body1" gutterBottom>Time Spent: {Math.floor(time / 60)}m {time % 60}s</Typography>
        <Typography variant="h6" color="primary" gutterBottom>Your Rank: {getRank(score, total)}</Typography>
        <Button variant="contained" sx={{ mt: 3 }} onClick={() => navigate("/")}>
          Restart Quiz
        </Button>
      </Paper>
    </Box>
  );
}

export default ResultPage;
