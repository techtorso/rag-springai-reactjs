import { useState } from "react";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Typography,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { uploadDocument } from "../api/docApi";

export default function UploadPage() {
    const [selectedFile, setSelectedFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const [successMessage, setSuccessMessage] =
        useState("");

    const [errorMessage, setErrorMessage] =
        useState("");

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setErrorMessage("Please select a file");

            return;
        }

        try {
            setLoading(true);

            setErrorMessage("");
            setSuccessMessage("");

            const response = await uploadDocument(
                selectedFile
            );

            console.log(response.data);

            setSuccessMessage(
                response.data.message ||
                "File uploaded successfully"
            );
        } catch (error) {
            console.error(error);

            setErrorMessage(
                error?.response?.data?.message ||
                "File upload failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md">
            <Typography
                variant="h3"
                sx={{
                    color: "white",
                    fontWeight: 700,
                    mb: 4,
                }}
            >
                Upload Documents
            </Typography>

            <Card
                sx={{
                    borderRadius: 5,
                    background:
                        "linear-gradient(145deg, #111827, #1e293b)",
                    border:
                        "1px solid rgba(255,255,255,0.08)",
                    boxShadow:
                        "0 10px 40px rgba(0,0,0,0.3)",
                }}
            >
                <CardContent sx={{ p: 5 }}>
                    <Box
                        sx={{
                            border: "2px dashed #3b82f6",
                            borderRadius: 5,
                            p: 6,
                            textAlign: "center",
                            background:
                                "rgba(59,130,246,0.05)",
                        }}
                    >
                        <CloudUploadIcon
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
                                fontWeight: 600,
                                mb: 2,
                            }}
                        >
                            Upload Your Documents
                        </Typography>

                        <Typography
                            sx={{
                                color: "rgba(255,255,255,0.7)",
                                mb: 4,
                            }}
                        >
                            Supported formats: PDF : Upload a Proper PDF File, 
                            Pro Tip: Open the PDF and you should ba able to select the text within..
                            Only that PDF is valid format.

                            Some PDF's contains scanned immages, the will not work
                        </Typography>
                        <Typography>
                        <Button
                            variant="outlined"
                            component="label"
                            sx={{
                                borderRadius: 3,
                                px: 5,
                                py: 1.5,
                                textTransform: "none",
                                fontWeight: 600,
                                borderColor: "#3b82f6",
                                color: "#3b82f6",
                                mb: 3,
                            }}
                        >
                            Select File
                            
                            <input
                                type="file"
                                hidden
                                onChange={handleFileChange}
                            />  
                        </Button>
                        </Typography>

                        {selectedFile && (
                            <Typography
                                sx={{
                                    color: "white",
                                    mb: 3,
                                }}
                            >
                                Selected File: {selectedFile.name}
                            </Typography>
                        )}

                        <Button
                            variant="contained"
                            onClick={handleUpload}
                            disabled={loading}
                            sx={{
                                height: 50,
                                borderRadius: 3,
                                px: 5,
                                fontWeight: 700,
                                textTransform: "none",
                                background:
                                    "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                            }}
                        >
                            {loading ? (
                                <CircularProgress
                                    size={24}
                                    sx={{ color: "white" }}
                                />
                            ) : (
                                "Upload Document"
                            )}
                        </Button>

                        {successMessage && (
                            <Alert
                                severity="success"
                                sx={{
                                    mt: 4,
                                    borderRadius: 3,
                                }}
                            >
                                {successMessage}
                            </Alert>
                        )}

                        {errorMessage && (
                            <Alert
                                severity="error"
                                sx={{
                                    mt: 4,
                                    borderRadius: 3,
                                }}
                            >
                                {errorMessage}
                            </Alert>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}