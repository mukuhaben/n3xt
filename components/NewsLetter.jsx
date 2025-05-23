"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { MailOutline as MailIcon } from "@mui/icons-material"

// Styled components
const NewsletterContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0),
  backgroundColor: "#f5f5f5",
}))

const NewsletterPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(1),
  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
  overflow: "hidden",
  position: "relative",
}))

const IconContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}))

const CircleIcon = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
}))

const NewsLetter = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [email, setEmail] = useState("")
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState("success")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) {
      setSnackbarMessage("Please enter your email address")
      setSnackbarSeverity("error")
      setSnackbarOpen(true)
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setSnackbarMessage("Please enter a valid email address")
      setSnackbarSeverity("error")
      setSnackbarOpen(true)
      return
    }

    // In a real app, you would send this to your API
    console.log("Subscribing email:", email)
    setSnackbarMessage("Thank you for subscribing to our newsletter!")
    setSnackbarSeverity("success")
    setSnackbarOpen(true)
    setEmail("")
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  return (
    <NewsletterContainer>
      <Container>
        <NewsletterPaper>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <IconContainer>
                <CircleIcon>
                  <MailIcon fontSize="large" />
                </CircleIcon>
              </IconContainer>
              <Typography variant={isMobile ? "h5" : "h4"} align="center" gutterBottom sx={{ fontWeight: 600 }}>
                Subscribe to Our Newsletter
              </Typography>
              <Typography variant="body1" align="center" color="textSecondary" paragraph sx={{ mb: 3 }}>
                Stay updated with our latest offers, product launches, and articles.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                  fullWidth
                  label="Your Email Address"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    py: 1.5,
                    textTransform: "none",
                    fontSize: "1rem",
                  }}
                >
                  Subscribe Now
                </Button>
              </Box>
            </Grid>
          </Grid>
        </NewsletterPaper>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </NewsletterContainer>
  )
}

export default NewsLetter
