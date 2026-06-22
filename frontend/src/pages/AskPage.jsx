import {
    Alert,
    Box,
    Button,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
    Chip,
    Stack
} from "@mui/material";

import { useEffect, useState } from "react";

import { getDocuments } from "../Services/documentService";

import { askQuestion } from "../api/ragApi";

import { getToken } from "../utils/auth";

import AnswerRenderer from "../components/AnswerRenderer";
import { deleteDocument } from "../Services/documentService";

import { delApi } from "../api/delApi";

export default function AskAI() {
    const [documents, setDocuments] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState("ALL");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const token = getToken();

    const samplePrompts = [
        "Summarize this document",
        "What are the key points?",
        "Explain this document in simple terms",
        "Teach me this topic",
        "List important commands",
        "Explain about this hymn",
        "ఈ డాక్యుమెంట్ సారాంశం చెప్పు",
        "ఈ డాక్యుమెంట్‌లో ముఖ్యమైన అంశాలు ఏమిటి?",
        "ఈ డాక్యుమెంట్‌లో ఎవరి పేరు ఉంది?",
        "ఈ డాక్యుమెంట్ ఏ టెక్నాలజీల గురించి చెబుతోంది?"
    ];

    useEffect(() => {
        loadDocuments();
    }, []);

    const loadDocuments = async () => {
        try {
            const data = await getDocuments(token);
            setDocuments(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAsk = async () => {
        if (!question.trim()) return;

        try {
            setLoading(true);
            const response = await askQuestion(question, selectedDocument, token);
            setAnswer(response.answer);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setErrorMessage("");
            setSuccessMessage("");

            const token = getToken();

            await deleteDocument(
                selectedDocument,
                token
            );

            setSuccessMessage("Document deleted successfully.");
            setDocuments(prev =>
                prev.filter(
                    doc =>
                        doc.fileName !== selectedDocument
                )
            );

            const updatedDocs = await getDocuments(token);
            setDocuments(updatedDocs);
            setSelectedDocument("ALL");
        } catch (err) {
            console.error(err);
            setErrorMessage("Unable to delete the document. Please try again.");
        }
    };




    return (
        <Box
            sx={{
                minHeight: "100vh",
                background:
                    "radial-gradient(circle at top left, rgba(59,130,246,0.16), transparent 28%), radial-gradient(circle at bottom right, rgba(14,165,233,0.12), transparent 25%), linear-gradient(180deg, #020617 0%, #050816 100%)",
                color: "#fff",
                py: { xs: 5, md: 8 }
            }}
        >
            <Box sx={{ maxWidth: 1080, mx: "auto", px: { xs: 3, md: 4 } }}>
                <Box sx={{ mb: 5, textAlign: { xs: "left", md: "center" } }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 800,
                            letterSpacing: "-0.04em",
                            lineHeight: 1.05,
                            maxWidth: 760,
                            mx: { md: "auto" },
                            background: "linear-gradient(135deg,#a855f7,#38bdf8)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}
                    >
                        Ask your documents anything and get instant AI insights.
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            mt: 2,
                            color: "rgba(226,232,240,0.78)",
                            fontSize: "1.05rem",
                            maxWidth: 720,
                            mx: { md: "auto" }
                        }}
                    >
                        Choose a document source, type your question, or tap a suggestion. The AI will return a clean, readable answer right below.
                    </Typography>
                </Box>

                <Paper
                    sx={{
                        p: { xs: 3, md: 4 },
                        borderRadius: 4,
                        border: "1px solid rgba(255,255,255,0.08)",
                        bgcolor: "rgba(15,23,42,0.9)",
                        backdropFilter: "blur(16px)",
                        boxShadow: "0 30px 80px rgba(0,0,0,0.22)"
                    }}
                >
                    <Stack spacing={3}>
                        <Box>
                            <Typography
                                variant="h5"
                                sx={{ mb: 1, fontWeight: 700, color: "#93c5fd" }}
                            >
                                Ask AI from your documents
                            </Typography>
                            <Typography variant="body2" sx={{ color: "rgba(226,232,240,0.74)" }}>
                                Select a source, enter a question, or tap a prompt to start the conversation.
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "grid",
                                gap: 2,
                                gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" }
                            }}
                        >
                            <Box>
                                <Typography
                                    variant="subtitle2"
                                    sx={{ mb: 1, color: "rgba(226,232,240,0.75)", textTransform: "uppercase", letterSpacing: "0.12em" }}
                                >
                                    Document source
                                </Typography>

                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: { xs: "column", sm: "row" },
                                        gap: 2,
                                        alignItems: "flex-end"
                                    }}
                                >
                                    <Box sx={{ flex: 1 }}>
                                        <Select
                                            fullWidth
                                            value={selectedDocument || "ALL"}
                                            onChange={(e) => setSelectedDocument(e.target.value)}
                                            sx={{
                                                borderRadius: 3,
                                                bgcolor: "rgba(255,255,255,0.04)",
                                                color: "#fff",
                                                '& .MuiSelect-select': { py: 1.5 }
                                            }}
                                        >
                                            <MenuItem value="ALL">
                                                All Documents
                                            </MenuItem>

                                            {documents.map((doc) => (

                                                <MenuItem
                                                    key={doc}
                                                    value={doc}
                                                >
                                                    {doc}
                                                </MenuItem>
                                                // <MenuItem key={doc} value={doc}>
                                                //     {doc}
                                                // </MenuItem>
                                            ))}
                                        </Select>
                                    </Box>

                                    <Button
                                        variant="contained"
                                        disabled={selectedDocument === "ALL"}
                                        onClick={handleDelete}
                                        sx={{
                                            minWidth: 140,
                                            py: 1.5,
                                            textTransform: "none",
                                            borderRadius: 3,
                                            background: 'linear-gradient(135deg,#0ea5e9,#7c3aed)',
                                            boxShadow: "0 14px 28px rgba(225, 223, 87, 0.18)",
                                            '&:hover': {
                                                background: "linear-gradient(135deg,#dc2626,#ea580c)"
                                            }
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                                {(successMessage || errorMessage) && (
                                    <Box sx={{ mt: 3 }}>
                                        {successMessage && (
                                            <Alert severity="success" sx={{ borderRadius: 3 }}>
                                                {successMessage}
                                            </Alert>
                                        )}
                                        {errorMessage && (
                                            <Alert severity="error" sx={{ borderRadius: 3, mt: successMessage ? 2 : 0 }}>
                                                {errorMessage}
                                            </Alert>
                                        )}
                                    </Box>
                                )}
                            </Box>

                            <Box>
                                <Typography
                                    variant="subtitle2"
                                    sx={{ mb: 1, color: "rgba(226,232,240,0.75)", textTransform: "uppercase", letterSpacing: "0.12em" }}
                                >
                                    Quick prompts
                                </Typography>
                                <Typography variant="body2" sx={{ color: "rgba(226,232,240,0.7)" }}>
                                    Tap any suggestion to quickly populate the question field.
                                </Typography>
                            </Box>
                        </Box>

                        <TextField
                            fullWidth
                            multiline
                            rows={5}
                            label="Ask a question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            sx={{
                                borderRadius: 3,
                                bgcolor: "rgba(255, 255, 255, 0.05)",
                                mb: 2,
                                "& .MuiInputLabel-root": {
                                    color: "rgba(255,255,255,0.7)",
                                },
                                "& .MuiInputBase-input": {
                                    color: "white",
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: 'rgba(255,255,255,0.16)' },
                                    '&:hover fieldset': { borderColor: 'rgba(56,189,248,0.72)' },
                                    '&.Mui-focused fieldset': { borderColor: '#38bdf8' }
                                },
                                input: { color: '#fff' },
                                label: { color: 'rgba(226,232,240,0.72)' }
                            }}
                        />

                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                            {samplePrompts.map((prompt) => (
                                <Chip
                                    key={prompt}
                                    label={prompt}
                                    clickable
                                    onClick={() => setQuestion(prompt)}
                                    sx={{
                                        px: 2,
                                        py: 1.3,
                                        fontWeight: 500,
                                        color: '#fff',
                                        bgcolor: 'rgba(15,23,42,0.74)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        boxShadow: '0 12px 24px rgba(0,0,0,0.16)',
                                        '&:hover': {
                                            background: 'linear-gradient(135deg,#2563eb,#06b6d4)',
                                            transform: 'translateY(-1px)'
                                        }
                                    }}
                                />
                            ))}
                        </Box>

                        <Button
                            variant="contained"
                            onClick={handleAsk}
                            disabled={loading}
                            sx={{
                                mt: 1,
                                py: 1.8,
                                borderRadius: 3,
                                textTransform: 'none',
                                fontWeight: 700,
                                fontSize: '1rem',
                                background: 'linear-gradient(135deg,#0ea5e9,#7c3aed)',
                                boxShadow: '0 16px 40px rgba(56,189,248,0.24)',
                                '&:hover': { background: 'linear-gradient(135deg,#2563eb,#9333ea)' }
                            }}
                        >
                            {loading ? 'Thinking...' : 'Ask AI'}
                        </Button>

                        <Paper
                            sx={{
                                p: 3,
                                borderRadius: 4,
                                border: '1px solid rgba(255,255,255,0.08)',
                                bgcolor: 'rgba(255,255,255,0.04)'
                            }}
                        >
                            <Typography sx={{ mb: 1.5, fontWeight: 700, color: '#c4b5fd' }}>
                                {answer ? 'AI Answer' : 'Answer preview'}
                            </Typography>
                            {answer ? (
                                <AnswerRenderer answer={answer} />
                            ) : (
                                <Typography sx={{ color: 'rgba(226,232,240,0.72)', lineHeight: 1.8 }}>
                                    Ask a question to render the AI response here. Responses are displayed in a clean, readable format with code and bullet support.
                                </Typography>
                            )}
                        </Paper>
                    </Stack>
                </Paper>
            </Box>
        </Box>
    );
}
