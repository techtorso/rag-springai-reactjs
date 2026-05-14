import { Box, Typography } from "@mui/material";

export default function DashboardPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        p: 5,
      }}
    >
      <Typography variant="h3" fontWeight="bold">
        Dashboard
      </Typography>

      <Typography sx={{ mt: 2 }}>
        Login successful. JWT token stored.
      </Typography>
    </Box>
  );
}