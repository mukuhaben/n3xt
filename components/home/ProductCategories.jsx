"use client"

import { useState, useEffect } from "react"
import { Box, Card, Typography, CardMedia, useTheme, Button, IconButton } from "@mui/material"
import { useRouter } from "next/navigation"

// Helper function to format numbers with commas
const formatNumberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const ProductCategories = ({ header }) => {
  const theme = useTheme()
  const router = useRouter()
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [categories, setCategories] = useState([])

  // Initialize categories with images
  useEffect(() => {
    setCategories([
      { id: 1, name: "Soft chairs", price: 1900000, cashback: 5, image: "/images/1.png", itemCode: "SC001" },
      { id: 2, name: "Sofa & chair", price: 1900000, cashback: 3, image: "/images/2.png", itemCode: "SC002" },
      { id: 3, name: "Kitchen dishes", price: 1900000, cashback: 7, image: "/images/11.png", itemCode: "KD001" },
      { id: 4, name: "Smart watches", price: 1900000, cashback: 10, image: "/images/8.png", itemCode: "SW001" },
      { id: 5, name: "Kitchen mixer", price: 10000000, cashback: 15, image: "/images/9.png", itemCode: "KM001" },
      { id: 6, name: "Blenders", price: 3900000, cashback: 8, image: "/images/12.png", itemCode: "BL001" },
      { id: 7, name: "Home appliance", price: 1900000, cashback: 6, image: "/images/10.png", itemCode: "HA001" },
      { id: 8, name: "Coffee maker", price: 1000000, cashback: 12, image: "/images/13.png", itemCode: "CM001" },
    ])
  }, [])

  // Function to add item to cart
  const addToCart = (category) => {
    // Create a cart item from the category
    const cartItem = {
      id: `item${category.id}`,
      name: category.name,
      size: "medium",
      color: "blue",
      material: "Plastic",
      seller: "Artist Market",
      price: category.price,
      basePrice: category.price, // Store the base price for tier calculations
      cashbackPercent: category.cashback || 5, // Store the cashback percentage correctly
      image: category.image,
      itemCode: category.itemCode || `PROD-${Math.floor(Math.random() * 10000)}`,
    }

    // Get existing cart items from localStorage or initialize empty array
    if (typeof window !== "undefined") {
      const existingCartItems = JSON.parse(localStorage.getItem("cartItems")) || []

      // Add new item to cart
      const updatedCart = [...existingCartItems, cartItem]

      // Save updated cart to localStorage
      localStorage.setItem("cartItems", JSON.stringify(updatedCart))

      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event("cartUpdated"))

      // Show toast notification
      setToastMessage(`${category.name} added to cart! You'll earn ${category.cashback || 5}% cashback.`)
      setToastOpen(true)

      // Auto-hide after 4 seconds
      setTimeout(() => {
        setToastOpen(false)
      }, 4000)
    }
  }

  // CategoryCard component - Styled exactly like the Vite version
  const CategoryCard = ({ category }) => (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        boxShadow: "none",
        border: "1px solid #eaeaea",
        borderRadius: 0.5,
        overflow: "hidden",
        height: "100%",
      }}
    >
      {/* Cashback Badge */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "red",
          color: "white",
          fontWeight: "bold",
          padding: "4px 8px",
          fontSize: "0.75rem",
          zIndex: 1,
        }}
      >
        {category.cashback}% Cashback
      </Box>

      {/* Image Container */}
      <Box sx={{ p: 2, pt: 3, display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
        <CardMedia
          component="img"
          image={category.image}
          alt={category.name}
          sx={{
            width: "100%",
            height: 120,
            objectFit: "contain",
            margin: "auto",
          }}
        />
      </Box>

      {/* Product Info */}
      <Box sx={{ px: 2, pb: 1, flexGrow: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          Item code: {category.itemCode}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
          {category.name} - This is a sample product description.
        </Typography>
      </Box>

      {/* Price Tiers */}
      <Box sx={{ px: 2, display: "flex", justifyContent: "space-between", mb: 2 }}>
        {[
          { label: "1.3 PC", price: category.price },
          { label: "4-11 PC", price: category.price * 0.95 },
          { label: "12 PC+", price: category.price * 0.9 },
        ].map((tier, idx) => (
          <Box
            key={idx}
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
              {tier.label}
            </Typography>
            <Typography
              variant="caption"
              sx={{ width: "100%", textAlign: "center", py: 0.5, border: "1px solid #f0f0f0" }}
            >
              {formatNumberWithCommas(tier.price.toFixed(0))}/=
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Add to Cart Button */}
      <Button
        variant="contained"
        fullWidth
        onClick={() => addToCart(category)}
        sx={{
          backgroundColor: "#0066cc",
          color: "white",
          fontWeight: "bold",
          textTransform: "uppercase",
          borderRadius: 0,
          padding: "10px 0",
          mt: "auto",
          "&:hover": {
            backgroundColor: "#0052a3",
          },
        }}
      >
        ADD TO CART
      </Button>
    </Card>
  )

  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 2 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          mb: 2,
          fontSize: { xs: "1.4rem", sm: "1.6rem" },
          fontWeight: "bold",
        }}
      >
        {header}
      </Typography>

      {/* Grid layout for categories */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
          },
          gap: 2,
          py: 2,
        }}
      >
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </Box>

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

export default ProductCategories
