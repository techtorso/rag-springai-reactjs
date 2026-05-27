import React, { useEffect, useState } from "react";

import {
  Avatar,
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleOutlined from "@mui/icons-material/CheckCircleOutlined";
import PersonIcon from "@mui/icons-material/Person";

import {
  createUser,
  deleteUser,
  disableUser,
  enableUser,
  getUsers,
  updateRole,
} from "../../Services/userService";

import { getToken } from "../../utils/auth";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [updatingRoleId, setUpdatingRoleId] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState({ id: "", name: "" });
  const [error, setError] = useState("");
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "USER",
  });

  const getUserId = (user) => user.id || user._id || user.userId || "";

  const getUserDisplayName = (user) =>
    user.username || user.name || user.email || user.userId || "Unknown";

  const getUserRole = (user) => {
    if (Array.isArray(user.role)) return user.role[0] || "USER";
    if (Array.isArray(user.roles)) return user.roles[0] || "USER";
    return user.role || user.roles || "USER";
  };

  const showToast = (message, severity = "success") => {
    setToast({ open: true, message, severity });
  };

  const getBackendErrorMessage = (error, defaultMessage = "An unexpected error occurred.") => {
    if (!error) return defaultMessage;

    const responseData = error?.response?.data;
    if (typeof responseData === "string" && responseData.trim()) {
      return responseData;
    }

    if (responseData?.message) {
      return responseData.message;
    }

    if (responseData?.error) {
      return responseData.error;
    }

    if (responseData?.detail) {
      return responseData.detail;
    }

    if (Array.isArray(responseData?.errors)) {
      return responseData.errors.map((item) => item.message || item).join(", ");
    }

    return error?.message || defaultMessage;
  };

  const handleUpdateRole = async (id, role) => {
    setUpdatingRoleId(id);
    setError("");

    try {
      const token = getToken();
      await updateRole(id, role, token);
      showToast("User role updated successfully.");
      loadUsers();
    } catch (err) {
      setError("Unable to update user role. Please try again.");
      showToast("Unable to update user role.", "error");
    } finally {
      setUpdatingRoleId(null);
    }
  };

  const loadUsers = async () => {
    setLoading(true);
    setError("");

    try {
      const token = getToken();
      const data = await getUsers(token);
      setUsers(Array.isArray(data) ? data : data?.users || []);
    } catch (err) {
      setError("Unable to load users. Please refresh the page.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreate = async () => {
    setSubmitting(true);
    setError("");

    try {
      const token = getToken();
      await createUser(newUser, token);
      setOpen(false);
      setNewUser({ username: "", password: "", role: "USER" });
      showToast("User created successfully.");
      loadUsers();
    } catch (err) {
      const backendMessage = getBackendErrorMessage(
        err,
        "Unable to create user. Please try again."
      );
      setError(backendMessage);
      showToast(backendMessage, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDisable = async (id) => {
    try {
      const token = getToken();
      await disableUser(id, token);
      showToast("User disabled successfully.");
      loadUsers();
    } catch (err) {
      setError("Unable to disable user. Please try again.");
      showToast("Unable to disable user.", "error");
    }
  };

  const handleEnable = async (id) => {
    try {
      const token = getToken();
      await enableUser(id, token);
      showToast("User enabled successfully.");
      loadUsers();
    } catch (err) {
      setError("Unable to enable user. Please try again.");
      showToast("Unable to enable user.", "error");
    }
  };

  const openDeleteDialog = (user) => {
    setDeleteTarget({ id: getUserId(user), name: getUserDisplayName(user) });
    setError("");
    setDeleteDialogOpen(true);
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setDeleteTarget({ id: "", name: "" });
  };

  const confirmDelete = async () => {
    setDeleteDialogOpen(false);
    const id = deleteTarget.id;

    if (!id) {
      showToast("Unable to determine user to delete.", "error");
      return;
    }

    try {
      const token = getToken();
      await deleteUser(id, token);
      showToast("User deleted successfully.");
      loadUsers();
    } catch (err) {
      setError("Unable to delete user. Please try again.");
      showToast("Unable to delete user.", "error");
    } finally {
      setDeleteTarget({ id: "", name: "" });
    }
  };

  const handleCloseToast = () => {
    setToast((current) => ({ ...current, open: false }));
  };

  return (
    <Box p={4}>
      <Stack spacing={3}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 4,
            background: "linear-gradient(180deg, #08101f 0%, #111827 100%)",
            color: "white",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                User Management
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 560 }}>
                Manage application users, update account status, and add new
                members from a polished admin interface.
              </Typography>
            </Box>

            <Button
              startIcon={<AddIcon />}
              variant="contained"
              size="large"
              onClick={() => setOpen(true)}
            >
              Create User
            </Button>
          </Box>
        </Paper>

        <Paper elevation={3} sx={{ borderRadius: 4, overflow: "hidden" }}>
          {error && (
            <Box p={2} bgcolor="rgba(248, 113, 113, 0.12)">
              <Typography color="#ef4444">{error}</Typography>
            </Box>
          )}

          <TableContainer>
            <Table>
              <TableHead sx={{ background: "#111827" }}>
                <TableRow>
                  <TableCell sx={{ color: "white", fontWeight: 700 }}>
                    Username
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 700 }}>
                    Role
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 700 }}>
                    Status
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ color: "white", fontWeight: 700 }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : users.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      align="center"
                      sx={{ py: 6, color: "text.secondary" }}
                    >
                      No users found. Create a user to begin.
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => {
                    const id = getUserId(user);
                    const isEnabled = Boolean(user.enabled);

                    return (
                      <TableRow key={id || getUserDisplayName(user)}>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 16,
                            }}
                          >
                            <Avatar
                              sx={{ bgcolor: "#2563eb", width: 34, height: 34 }}
                            >
                              <PersonIcon fontSize="small" />
                            </Avatar>
                            <Box>
                              <Typography fontWeight={600}>
                                {getUserDisplayName(user)}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {user.email || `@${user.username || user.userId || "unknown"}`}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <FormControl size="small" fullWidth>
                            <Select
                              value={getUserRole(user)}
                              onChange={(e) => handleUpdateRole(id, e.target.value)}
                              disabled={updatingRoleId === id}
                            >
                              <MenuItem value="USER">USER</MenuItem>
                              <MenuItem value="ADMIN">ADMIN</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={isEnabled ? "Enabled" : "Disabled"}
                            size="small"
                            color={isEnabled ? "success" : "default"}
                            icon={
                              isEnabled ? <CheckCircleOutlined /> : <BlockIcon />
                            }
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-end",
                              gap: 1,
                            }}
                          >
                            <Tooltip
                              title={isEnabled ? "Disable user" : "Enable user"}
                            >
                              <IconButton
                                color={isEnabled ? "warning" : "success"}
                                onClick={() =>
                                  isEnabled ? handleDisable(id) : handleEnable(id)
                                }
                              >
                                {isEnabled ? <BlockIcon /> : <CheckCircleOutlined />}
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete user">
                              <IconButton color="error" onClick={() => openDeleteDialog(user)}>
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Stack>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Create User</DialogTitle>
        <DialogContent>
          <Stack spacing={3} mt={1}>
            <TextField
              fullWidth
              label="Username"
              value={newUser.username || ""}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            />
            <TextField
              fullWidth
              type="password"
              label="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                label="Role"
                value={newUser.role || "USER"}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <MenuItem value="USER">USER</MenuItem>
                <MenuItem value="ADMIN">ADMIN</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreate} disabled={submitting}>
            {submitting ? "Saving..." : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={cancelDelete}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete <strong>{deleteTarget.name}</strong>?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={cancelDelete}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={confirmDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={toast.open}
        autoHideDuration={3500}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserManagement;
