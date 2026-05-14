import { useState } from "react";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import SendIcon from "@mui/icons-material/Send";

import { askQuestion } from "../api/ragApi";

export default function AskPage() {
  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleAskQuestion = async () => {
    if (!question.trim()) return;

    const userMessage = {
      type: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      setLoading(true);

      const response = await askQuestion(question);

      console.log(response.data);

      const aiMessage = {
        type: "ai",
        text: response.data.answer,
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

      setQuestion("");
    } catch (error) {
      console.error(error);

      const errorMessage = {
        type: "ai",
        text: "Failed to get AI response",
      };

      setMessages((prev) => [
        ...prev,
        errorMessage,
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h3"
        sx={{
          color: "white",
          fontWeight: 700,
          mb: 4,
        }}
      >
        Ask AI
      </Typography>

      <Card
        sx={{
          height: "75vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: 5,
          background:
            "linear-gradient(145deg, #111827, #1e293b)",
          border:
            "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Chat Messages */}
        <CardContent
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            p: 3,
          }}
        >
          {messages.length === 0 && (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <SmartToyIcon
                sx={{
                  fontSize: 80,
                  color: "#3b82f6",
                  mb: 2,
                }}
              />

              <Typography
                variant="h5"
                sx={{
                  color: "white",
                  mb: 1,
                }}
              >
                Ask questions from your documents
              </Typography>

              <Typography
                sx={{
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                Your RAG assistant is ready
              </Typography>
            </Box>
          )}

          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent:
                  message.type === "user"
                    ? "flex-end"
                    : "flex-start",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  maxWidth: "75%",
                  flexDirection:
                    message.type === "user"
                      ? "row-reverse"
                      : "row",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor:
                      message.type === "user"
                        ? "#3b82f6"
                        : "#8b5cf6",
                  }}
                >
                  {message.type === "user" ? (
                    <PersonIcon />
                  ) : (
                    <SmartToyIcon />
                  )}
                </Avatar>

                <Box
                  sx={{
                    p: 2,
                    borderRadius: 4,
                    background:
                      message.type === "user"
                        ? "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)"
                        : "rgba(255,255,255,0.08)",
                    color: "white",
                  }}
                >
                  <Typography>
                    {message.text}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}

          {loading && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mt: 2,
              }}
            >
              <CircularProgress
                size={24}
                sx={{ color: "#3b82f6" }}
              />

              <Typography
                sx={{
                  color: "white",
                }}
              >
                AI is thinking...
              </Typography>
            </Box>
          )}
        </CardContent>

        {/* Input Area */}
        <Box
          sx={{
            p: 3,
            borderTop:
              "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            gap: 2,
          }}
        >
          <TextField
            fullWidth
            placeholder="Ask anything about your documents..."
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAskQuestion();
              }
            }}
            sx={{
              "& .MuiInputBase-root": {
                color: "white",
                borderRadius: 3,
              },

              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor:
                    "rgba(255,255,255,0.2)",
                },

                "&:hover fieldset": {
                  borderColor: "#3b82f6",
                },
              },
            }}
          />

          <Button
            variant="contained"
            onClick={handleAskQuestion}
            disabled={loading}
            sx={{
              minWidth: 60,
              borderRadius: 3,
              background:
                "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
            }}
          >
            <SendIcon />
          </Button>
        </Box>
      </Card>
    </Container>
  );
}