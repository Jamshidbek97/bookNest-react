import React, { useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  Avatar,
  Stack,
  Divider,
  InputAdornment,
  Alert,
  CircularProgress,
  Badge,
  Tooltip,
} from "@mui/material";
import {
  Close as CloseIcon,
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Phone,
  Lock,
  AccountCircle,
  Login as LoginIcon,
  PersonAdd,
  Edit as EditIcon,
} from "@mui/icons-material";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import { useGlobals } from "../../hooks/useGlobals";
import { Messages } from "../../../lib/config";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import MemberService from "../../services/MemberService";

// Define types
type Mode = "login" | "signup";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  initialMode?: Mode;
}

interface FormData {
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface ErrorMessages {
  [key: string]: string;
}

const AuthenticationModal: React.FC<AuthModalProps> = ({
  open,
  onClose,
  initialMode = "login",
}) => {
  console.log("Modal open:", open, "mode:", initialMode);
  const [mode, setMode] = useState<Mode>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<ErrorMessages>({});
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthMember } = useGlobals();

  /** HANDLERS **/
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "Image size must be less than 5MB",
        }));
        return;
      }
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          image: "Please select a valid image file",
        }));
        return;
      }

      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      if (errors.image) {
        setErrors((prev) => ({ ...prev, image: "" }));
      }
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const validateForm = (): boolean => {
    const newErrors: ErrorMessages = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (mode === "signup") {
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }

      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number";
      }

      if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    } else {
      if (!formData.password.trim()) {
        newErrors.password = "Password is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const memberService = new MemberService();

      if (mode === "signup") {
        const signupInput: MemberInput = {
          memberNick: formData.username,
          memberPhone: formData.phone,
          memberEmail: formData.email,
          memberPassword: formData.password,
        };

        const result = await memberService.signup(signupInput);
        setAuthMember(result);
      } else if (mode === "login") {
        if (!validateForm()) return;
        const loginInput: LoginInput = {
          identifier: formData.username,
          memberPassword: formData.password,
        };

        const result = await memberService.login(loginInput);
        setAuthMember(result);
      }

      console.log(`${mode} success`);
      onClose();
    } catch (err) {
      console.error(`${mode} failed`, err);
      sweetErrorHandling(err).then();
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      handleSubmit();
    }
  };

  const switchMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setErrors({});
    setFormData({
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
    setProfileImage(null);
    setImagePreview(null);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "95%", sm: "90%", md: 900 },
    maxHeight: "90vh",
    overflow: "auto",
    bgcolor: "background.paper",
    borderRadius: 3,
    boxShadow: 24,
    p: 0,
  };

  const leftPanelStyle = {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    p: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 500,
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.1)",
    },
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        sx: { backdropFilter: "blur(5px)" },
      }}
    >
      <Fade in={open}>
        <Box sx={modalStyle}>
          <Paper elevation={24} sx={{ borderRadius: 3, overflow: "hidden" }}>
            {/* Close Button */}
            <IconButton
              onClick={onClose}
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                zIndex: 1000,
                bgcolor: "rgba(255,255,255,0.9)",
                "&:hover": { bgcolor: "rgba(255,255,255,1)" },
              }}
            >
              <CloseIcon />
            </IconButton>

            <Stack
              direction={{ xs: "column", md: "row" }}
              sx={{ minHeight: 500 }}
            >
              {/* Left Panel - Branding */}
              <Box sx={{ ...leftPanelStyle, width: { xs: "100%", md: "45%" } }}>
                <Box sx={{ zIndex: 1, textAlign: "center" }}>
                  <AccountCircle sx={{ fontSize: 80, mb: 2, opacity: 0.9 }} />
                  <Typography
                    variant="h3"
                    component="h1"
                    gutterBottom
                    fontWeight="bold"
                  >
                    BookNest
                  </Typography>
                  <Typography variant="h6" gutterBottom sx={{ opacity: 0.9 }}>
                    Your Digital Library Experience
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.8, mb: 4 }}>
                    Discover, read, and manage your favorite books in one place
                  </Typography>

                  {/* Stats */}
                  <Stack direction="row" spacing={3} justifyContent="center">
                    <Box textAlign="center">
                      <Typography variant="h4" fontWeight="bold">
                        10K+
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Books
                      </Typography>
                    </Box>
                    <Box textAlign="center">
                      <Typography variant="h4" fontWeight="bold">
                        5K+
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Readers
                      </Typography>
                    </Box>
                    <Box textAlign="center">
                      <Typography variant="h4" fontWeight="bold">
                        50+
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Categories
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Box>

              {/* Right Panel - Form */}
              <Box
                sx={{
                  width: { xs: "100%", md: "55%" },
                  p: { xs: 3, sm: 4 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ maxWidth: 400, mx: "auto", width: "100%" }}>
                  {/* Header */}
                  <Box textAlign="center" mb={4}>
                    <Typography
                      variant="h4"
                      component="h2"
                      gutterBottom
                      fontWeight="bold"
                    >
                      {mode === "login" ? "Welcome Back!" : "Join BookNest"}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {mode === "login"
                        ? "Sign in to continue your reading journey"
                        : "Create your account to start exploring"}
                    </Typography>
                  </Box>

                  {/* Profile Image Upload (Signup only) */}
                  {mode === "signup" && (
                    <Box display="flex" justifyContent="center" mb={3}>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        badgeContent={
                          <Tooltip title="Upload profile picture">
                            <IconButton
                              size="small"
                              onClick={handleImageClick}
                              sx={{
                                bgcolor: "primary.main",
                                color: "white",
                                "&:hover": { bgcolor: "primary.dark" },
                              }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        }
                      >
                        <Avatar
                          // @ts-ignore
                          src={imagePreview}
                          sx={{
                            width: 100,
                            height: 100,
                            cursor: "pointer",
                            border: "3px solid",
                            borderColor: "primary.main",
                            "&:hover": { opacity: 0.8 },
                          }}
                          onClick={handleImageClick}
                        >
                          <Person sx={{ fontSize: 50 }} />
                        </Avatar>
                      </Badge>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                      />
                    </Box>
                  )}

                  {/* Error Alert */}
                  {errors.image && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {errors.image}
                    </Alert>
                  )}

                  {/* Form Fields */}
                  <Stack spacing={2.5}>
                    {/* Username */}
                    <TextField
                      fullWidth
                      label="Username"
                      value={formData.username}
                      onChange={(e) =>
                        handleInputChange("username", e.target.value)
                      }
                      onKeyDown={handleKeyDown}
                      error={!!errors.username}
                      helperText={errors.username}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person color="action" />
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                    />

                    {/* Email (Signup only) */}
                    {mode === "signup" && (
                      <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        onKeyDown={handleKeyDown}
                        error={!!errors.email}
                        helperText={errors.email}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email color="action" />
                            </InputAdornment>
                          ),
                        }}
                        variant="outlined"
                      />
                    )}

                    {/* Phone (Signup only) */}
                    {mode === "signup" && (
                      <TextField
                        fullWidth
                        label="Phone Number"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        onKeyDown={handleKeyDown}
                        error={!!errors.phone}
                        helperText={errors.phone}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Phone color="action" />
                            </InputAdornment>
                          ),
                        }}
                        variant="outlined"
                      />
                    )}

                    {/* Password */}
                    <TextField
                      fullWidth
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      onKeyDown={handleKeyDown}
                      error={!!errors.password}
                      helperText={errors.password}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                    />

                    {/* Confirm Password (Signup only) */}
                    {mode === "signup" && (
                      <TextField
                        fullWidth
                        label="Confirm Password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          handleInputChange("confirmPassword", e.target.value)
                        }
                        onKeyDown={handleKeyDown}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock color="action" />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                                edge="end"
                              >
                                {showConfirmPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        variant="outlined"
                      />
                    )}

                    {/* Submit Button */}
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      onClick={handleSubmit}
                      disabled={isLoading}
                      startIcon={
                        isLoading ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : mode === "login" ? (
                          <LoginIcon />
                        ) : (
                          <PersonAdd />
                        )
                      }
                      sx={{
                        py: 1.5,
                        mt: 2,
                        background:
                          "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                        "&:hover": {
                          background:
                            "linear-gradient(45deg, #5a67d8 30%, #6b46c1 90%)",
                        },
                      }}
                    >
                      {isLoading
                        ? "Processing..."
                        : mode === "login"
                        ? "Sign In"
                        : "Create Account"}
                    </Button>

                    {/* Divider */}
                    <Divider sx={{ my: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        OR
                      </Typography>
                    </Divider>

                    {/* Switch Mode Button */}
                    <Button
                      fullWidth
                      variant="outlined"
                      size="large"
                      onClick={switchMode}
                      disabled={isLoading}
                      sx={{ py: 1.5 }}
                    >
                      {mode === "login"
                        ? "Don't have an account? Sign Up"
                        : "Already have an account? Sign In"}
                    </Button>
                  </Stack>
                </Box>
              </Box>
            </Stack>
          </Paper>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AuthenticationModal;
