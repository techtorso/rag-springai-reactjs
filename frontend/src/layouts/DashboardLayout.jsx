import { useState } from "react";

import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import { Outlet, useLocation, useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ChatIcon from "@mui/icons-material/Chat";
import LogoutIcon from "@mui/icons-material/Logout";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PeopleIcon from "@mui/icons-material/People";
import { GitBranch } from "lucide-react";
import { Info } from "lucide-react";
const expandedWidth = 260;
const collapsedWidth = 90;

export default function DashboardLayout() {
  const navigate = useNavigate();

  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  const menuItems = [
    {
      text: "Upload Documents",
      icon: <UploadFileIcon />,
      path: "/dashboard/upload",
    },
    {
      text: "Ask AI",
      icon: <ChatIcon />,
      path: "/dashboard/ask",
    },
    {
      text: "User Management",
      icon: <PeopleIcon />,
      path: "/dashboard/users",
    },
    {
      text: "About The APP",
      icon: <Info />,
      path: "/about"
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background: "#020617",
      }}
    >
      <CssBaseline />

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: collapsed
            ? collapsedWidth
            : expandedWidth,

          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: collapsed
              ? collapsedWidth
              : expandedWidth,

            transition: "0.3s",

            overflowX: "hidden",

            background:
              "linear-gradient(180deg, #020617 0%, #0f172a 100%)",

            color: "white",

            borderRight:
              "1px solid rgba(255,255,255,0.08)",
          },
        }}
      >
        {/* Logo */}
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: collapsed
              ? "center"
              : "space-between",

            px: 2,
          }}
        >
          {!collapsed && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "#3b82f6",
                }}
              >
                <SmartToyIcon />
              </Avatar>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                }}
              >
                RAG AI
              </Typography>
            </Box>
          )}

          <IconButton
            onClick={toggleSidebar}
            sx={{ color: "white" }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>

        <Divider
          sx={{
            borderColor:
              "rgba(255,255,255,0.08)",
          }}
        />

        {/* Navigation */}
        <List sx={{ mt: 2 }}>
          {menuItems.map((item) => {
            const active =
              location.pathname === item.path;

            return (
              <Tooltip
                title={
                  collapsed ? item.text : ""
                }
                placement="right"
                key={item.text}
              >
                <ListItemButton
                  onClick={() =>
                    navigate(item.path)
                  }
                  sx={{
                    mx: 1.5,
                    mb: 1,
                    borderRadius: 3,

                    background: active
                      ? "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)"
                      : "transparent",

                    justifyContent: collapsed
                      ? "center"
                      : "flex-start",

                    px: collapsed ? 2 : 3,

                    "&:hover": {
                      background:
                        "rgba(255,255,255,0.08)",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "white",
                      minWidth: collapsed
                        ? 0
                        : 40,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  {!collapsed && (
                    <ListItemText
                      primary={item.text}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            );
          })}
        </List>

        {/* Logout */}
        <Box sx={{ mt: "auto", mb: 3 }}>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              mx: 1.5,
              borderRadius: 3,

              justifyContent: collapsed
                ? "center"
                : "flex-start",

              px: collapsed ? 2 : 3,

              "&:hover": {
                background:
                  "rgba(255,255,255,0.08)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "white",
                minWidth: collapsed ? 0 : 40,
              }}
            >
              <LogoutIcon />
            </ListItemIcon>

            {!collapsed && (
              <ListItemText primary="Logout" />
            )}
          </ListItemButton>
        </Box>
      </Drawer>

      {/* Main Area */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Topbar */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            background:
              "rgba(15,23,42,0.7)",

            backdropFilter: "blur(20px)",

            borderBottom:
              "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Toolbar>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "white",
              }}
            >
              RAG Application
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            p: 4,
            background:
              "linear-gradient(180deg, #020617 0%, #0f172a 100%)",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}