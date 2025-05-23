"use client"
import { Box, Typography, Button, Container, Grid, useTheme, useMediaQuery } from "@mui/material"
import { styled } from "@mui/material/styles"
import { useRouter } from "next/navigation"

// Styled components
const HeroContainer = styled(Box)(({ theme }) => ({
  backgroundImage: `url('/images/banner.png')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  color: "white",
  padding: theme.spacing(8, 0),
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 1,
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(6, 0),
  },
}))

const ContentContainer = styled(Container)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
}))

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
}))

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  maxWidth: "600px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}))

const ShopButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "white",
  padding: theme.spacing(1, 4),
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}))

const HeroSection = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const router = useRouter()

  return (
    <HeroContainer>
      <ContentContainer>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <HeroTitle variant={isMobile ? "h3" : "h2"}>Office Supplies & Stationery</HeroTitle>
            <HeroSubtitle variant="h6">
              Get all your office supplies at one place with great discounts and cashback offers.
            </HeroSubtitle>
            <ShopButton
              variant="contained"
              size={isMobile ? "medium" : "large"}
              onClick={() => router.push("/product-details")}
            >
              Shop Now
            </ShopButton>
          </Grid>
        </Grid>
      </ContentContainer>
    </HeroContainer>
  )
}

export default HeroSection
