import ReactMarkdown from "react-markdown";

import {
  Box,
  Typography,
  Paper,
  Divider,
  IconButton,
  useTheme,
  alpha,
  Chip,
  Stack
} from "@mui/material";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CodeIcon from "@mui/icons-material/Code";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import SearchIcon from "@mui/icons-material/Search";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function AnswerRenderer({ answer }) {

  const theme = useTheme();

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const CodeBlock = ({ children }) => (

    <Box
      sx={{
        position: "relative",
        my: 1.5,
      }}
    >

      <Paper
        sx={{
          background: alpha(theme.palette.background.paper, 0.6),
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1,
            background: alpha(theme.palette.primary.main, 0.08),
            borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
          }}
        >

          <Stack direction="row" spacing={1} alignItems="center">
            <CodeIcon fontSize="small" />

            <Typography variant="body2">
              Command
            </Typography>
          </Stack>

          <IconButton
            size="small"
            onClick={() => copyToClipboard(children)}
          >
            <ContentCopyIcon fontSize="small" />
          </IconButton>

        </Box>

        <SyntaxHighlighter
          language="bash"
          style={oneDark}
          customStyle={{
            margin: 0,
            background: "transparent",
            padding: "18px"
          }}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>

      </Paper>

    </Box>
  );

  return (

    <Box
      sx={{
        background:
          "linear-gradient(135deg, #020617 0%, #0f172a 50%, #111827 100%)",

        borderRadius: 5,
        p: 4,
        color: "white",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
      }}
    >

      <ReactMarkdown

        components={{

          h1: ({ children }) => (

            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                mb: 3,
                background:
                  "linear-gradient(135deg,#a855f7,#38bdf8)",

                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {children}
            </Typography>
          ),

          h2: ({ children }) => (

            <Typography
              variant="h4"
              sx={{
                mt: 4,
                mb: 2,
                fontWeight: 700,
                color: "#8b5cf6",
              }}
            >
              {children}
            </Typography>
          ),

          h3: ({ children }) => (

            <Typography
              variant="h5"
              sx={{
                mt: 3,
                mb: 1,
                fontWeight: 600,
                color: "#38bdf8",
              }}
            >
              {children}
            </Typography>
          ),

          p: ({ children }) => (

            <Typography
              variant="body1"
              sx={{
                mb: 2,
                lineHeight: 1.9,
                color: "rgba(255,255,255,0.9)",
                fontSize: "1.05rem"
              }}
            >
              {children}
            </Typography>
          ),

          ul: ({ children }) => (

            <Box
              component="ul"
              sx={{
                pl: 3,
                mb: 2
              }}
            >
              {children}
            </Box>
          ),

          li: ({ children }) => (

            <Typography
              component="li"
              sx={{
                mb: 1.2,
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.92)"
              }}
            >
              {children}
            </Typography>
          ),

          code({ inline, children }) {

            return inline ? (

              <Chip
                label={children}
                size="small"
                sx={{
                  background: "#1e293b",
                  color: "#38bdf8",
                  fontFamily: "monospace"
                }}
              />

            ) : (

              <CodeBlock>
                {children}
              </CodeBlock>
            );
          },

          hr: () => (
            <Divider
              sx={{
                my: 4,
                borderColor: "rgba(255,255,255,0.1)"
              }}
            />
          )
        }}
      >
        {answer}
      </ReactMarkdown>

    </Box>
  );
}