import { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  LinearProgress,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl
} from "@mui/material";
import { questions } from "../data/questions";
import { useNavigate } from "react-router-dom";

function QuizPage() {
  const total = parseInt(localStorage.getItem("quiz_question_count") || "20");
  const navigate = useNavigate();

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const getShuffledIndexes = () => {
    const cached = localStorage.getItem("quiz_shuffled_indexes");
    if (cached) return JSON.parse(cached);
    const arr = Array.from({ length: questions.length }, (_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    const shuffled = arr.slice(0, Math.min(total, arr.length));
    localStorage.setItem("quiz_shuffled_indexes", JSON.stringify(shuffled));
    return shuffled;
  };

  const shuffledIndexes = getShuffledIndexes();
  const selectedQuestions = shuffledIndexes.map((i: number) => questions[i]);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timer, setTimer] = useState(15);

  const current = selectedQuestions[index];

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          validate(); // auto-validate only if answer selected
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current!);
  }, [index]);

  const toggleChoice = (i: number) => {
    setSelected([i]);
  };

  const isAnswerCorrect = () => {
    return selected[0] === current.correctAnswers[0];
  };

  const validate = () => {
    
    if (selected.length === 0) return; // ⛔️ Skip if no answer selected

    clearInterval(timerRef.current!); // ✅ Stop timer bar

    const correct = isAnswerCorrect();
    setIsCorrect(correct);
    if (correct) setScore((s) => s + 1);
    setShowResult(true);
    (document.activeElement as HTMLElement)?.blur(); // ✅ Enlève le focus mobile
    setTimeout(() => {
      setSelected([]);
      setShowResult(false);
      setIsCorrect(null);
      setTimer(15);
      if (index + 1 < selectedQuestions.length) {
        setIndex((i) => i + 1);
      } else {
        finishQuiz();
      }
    }, 1500);
  };

  const finishQuiz = () => {
    const history = JSON.parse(localStorage.getItem("quiz_results") || "[]");
    history.push({ date: new Date().toISOString(), score, total });
    localStorage.setItem("quiz_results", JSON.stringify(history));
    localStorage.removeItem("quiz_shuffled_indexes");
    navigate("/result"); // 🔁 Redirection correcte
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ backgroundColor: "#0f1218" }}
    >
      <Box
        p={4}
        bgcolor="#000"
        borderRadius={3}
        width="100%"
        maxWidth="600px"
        boxShadow={4}
        color="white"
      >
        <Typography variant="h5" gutterBottom>
          Question {index + 1} / {selectedQuestions.length}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={((index + 1) / selectedQuestions.length) * 100}
          sx={{ mb: 2 }}
        />

        <Typography variant="body1" gutterBottom>
          {current.question}
        </Typography>

        <FormControl component="fieldset">
          <RadioGroup
            value={selected[0]}
            onChange={(e) => toggleChoice(parseInt(e.target.value))}
          >
            {current.choices.map((choice: string, i: number) => (
              <FormControlLabel
                key={i}
                value={i}
                control={<Radio />}
                label={choice}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <Box mt={3} display="flex" gap={2}>
          <Button variant="contained" onClick={validate} disabled={showResult}>
            Validate
          </Button>
          <Button variant="text" color="error" onClick={finishQuiz}>
            End Quiz
          </Button>
        </Box>

        <Box mt={2}>
          <LinearProgress
            variant="determinate"
            value={(timer / 15) * 100}
            color="error"
            sx={{ height: 10, borderRadius: 5 }}
          />
          <Typography variant="caption" color="error" display="block" mt={1}>
            Time left: {timer}s
          </Typography>
        </Box>

        {showResult && (
          <Typography mt={2} color={isCorrect ? "lightgreen" : "error"}>
            {isCorrect ? "✅ Correct answer!" : "❌ Wrong answer"}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default QuizPage;
