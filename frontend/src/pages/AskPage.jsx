import {
    Box,
    Button,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography
} from "@mui/material";

import axios from "axios";

import { useEffect, useState } from "react";

import { getDocuments } from "../services/documentService";

import { askQuestion } from "../api/ragApi";

import { getToken } from "../utils/auth";

import AnswerRenderer from "../components/AnswerRenderer";


export default function AskAI() {

    const [documents, setDocuments] = useState([]);

    const [selectedDocument, setSelectedDocument] =
        useState("ALL");

    const [question, setQuestion] = useState("");

    const [answer, setAnswer] = useState("");

    const [loading, setLoading] = useState(false);

    const token = getToken();

    useEffect(() => {

        loadDocuments();

    }, []);

    const loadDocuments = async () => {

        try {

            const data =
                await getDocuments(token);

            setDocuments(data);

        } catch (err) {

            console.error(err);
        }
    };

    const handleAsk = async () => {

        if (!question.trim()) return;

        try {

            setLoading(true);

            const response =
                await askQuestion(
                    question,
                    selectedDocument,
                    token
                );

            setAnswer(response.answer);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);
        }
    };

    return (

        <Box p={3}>

            <Typography variant="h4" mb={3}>
                Ask AI
            </Typography>

            <Paper sx={{ p: 3 }}>

                <Typography mb={1}>
                    Select Document
                </Typography>

                <Select
                    fullWidth
                    value={selectedDocument}
                    onChange={(e) =>
                        setSelectedDocument(
                            e.target.value
                        )
                    }
                    sx={{ mb: 3 }}
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
                    ))}

                </Select>

                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Ask a question"
                    value={question}
                    onChange={(e) =>
                        setQuestion(e.target.value)
                    }
                />

                <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={handleAsk}
                    disabled={loading}
                >

                    {loading
                        ? "Thinking..."
                        : "Ask AI"}

                </Button>

            </Paper>

            {answer && (

                <Box mt={4}>

                    <AnswerRenderer answer={answer} />

                </Box>
            )}

        </Box>
    );
}