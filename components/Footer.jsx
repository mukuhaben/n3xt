"use client"
import { Box, Container, Grid, Typography, Link, Divider, IconButton } from "@mui/material"
import { Facebook, Twitter, Instagram, LinkedIn, YouTube } from "@mui/icons-material"

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "background.paper", py: 6, borderTop: "1px solid #e0e0e0" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              FirstCraft
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your one-stop shop for office supplies, stationery, and office furniture.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="primary" aria-label="facebook">
                <Facebook />
              </IconButton>
              <IconButton color="primary" aria-label="twitter">
                <Twitter />
              </IconButton>
              <IconButton color="primary" aria-label="instagram">
                <Instagram />
              </IconButton>
              <IconButton color="primary" aria-label="linkedin">
                <LinkedIn />
              </IconButton>
              <IconButton color="primary" aria-label="youtube">
                <YouTube />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" display="block" sx={{ mb: 1 }}>
              Home
            </Link>
            <Link href="/product-details" color="inherit" display="block" sx={{ mb: 1 }}>
              Products
            </Link>
            <Link href="/cart" color="inherit" display="block" sx={{ mb: 1 }}>
              Cart
            </Link>
            <Link href="/account" color="inherit" display="block" sx={{ mb: 1 }}>
              My Account
            </Link>
            <Link href="/wallet" color="inherit" display="block" sx={{ mb: 1 }}>
              E-Wallet
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Customer Service
            </Typography>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              Contact Us
            </Link>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              FAQs
            </Link>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              Shipping Policy
            </Link>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              Return Policy
            </Link>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              Privacy Policy
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Information
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              123 Office Street, Nairobi, Kenya
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Email: info@firstcraft.com
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Phone: +254 722517263
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Hours: Mon-Fri 8:00 AM - 5:00 PM
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} FirstCraft Office Supplies. All rights reserved.
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer
