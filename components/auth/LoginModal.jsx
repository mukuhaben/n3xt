"use client"

import { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  TextField,
  Button,
  Divider,
  Link,
} from "@mui/material"
import { Close as CloseIcon } from "@mui/icons-material"
import { styled } from "@mui/material/styles"

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    maxWidth: "500px",
    width: "100%",
    margin: theme.spacing(2),
    borderRadius: theme.spacing(1),
  },
}))

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1, 2),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}))

const CloseButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  marginRight: -theme.spacing(1),
}))

const FormSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}))

const LoginModal = ({ open, onClose, onRegisterClick }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Login form submitted:", formData)
    // Here you would typically authenticate the user
    onClose()
  }

  const handleRegisterClick = () => {
    onClose()
    if (onRegisterClick) onRegisterClick()
  }

  return (
    <StyledDialog open={open} onClose={onClose} fullWidth aria-labelledby="login-dialog-title">
      <StyledDialogTitle id="login-dialog-title">
        Sign In
        <CloseButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </CloseButton>
      </StyledDialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
            Login to Your Account
          </Typography>

          <FormSection>
            <Typography variant="subtitle1" gutterBottom>
              Email
            </Typography>
            <TextField
              fullWidth
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              variant="outlined"
              margin="dense"
              required
            />
          </FormSection>

          <FormSection>
            <Typography variant="subtitle1" gutterBottom>
              Password
            </Typography>
            <TextField
              fullWidth
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              variant="outlined"
              margin="dense"
              required
            />
          </FormSection>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Link href="#" variant="body2" underline="hover">
              Forgot Password?
            </Link>
          </Box>

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ py: 1.5, mb: 2 }}>
            Sign In
          </Button>

          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link component="button" variant="body2" onClick={handleRegisterClick} underline="hover">
                Register Now
              </Link>
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </StyledDialog>
  )
}

export default LoginModal
