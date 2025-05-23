"use client"

import { useState, useEffect, useRef } from "react"
import { Box, Container, Typography, Grid, Card, CardMedia, Button, IconButton } from "@mui/material"
import { styled } from "@mui/material/styles"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage: "url(/images/banner.png)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "400px",
  display: "flex",
  alignItems: "center",
  position: "relative",
  marginBottom: theme.spacing(4),
}))

const HeroBanner = styled(Box)(({ theme }) => ({
  background: "rgba(0, 0, 0, 0.6)",
  padding: theme.spacing(4),
  borderRadius: theme.spacing(1),
  color: "white",
  maxWidth: "400px",
}))

const ProductCard = styled(Card)(({ theme }) => ({
  height: "100%", // Allow natural height
  display: "flex",
  flexDirection: "column",
  position: "relative",
  border: "1px solid #eaeaea",
  boxShadow: "none",
  borderRadius: theme.spacing(0.5),
  "&:hover": {
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  transition: "all 0.2s ease-in-out",
}))

const CashbackBadge = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  backgroundColor: "red",
  color: "white",
  fontWeight: "bold",
  padding: "4px 8px",
  fontSize: "0.75rem",
  zIndex: 1,
}))

const AddToCartButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#0066cc",
  color: "white",
  fontWeight: "bold",
  textTransform: "uppercase",
  borderRadius: 0,
  padding: "10px 0",
  "&:hover": {
    backgroundColor: "#0052a3",
  },
}))

const NavButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  color: theme.palette.primary.main,
  zIndex: 10,
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  [theme.breakpoints.down("sm")]: {
    padding: 8,
  },
}))

