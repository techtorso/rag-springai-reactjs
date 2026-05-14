import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";

import SecurityIcon from "@mui/icons-material/Security";

import { verifyLoginOtp } from "../api/authApi";

export default function VerifyOtpPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await verifyLoginOtp({
        email,
        otp,
      });

      console.log(response.data);

      // Save JWT token
      localStorage.setItem("token", response.data.token);

      setMessage("Login successful");

      // Redirect to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      console.error(error);

      setMessage(
        error?.response?.data?.message ||
          "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #020617 0%, #111827 50%, #1e293b 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            borderRadius: 5,
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <CardContent sx={{ p: 5 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 4,
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <SecurityIcon
                  sx={{
                    color: "white",
                    fontSize: 40,
                  }}
                />
              </Box>

              <Typography
                variant="h4"
                sx={{
                  color: "white",
                  fontWeight: 700,
                }}
              >
                Verify OTP
              </Typography>

              <Typography
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  mt: 1,
                  textAlign: "center",
                }}
              >
                Enter OTP sent to
                <br />
                {email}
              </Typography>
            </Box>

            <TextField
              fullWidth
              label="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              sx={{
                mb: 3,
                "& .MuiInputLabel-root": {
                  color: "rgba(255,255,255,0.7)",
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  "& fieldset": {
                    borderColor: "rgba(255,255,255,0.2)",
                  },
                  "&:hover fieldset": {
                    borderColor: "#06b6d4",
                  },
                },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleVerifyOtp}
              disabled={loading}
              sx={{
                height: 55,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 700,
                fontSize: 16,
                background:
                  "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Verify OTP"
              )}
            </Button>

            {message && (
              <Typography
                sx={{
                  mt: 3,
                  textAlign: "center",
                  color: "white",
                }}
              >
                {message}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}