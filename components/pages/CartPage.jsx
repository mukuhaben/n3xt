"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Grid,
  Divider,
  TextField,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import { ArrowBack, Add, Remove, Delete as DeleteIcon } from "@mui/icons-material"
import { useRouter } from "next/navigation"

// Helper function to format numbers with commas
const formatNumberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const CartPage = () => {
  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  // State for cart items
  const [cartItems, setCartItems] = useState([])
  const [quantities, setQuantities] = useState({})
  const [loading, setLoading] = useState(true)
  const [emailSubscription, setEmailSubscription] = useState("")

  // Load cart items from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || []
      setCartItems(storedCartItems)

      // Initialize quantities
      const initialQuantities = {}
      storedCartItems.forEach((item) => {
        initialQuantities[item.id] = item.quantity || 1
      })
      setQuantities(initialQuantities)
      setLoading(false)
    }
  }, [])

  // Listen for cart updates from other components
  useEffect(() => {
    const handleCartUpdate = () => {
      if (typeof window !== "undefined") {
        const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || []
        setCartItems(storedCartItems)

        // Initialize quantities
        const initialQuantities = {}
        storedCartItems.forEach((item) => {
          initialQuantities[item.id] = item.quantity || 1
        })
        setQuantities(initialQuantities)
      }
    }

    window.addEventListener("cartUpdated", handleCartUpdate)

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate)
    }
  }, [])

  // Update localStorage when cart items change
  useEffect(() => {
    if (typeof window !== "undefined" && !loading) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }
  }, [cartItems, loading])

  // Handle quantity change
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return

    setQuantities({
      ...quantities,
      [itemId]: newQuantity,
    })

    // Update cart items with new quantity
    const updatedCartItems = cartItems.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
    setCartItems(updatedCartItems)
  }

  // Remove item from cart
  const handleRemoveItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId)
    setCartItems(updatedCartItems)
  }

  // Remove all items from cart
  const handleRemoveAll = () => {
    setCartItems([])
  }

  // Handle email subscription
  const handleSubscribe = (e) => {
    e.preventDefault()
    alert(`Subscribed with email: ${emailSubscription}`)
    setEmailSubscription("")
  }

  // Calculate subtotal (excluding VAT)
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const quantity = quantities[item.id] || 1
      const price = item.price || 0
      return total + price * quantity
    }, 0)
  }

  // Calculate VAT (16%)
  const calculateVAT = () => {
    return calculateSubtotal() * 0.16
  }

  // Calculate total
  const calculateTotal = () => {
    return calculateSubtotal() + calculateVAT()
  }

  // Calculate cashback for an item
  const calculateItemCashback = (item) => {
    const quantity = quantities[item.id] || 1
    const price = item.price || 0
    const cashbackPercent = item.cashbackPercent || 5
    return Math.round((price * quantity * cashbackPercent) / 100)
  }

  // Calculate total cashback
  const calculateTotalCashback = () => {
    return cartItems.reduce((total, item) => {
      return total + calculateItemCashback(item)
    }, 0)
  }

  if (loading) {
    return <Typography>Loading cart...</Typography>
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        My cart ({cartItems.length})
      </Typography>

      <Grid container spacing={3}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          {cartItems.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Your cart is empty
              </Typography>
              <Button variant="contained" startIcon={<ArrowBack />} onClick={() => router.push("/")} sx={{ mt: 2 }}>
                Back to shop
              </Button>
            </Paper>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="right">Unit Price</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="right">Cashback</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => {
                    const quantity = quantities[item.id] || 1
                    const unitPrice = item.price || 0
                    const totalPrice = unitPrice * quantity
                    const cashback = calculateItemCashback(item)

                    return (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ width: 60, height: 60, position: "relative", mr: 2 }}>
                              {item.image && (
                                <Box
                                  component="img"
                                  src={item.image}
                                  alt={item.name}
                                  sx={{ width: "100%", height: "100%", objectFit: "contain" }}
                                />
                              )}
                            </Box>
                            <Box>
                              <Typography variant="subtitle2">{item.name}</Typography>
                              <Typography variant="body2" color="text.secondary">
                                Item Code: {item.itemCode}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Size: {item.size}, Color: {item.color}, Material: {item.material}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Seller: {item.seller}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <IconButton
                              size="small"
                              onClick={() => handleQuantityChange(item.id, quantity - 1)}
                              disabled={quantity <= 1}
                            >
                              <Remove fontSize="small" />
                            </IconButton>
                            <TextField
                              value={quantity}
                              onChange={(e) => {
                                const value = Number.parseInt(e.target.value)
                                if (!isNaN(value) && value > 0) {
                                  handleQuantityChange(item.id, value)
                                }
                              }}
                              inputProps={{
                                min: 1,
                                style: { textAlign: "center", width: "30px", padding: "8px" },
                              }}
                              variant="standard"
                              sx={{ mx: 1 }}
                            />
                            <IconButton size="small" onClick={() => handleQuantityChange(item.id, quantity + 1)}>
                              <Add fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                        <TableCell align="right">{formatNumberWithCommas(unitPrice)}/=</TableCell>
                        <TableCell align="right">{formatNumberWithCommas(totalPrice)}/=</TableCell>
                        <TableCell align="right" sx={{ color: "success.main" }}>
                          {formatNumberWithCommas(cashback)}/=
                        </TableCell>
                        <TableCell align="center">
                          <IconButton color="error" onClick={() => handleRemoveItem(item.id)} size="small">
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {cartItems.length > 0 && (
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <Button variant="contained" startIcon={<ArrowBack />} onClick={() => router.push("/")}>
                Back to shop
              </Button>
              <Button variant="text" color="error" onClick={handleRemoveAll}>
                Remove all
              </Button>
            </Box>
          )}
        </Grid>

        {/* Order Summary */}
        {cartItems.length > 0 && (
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Cashback Summary
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography>Total Cashback Earned:</Typography>
                <Typography color="success.main" fontWeight="bold">
                  {formatNumberWithCommas(calculateTotalCashback())}/=
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.85rem" }}>
                Cashback is calculated on the price excluding VAT and will be added to your e-wallet after purchase
                completion
              </Typography>
            </Paper>

            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Order Summary
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography>Subtotal (Excl. VAT):</Typography>
                <Typography>{formatNumberWithCommas(calculateSubtotal())}/=</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography>VAT (16%):</Typography>
                <Typography>+ {formatNumberWithCommas(calculateVAT())}/=</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  Total:
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {formatNumberWithCommas(calculateTotal())}/=
                </Typography>
              </Box>
              <Button variant="contained" color="success" fullWidth size="large" sx={{ py: 1.5, mb: 2 }}>
                Checkout
              </Button>

              {/* Payment method icons */}
              <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                {["/images/8.png", "/images/9.png", "/images/10.png", "/images/11.png"].map((icon, index) => (
                  <Box
                    key={index}
                    component="img"
                    src={icon}
                    alt={`Payment method ${index + 1}`}
                    sx={{ height: 24, width: "auto" }}
                  />
                ))}
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>

      {/* Newsletter Subscription */}
      <Box sx={{ mt: 6, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Subscribe to our newsletter
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Get daily news on upcoming offers from many suppliers all over the world
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubscribe}
          sx={{
            display: "flex",
            maxWidth: 500,
            mx: "auto",
            mt: 2,
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 0 },
          }}
        >
          <TextField
            fullWidth
            placeholder="Email"
            value={emailSubscription}
            onChange={(e) => setEmailSubscription(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderTopRightRadius: { xs: 4, sm: 0 },
                borderBottomRightRadius: { xs: 4, sm: 0 },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              borderTopLeftRadius: { xs: 4, sm: 0 },
              borderBottomLeftRadius: { xs: 4, sm: 0 },
              px: 3,
            }}
          >
            Subscribe
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default CartPage