export default function HomePage() {
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  const featuredProducts = [
    {
      id: "SW001",
      name: "Smart watches",
      description: "This is a sample product description",
      image: "/images/8.png",
      prices: {
        "1.3 PC": "1,900,000",
        "4-11 PC": "1,805,000",
        "12 PC+": "1,710,000",
      },
      cashback: "10%",
    },
    {
      id: "KM001",
      name: "Kitchen mixer",
      description: "This is a sample product description",
      image: "/images/9.png",
      prices: {
        "1.3 PC": "10,000,000",
        "4-11 PC": "9,500,000",
        "12 PC+": "9,000,000",
      },
      cashback: "15%",
    },
    {
      id: "BL001",
      name: "Blenders",
      description: "This is a sample product description",
      image: "/images/12.png",
      prices: {
        "1.3 PC": "3,900,000",
        "4-11 PC": "3,705,000",
        "12 PC+": "3,510,000",
      },
      cashback: "8%",
    },
    {
      id: "HA001",
      name: "Home appliance",
      description: "This is a sample product description",
      image: "/images/10.png",
      prices: {
        "1.3 PC": "1,900,000",
        "4-11 PC": "1,805,000",
        "12 PC+": "1,710,000",
      },
      cashback: "5%",
    },
    {
      id: "CM001",
      name: "Coffee maker",
      description: "This is a sample product description",
      image: "/images/13.png",
      prices: {
        "1.3 PC": "1,000,000",
        "4-11 PC": "950,000",
        "12 PC+": "900,000",
      },
      cashback: "12%",
    },
  ]

  const officeProducts = [
    {
      id: "SW001",
      name: "Smart watches",
      description: "This is a sample product description",
      image: "/images/8.png",
      prices: {
        "1.3 PC": "1,900,000",
        "4-11 PC": "1,805,000",
        "12 PC+": "1,710,000",
      },
      cashback: "10%",
    },
    {
      id: "KM001",
      name: "Kitchen mixer",
      description: "This is a sample product description",
      image: "/images/9.png",
      prices: {
        "1.3 PC": "10,000,000",
        "4-11 PC": "9,500,000",
        "12 PC+": "9,000,000",
      },
      cashback: "15%",
    },
    {
      id: "BL001",
      name: "Blenders",
      description: "This is a sample product description",
      image: "/images/12.png",
      prices: {
        "1.3 PC": "3,900,000",
        "4-11 PC": "3,705,000",
        "12 PC+": "3,510,000",
      },
      cashback: "8%",
    },
    {
      id: "HA001",
      name: "Home appliance",
      description: "This is a sample product description",
      image: "/images/10.png",
      prices: {
        "1.3 PC": "1,900,000",
        "4-11 PC": "1,805,000",
        "12 PC+": "1,710,000",
      },
      cashback: "5%",
    },
    {
      id: "CM001",
      name: "Coffee maker",
      description: "This is a sample product description",
      image: "/images/13.png",
      prices: {
        "1.3 PC": "1,000,000",
        "4-11 PC": "950,000",
        "12 PC+": "900,000",
      },
      cashback: "12%",
    },
  ]

  const ProductSection = ({ title, products }) => {
    const scrollContainerRef = useRef(null)
    const [isHovering, setIsHovering] = useState(false)
    const [scrollPosition, setScrollPosition] = useState(0)
    const [showLeftArrow, setShowLeftArrow] = useState(false)
    const [showRightArrow, setShowRightArrow] = useState(true)
    const scrollSpeed = 1 // pixels per frame
    const animationRef = useRef(null)
    const scrollAmount = 300 // pixels to scroll on arrow click

    // Check if arrows should be shown
    const checkArrows = () => {
      if (!scrollContainerRef.current) return

      const container = scrollContainerRef.current
      setShowLeftArrow(container.scrollLeft > 0)
      setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth - 10)
    }

    // Handle scroll events
    useEffect(() => {
      const container = scrollContainerRef.current
      if (!container) return

      const handleScroll = () => {
        setScrollPosition(container.scrollLeft)
        checkArrows()
      }

      container.addEventListener("scroll", handleScroll)
      return () => container.removeEventListener("scroll", handleScroll)
    }, [])

    // Initial check for arrows
    useEffect(() => {
      checkArrows()
    }, [])

    // Scroll left
    const scrollLeft = () => {
      if (!scrollContainerRef.current) return
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      })
    }

    // Scroll right
    const scrollRight = () => {
      if (!scrollContainerRef.current) return
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      })
    }

    // Auto-scrolling animation
    const scrollAnimation = () => {
      if (scrollContainerRef.current && !isHovering) {
        const container = scrollContainerRef.current
        const maxScroll = container.scrollWidth - container.clientWidth

        // If we've reached the end, reset to beginning
        if (scrollPosition >= maxScroll) {
          setScrollPosition(0)
          container.scrollLeft = 0
        } else {
          // Otherwise continue scrolling
          setScrollPosition((prev) => prev + scrollSpeed)
          container.scrollLeft = scrollPosition
        }

        checkArrows()
      }
      animationRef.current = requestAnimationFrame(scrollAnimation)
    }

    // Start/stop animation based on hover state
    useEffect(() => {
      animationRef.current = requestAnimationFrame(scrollAnimation)

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }, [isHovering, scrollPosition])

    return (
      <Box sx={{ mb: 6, position: "relative" }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3, fontWeight: "bold" }}>
          {title}
        </Typography>

        {/* Left Navigation Arrow */}
        {showLeftArrow && (
          <NavButton onClick={scrollLeft} sx={{ left: { xs: 0, md: -20 } }} aria-label="scroll left">
            <ChevronLeft />
          </NavButton>
        )}

        {/* Right Navigation Arrow */}
        {showRightArrow && (
          <NavButton onClick={scrollRight} sx={{ right: { xs: 0, md: -20 } }} aria-label="scroll right">
            <ChevronRight />
          </NavButton>
        )}

        <Box
          ref={scrollContainerRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          sx={{
            display: "flex",
            overflowX: "auto",
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            pb: 2,
            gap: 2,
            px: { xs: 1, md: 0 },
            width: "100%",
          }}
        >
          {products.map((product) => (
            <Box
              key={product.id}
              sx={{
                flex: "0 0 auto",
                width: {
                  xs: "80%",
                  sm: "45%",
                  md: "30%",
                  lg: "20%",
                },
                minWidth: "200px",
              }}
            >
              <ProductCard>
                {/* Cashback Badge - Exactly like in Vite */}
                <CashbackBadge>{product.cashback} Cashback</CashbackBadge>

                {/* Product Image */}
                <Box
                  sx={{ p: 2, pt: 3, display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}
                >
                  <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.name}
                    sx={{
                      width: "100%",
                      height: 120,
                      objectFit: "contain",
                      margin: "auto",
                    }}
                  />
                </Box>

                {/* Product Info */}
                <Box sx={{ px: 2, pb: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Item code: {product.id}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                    {product.name} - {product.description}
                  </Typography>
                </Box>

                {/* Price Tiers */}
                <Box sx={{ px: 2, display: "flex", justifyContent: "space-between", mb: 2 }}>
                  {Object.entries(product.prices).map(([tier, price], index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "32%",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ bgcolor: "#f5f5f5", width: "100%", textAlign: "center", py: 0.5, fontWeight: "bold" }}
                      >
                        {tier}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ width: "100%", textAlign: "center", py: 0.5, border: "1px solid #f0f0f0" }}
                      >
                        {price}/=
                      </Typography>
                    </Box>
                  ))}
                </Box>

                {/* Add to Cart Button - Exactly like in Vite */}
                <AddToCartButton
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    // Create cart item
                    const cartItem = {
                      id: `item-${product.id}-${Date.now()}`,
                      name: product.name,
                      itemCode: product.id,
                      size: "medium",
                      color: "blue",
                      material: "Plastic",
                      seller: "Artist Market",
                      price: Number.parseInt(product.prices["1.3 PC"].replace(/,/g, "")),
                      cashbackPercent: Number.parseInt(product.cashback),
                      image: product.image,
                      quantity: 1,
                    }

                    // Get existing cart items
                    const existingCartItems = JSON.parse(localStorage.getItem("cartItems")) || []

                    // Add new item to cart
                    const updatedCart = [...existingCartItems, cartItem]

                    // Save to localStorage
                    localStorage.setItem("cartItems", JSON.stringify(updatedCart))

                    // Replace alert with toast
                    setToastMessage(`${product.name} added to cart! You'll earn ${product.cashback} cashback.`)
                    setToastOpen(true)
                    setTimeout(() => setToastOpen(false), 4000)
                  }}
                >
                  ADD TO CART
                </AddToCartButton>
              </ProductCard>
            </Box>
          ))}
        </Box>
      </Box>
    )
  }

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <HeroBanner>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
                  Latest trending
                </Typography>
                <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
                  Electronic items
                </Typography>
                <Typography variant="h5" gutterBottom sx={{ color: "#4ade80" }}>
                  Earn 5% Cashback
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Learn more
                </Typography>
                <Typography variant="body2" sx={{ mb: 3 }}>
                  On all purchases. Shop now and save!
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: "#1976d2",
                    "&:hover": { backgroundColor: "#1565c0" },
                  }}
                >
                  🛒 Shop & Earn
                </Button>
              </HeroBanner>
            </Grid>
            <Grid item xs={12} md={6}>
              <HeroBanner sx={{ backgroundColor: "rgba(220, 38, 38, 0.8)" }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
                  Latest trending
                </Typography>
                <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
                  Electronic items
                </Typography>
                <Typography variant="h5" gutterBottom sx={{ color: "#fbbf24" }}>
                  Save 30% on Bulk Orders
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Learn more
                </Typography>
                <Typography variant="body2" sx={{ mb: 3 }}>
                  Special deals for orders of 10+ items.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: "#dc2626",
                    "&:hover": { backgroundColor: "#b91c1c" },
                  }}
                >
                  👥 View Bulk Deals
                </Button>
              </HeroBanner>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <ProductSection title="Featured Products" products={featuredProducts} />
        <ProductSection title="Office Products" products={officeProducts} />
      </Container>

      {/* Toast Notification */}
      {toastOpen && (
        <Box
          sx={{
            position: "fixed",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#4caf50",
            color: "white",
            px: 3,
            py: 2,
            borderRadius: 1,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: 2,
            minWidth: "300px",
            animation: "slideUp 0.3s ease-out",
            "@keyframes slideUp": {
              from: {
                transform: "translateX(-50%) translateY(100%)",
                opacity: 0,
              },
              to: {
                transform: "translateX(-50%) translateY(0)",
                opacity: 1,
              },
            },
          }}
        >
          <Typography variant="body2" sx={{ flex: 1 }}>
            {toastMessage}
          </Typography>
          <IconButton size="small" sx={{ color: "white", ml: 1 }} onClick={() => setToastOpen(false)}>
            ✕
          </IconButton>
        </Box>
      )}
    </Box>
  )
}
