import { useState } from "react";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material";

import ChatIcon from "@mui/icons-material/Chat";
import { loginUser } from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({
        open: false,
        message: "",
        severity: "success",
    });
    const navigate = useNavigate();

    const showToast = (message, severity = "success") => {
        setToast({ open: true, message, severity });
    };

    const handleCloseToast = () => {
        setToast((current) => ({ ...current, open: false }));
    };

    const handleLogin = async () => {
        try {
            setLoading(true);

            const response = await loginUser({
                email,
                password,
            });

            console.log(response.data);

            showToast("OTP sent successfully", "success");

            setTimeout(() => {
                navigate("/verify-otp", {
                    state: {
                        email,
                    },
                });
            }, 1000);


        } catch (error) {
            console.error(error);

            showToast(
                error?.response?.data?.message ||
                "Login failed. Please try again",
                "error"
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
                    "linear-gradient(135deg, #0f172a 0%, #111827 50%, #1e293b 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Container maxWidth="sm">
                <Card
                    sx={{
                        borderRadius: 5,
                        backdropFilter: "blur(20px)",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
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
                                        "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mb: 2,
                                }}
                            >
                                <ChatIcon sx={{ color: "white", fontSize: 40 }} />
                            </Box>

                            <Typography
                                variant="h4"
                                sx={{
                                    color: "white",
                                    fontWeight: 700,
                                }}
                            >
                                RAG Assistant
                            </Typography>

                            <Typography
                                sx={{
                                    color: "rgba(255,255,255,0.7)",
                                    mt: 1,
                                }}
                            >
                                Login to continue
                            </Typography>
                        </Box>

                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{
                                mb: 2,
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
                                        borderColor: "#3b82f6",
                                    },
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                                        borderColor: "#3b82f6",
                                    },
                                },
                            }}
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            
                            onClick={handleLogin}
                            disabled={loading}
                            
                            sx={{
                                mb:3,
                                height: 50,
                                borderRadius: 10,
                                fontSize: 16,
                                fontWeight: 1000,
                                textTransform: "none",
                                background:
                                    "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                            }}
                        >
                            {loading ? (
                                <CircularProgress size={24} sx={{ color: "white" }} />
                            ) : (
                                "Login"
                            )}
                        </Button>

                        <Button
                            fullWidth
                            component={Link}
                            to="/about"
                            variant="outlined"
                            size="large"
                            sx={{
                                mb: 2,
                                height: 50,
                                borderRadius: 10,
                                fontSize: 16,
                                fontWeight: 700,
                                textTransform: "none",
                                color: "white",
                                borderColor: "rgba(255,255,255,0.2)",
                                '&:hover': {
                                  borderColor: "#3b82f6",
                                  background: "rgba(59,130,246,0.08)",
                                },
                            }}
                        >
                            View About Page
                        </Button>
                        
                        {/* <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            
                            onClick={registerUser}
                            disabled={loading}
                            sx={{
                                height: 55,
                                borderRadius: 10,
                                fontSize: 16,
                                fontWeight: 700,
                                textTransform: "none",
                                background:
                                    "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                            }}
                        >
                                Register
                            
                        </Button> */}

                        <Snackbar
                            open={toast.open}
                            autoHideDuration={4000}
                            onClose={handleCloseToast}
                            anchorOrigin={{ vertical: "top", horizontal: "center" }}
                        >
                            <Alert
                                onClose={handleCloseToast}
                                severity={toast.severity}
                                sx={{ width: "100%" }}
                            >
                                {toast.message}
                            </Alert>
                        </Snackbar>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}