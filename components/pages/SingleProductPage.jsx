"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Divider,
  Chip,
  TextField,
  Paper,
  Rating,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  IconButton,
  Breadcrumbs,
  Link as MuiLink,
  Card,
  CardMedia,
  CardContent,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import {
  FavoriteBorder,
  ShoppingCart,
  Add,
  Remove,
  LocalShipping,
  VerifiedUser,
  CreditCard,
  Star,
} from "@mui/icons-material"
import { useRouter } from "next/navigation"

// Sample product data
const sampleProducts = [
  {
    id: 1,
    name: "Soft Chair",
    price: 1900000,
    cashback: 5,
    image: "/images/1.png",
    rating: 4.5,
    reviews: 12,
    itemCode: "SC001",
    category: "Furniture",
    brand: "ComfortPlus",
    description:
      "Experience ultimate comfort with our premium soft chair. Designed with ergonomic principles in mind, this chair provides excellent lumbar support and a plush seating experience. Perfect for your home office or living room.",
    colors: ["Blue", "Gray", "Black"],
    sizes: ["Small", "Medium", "Large"],
    specifications: {
      Material: "Premium Fabric",
      Dimensions: '24" x 26" x 36"',
      Weight: "15 kg",
      MaxLoad: "150 kg",
      Assembly: "Required",
      Warranty: "2 Years",
    },
  },
  {
    id: 2,
    name: "Sofa & Chair",
    price: 1900000,
    cashback: 3,
    image: "/images/2.png",
    rating: 4.2,
    reviews: 8,
    itemCode: "SC002",
    category: "Furniture",
    brand: "LuxHome",
    description:
      "Transform your living space with our elegant sofa and chair set. Featuring premium upholstery and solid wood frame, this set combines style with durability. The perfect centerpiece for your living room.",
    colors: ["Beige", "Brown", "Dark Gray"],
    sizes: ["2-Seater", "3-Seater", "4-Seater"],
    specifications: {
      Material: "Premium Leather",
      Dimensions: 'Sofa: 72" x 36" x 32", Chair: 32" x 34" x 32"',
      Weight: "Sofa: 45 kg, Chair: 20 kg",
      MaxLoad: "Sofa: 300 kg, Chair: 150 kg",
      Assembly: "Required",
      Warranty: "3 Years",
    },
  },
  {
    id: 3,
    name: "Kitchen Dishes",
    price: 1900000,
    cashback: 7,
    image: "/images/11.png",
    rating: 4.8,
    reviews: 24,
    itemCode: "KD001",
    category: "Kitchen",
    brand: "CookMaster",
    description:
      "Elevate your dining experience with our premium kitchen dish set. Made from high-quality ceramic with elegant designs, these dishes are perfect for everyday use and special occasions. Microwave and dishwasher safe.",
    colors: ["White", "Blue Pattern", "Floral"],
    sizes: ["12-Piece", "24-Piece", "36-Piece"],
    specifications: {
      Material: "Ceramic",
      Includes: "Dinner Plates, Salad Plates, Bowls",
      Dishwasher: "Safe",
      Microwave: "Safe",
      Weight: "12-Piece: 5 kg",
      Warranty: "1 Year",
    },
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 1900000,
    cashback: 10,
    image: "/images/8.png",
    rating: 4.6,
    reviews: 18,
    itemCode: "SW001",
    category: "Electronics",
    brand: "TechTime",
    description:
      "Stay connected and track your fitness with our advanced smartwatch. Featuring heart rate monitoring, GPS tracking, and smartphone notifications, this watch is your perfect companion for an active lifestyle.",
    colors: ["Black", "Silver", "Rose Gold"],
    sizes: ["40mm", "44mm"],
    specifications: {
      Display: '1.4" AMOLED',
      Battery: "Up to 7 days",
      Waterproof: "5 ATM",
      Connectivity: "Bluetooth 5.0, WiFi",
      Sensors: "Heart Rate, Accelerometer, GPS",
      Warranty: "1 Year",
    },
  },
  {
    id: 5,
    name: "Kitchen Mixer",
    price: 10000000,
    cashback: 15,
    image: "/images/9.png",
    rating: 4.9,
    reviews: 32,
    itemCode: "KM001",
    category: "Kitchen",
    brand: "MixMaster",
    description:
      "Take your cooking and baking to the next level with our professional-grade kitchen mixer. With multiple speed settings and various attachments, this mixer handles everything from whipping cream to kneading dough with ease.",
    colors: ["Red", "Black", "Silver"],
    sizes: ["5 Quart", "7 Quart"],
    specifications: {
      Power: "800W",
      Speeds: "10 Speed Settings",
      Bowl: "Stainless Steel",
      Includes: "Whisk, Dough Hook, Flat Beater",
      Weight: "10 kg",
      Warranty: "5 Years",
    },
  },
  {
    id: 6,
    name: "Blender",
    price: 3900000,
    cashback: 8,
    image: "/images/12.png",
    rating: 4.3,
    reviews: 15,
    itemCode: "BL001",
    category: "Kitchen",
    brand: "BlendPro",
    description:
      "Blend, puree, and crush with our high-performance blender. Featuring a powerful motor and durable blades, this blender makes quick work of fruits, vegetables, and ice. Perfect for smoothies, soups, and sauces.",
    colors: ["Black", "White", "Red"],
    sizes: ["Personal", "Family"],
    specifications: {
      Power: "1200W",
      Capacity: "64 oz",
      Speeds: "Variable Speed Control",
      Blades: "Stainless Steel",
      Programs: "Smoothie, Ice Crush, Soup",
      Warranty: "2 Years",
    },
  },
  {
    id: 7,
    name: "Home Appliance",
    price: 1900000,
    cashback: 6,
    image: "/images/10.png",
    rating: 4.1,
    reviews: 9,
    itemCode: "HA001",
    category: "Appliances",
    brand: "HomeTech",
    description:
      "Make your home life easier with our efficient home appliance. Designed for modern living, this appliance combines functionality with energy efficiency. Its sleek design fits perfectly in any home decor.",
    colors: ["White", "Silver", "Black"],
    sizes: ["Standard", "Compact"],
    specifications: {
      Power: "1000W",
      Energy: "A++ Rating",
      Dimensions: '24" x 22" x 33"',
      Weight: "25 kg",
      Noise: "40 dB",
      Warranty: "2 Years",
    },
  },
  {
    id: 8,
    name: "Coffee Maker",
    price: 1000000,
    cashback: 12,
    image: "/images/13.png",
    rating: 4.7,
    reviews: 21,
    itemCode: "CM001",
    category: "Kitchen",
    brand: "BrewMaster",
    description:
      "Start your day right with our premium coffee maker. Whether you prefer a strong espresso or a mild latte, this versatile machine delivers perfect coffee every time. Features programmable settings and a built-in grinder.",
    colors: ["Silver", "Black", "Red"],
    sizes: ["12-Cup", "Single Serve"],
    specifications: {
      Power: "1500W",
      Capacity: "12 Cups",
      Features: "Programmable Timer, Built-in Grinder",
      Filter: "Permanent Gold-Tone",
      Water: "Removable Reservoir",
      Warranty: "2 Years",
    },
  },
]

// Helper function to format numbers with commas
const formatNumberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const SingleProductPage = ({ productId }) => {
  const theme = useTheme()
  const router = useRouter()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  // State for product and UI
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [tabValue, setTabValue] = useState(0)
  const [relatedProducts, setRelatedProducts] = useState([])

  // Fetch product data
  useEffect(() => {
    // In a real app, you would fetch from an API
    const foundProduct = sampleProducts.find((p) => p.id === Number.parseInt(productId))

    if (foundProduct) {
      setProduct(foundProduct)
      setSelectedColor(foundProduct.colors[0])
      setSelectedSize(foundProduct.sizes[0])

      // Get related products (same category)
      const related = sampleProducts
        .filter((p) => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4)
      setRelatedProducts(related)
    }

    setLoading(false)
  }, [productId])

  // Handle quantity change
  const handleQuantityChange = (amount) => {
    const newQuantity = Math.max(1, quantity + amount)
    setQuantity(newQuantity)
  }

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  // Calculate price based on quantity (tiered pricing)
  const calculatePrice = () => {
    if (!product) return 0

    if (quantity >= 12) {
      return product.price * 0.9 // 10% discount for 12+ items
    } else if (quantity >= 4) {
      return product.price * 0.95 // 5% discount for 4-11 items
    }
    return product.price
  }

  // Calculate total price
  const totalPrice = calculatePrice() * quantity

  // Calculate cashback amount
  const cashbackAmount = totalPrice * (product?.cashback / 100 || 0)

  // Add to cart function
  const addToCart = () => {
    if (!product) return

    // Create a cart item
    const cartItem = {
      id: `item${product.id}-${Date.now()}`, // Unique ID
      name: product.name,
      size: selectedSize,
      color: selectedColor,
      material: product.specifications.Material,
      seller: product.brand,
      price: calculatePrice(),
      basePrice: product.price,
      quantity: quantity,
      cashbackPercent: product.cashback,
      image: product.image,
      itemCode: product.itemCode,
    }

    // Get existing cart items from localStorage or initialize empty array
    if (typeof window !== "undefined") {
      const existingCartItems = JSON.parse(localStorage.getItem("cartItems")) || []

      // Add new item to cart
      const updatedCart = [...existingCartItems, cartItem]

      // Save updated cart to localStorage
      localStorage.setItem("cartItems", JSON.stringify(updatedCart))

      // Show notification (in a real app, you would use a snackbar)
      alert(`${product.name} added to cart! You'll earn ${product.cashback}% cashback.`)
    }
  }

  // Buy now function
  const buyNow = () => {
    addToCart()
    router.push("/cart")
  }

  // Add to wishlist function
  const addToWishlist = () => {
    // In a real app, you would implement wishlist functionality
    alert(`${product?.name} added to wishlist!`)
  }

  // Loading state
  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography>Loading product details...</Typography>
      </Container>
    )
  }

  // Product not found
  if (!product) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h5">Product not found</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => router.push("/product-details")}>
          Back to Products
        </Button>
      </Container>
    )
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <MuiLink underline="hover" color="inherit" sx={{ cursor: "pointer" }} onClick={() => router.push("/")}>
          Home
        </MuiLink>
        <MuiLink
          underline="hover"
          color="inherit"
          sx={{ cursor: "pointer" }}
          onClick={() => router.push("/product-details")}
        >
          Products
        </MuiLink>
        <MuiLink
          underline="hover"
          color="inherit"
          sx={{ cursor: "pointer" }}
          onClick={() => router.push(`/product-details?category=${product.category}`)}
        >
          {product.category}
        </MuiLink>
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>

      {/* Product Details */}
      <Paper sx={{ p: { xs: 2, md: 4 }, mb: 4 }}>
        <Grid container spacing={4}>
          {/* Product Image */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                position: "relative",
                height: { xs: 300, md: 400 },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#f9f9f9",
                borderRadius: 1,
                p: 2,
              }}
            >
              {/* Cashback Badge */}
              <Chip
                label={`${product.cashback}% Cashback`}
                color="error"
                size="small"
                sx={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  fontWeight: "bold",
                }}
              />

              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>
          </Grid>

          {/* Product Info */}
          <Grid item xs={12} md={7}>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Item code: {product.itemCode}
              </Typography>

              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
                {product.name}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Rating value={product.rating} precision={0.5} readOnly sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  {product.rating} ({product.reviews} reviews)
                </Typography>
              </Box>

              <Typography variant="body1" sx={{ mb: 3 }}>
                {product.description}
              </Typography>

              <Divider sx={{ my: 2 }} />

              {/* Price */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" color="text.primary" sx={{ fontWeight: "bold" }}>
                  KSh {formatNumberWithCommas(calculatePrice())}
                </Typography>
                {quantity >= 4 && (
                  <Typography variant="body2" color="success.main">
                    {quantity >= 12 ? "10% quantity discount applied" : "5% quantity discount applied"}
                  </Typography>
                )}
                <Typography variant="body2" color="error.main" sx={{ mt: 0.5 }}>
                  Earn KSh {formatNumberWithCommas(cashbackAmount.toFixed(0))} cashback
                </Typography>
              </Box>

              {/* Color Selection */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Color
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  {product.colors.map((color) => (
                    <Chip
                      key={color}
                      label={color}
                      onClick={() => setSelectedColor(color)}
                      variant={selectedColor === color ? "filled" : "outlined"}
                      color={selectedColor === color ? "primary" : "default"}
                      sx={{ minWidth: 80 }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Size Selection */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Size
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  {product.sizes.map((size) => (
                    <Chip
                      key={size}
                      label={size}
                      onClick={() => setSelectedSize(size)}
                      variant={selectedSize === size ? "filled" : "outlined"}
                      color={selectedSize === size ? "primary" : "default"}
                      sx={{ minWidth: 80 }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Quantity */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Quantity
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                    <Remove />
                  </IconButton>
                  <TextField
                    value={quantity}
                    onChange={(e) => {
                      const value = Number.parseInt(e.target.value)
                      if (!isNaN(value) && value > 0) {
                        setQuantity(value)
                      }
                    }}
                    inputProps={{ min: 1, style: { textAlign: "center" } }}
                    sx={{ width: 60 }}
                  />
                  <IconButton onClick={() => handleQuantityChange(1)}>
                    <Add />
                  </IconButton>
                </Box>
              </Box>

              {/* Tiered Pricing */}
              <Box sx={{ mb: 3, bgcolor: "#f5f5f5", p: 2, borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Tiered Pricing
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: "center", p: 1, border: "1px solid #e0e0e0", borderRadius: 1 }}>
                      <Typography variant="body2" fontWeight="bold">
                        1-3 PC
                      </Typography>
                      <Typography variant="body2">KSh {formatNumberWithCommas(product.price)}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: "center", p: 1, border: "1px solid #e0e0e0", borderRadius: 1 }}>
                      <Typography variant="body2" fontWeight="bold">
                        4-11 PC
                      </Typography>
                      <Typography variant="body2">KSh {formatNumberWithCommas(product.price * 0.95)}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: "center", p: 1, border: "1px solid #e0e0e0", borderRadius: 1 }}>
                      <Typography variant="body2" fontWeight="bold">
                        12+ PC
                      </Typography>
                      <Typography variant="body2">KSh {formatNumberWithCommas(product.price * 0.9)}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              {/* Total */}
              <Box sx={{ mb: 3, bgcolor: "#f9f9f9", p: 2, borderRadius: 1 }}>
                <Typography variant="subtitle1">Total: KSh {formatNumberWithCommas(totalPrice)}</Typography>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<ShoppingCart />}
                  onClick={addToCart}
                  sx={{ flex: { xs: "1 1 100%", sm: "1 1 auto" } }}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={buyNow}
                  sx={{ flex: { xs: "1 1 100%", sm: "1 1 auto" } }}
                >
                  Buy Now
                </Button>
                <IconButton
                  color="primary"
                  sx={{ border: "1px solid", borderColor: "divider" }}
                  onClick={addToWishlist}
                >
                  <FavoriteBorder />
                </IconButton>
              </Box>

              {/* Shipping & Returns */}
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LocalShipping color="primary" />
                      <Typography variant="body2">Free Shipping</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <VerifiedUser color="primary" />
                      <Typography variant="body2">Warranty: {product.specifications.Warranty}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CreditCard color="primary" />
                      <Typography variant="body2">Secure Payment</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Product Tabs */}
      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant={isMobile ? "fullWidth" : "standard"}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab label="Description" />
          <Tab label="Specifications" />
          <Tab label="Reviews" />
        </Tabs>

        {/* Description Tab */}
        <Box sx={{ p: 3, display: tabValue === 0 ? "block" : "none" }}>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Typography variant="body1" paragraph>
            Brand: {product.brand}
          </Typography>
          <Typography variant="body1" paragraph>
            Category: {product.category}
          </Typography>
        </Box>

        {/* Specifications Tab */}
        <Box sx={{ p: 3, display: tabValue === 1 ? "block" : "none" }}>
          <TableContainer>
            <Table>
              <TableBody>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell component="th" scope="row" sx={{ fontWeight: "bold", width: "30%" }}>
                      {key}
                    </TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Reviews Tab */}
        <Box sx={{ p: 3, display: tabValue === 2 ? "block" : "none" }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Box sx={{ mr: 2 }}>
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                {product.rating}
              </Typography>
              <Rating value={product.rating} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary">
                {product.reviews} reviews
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              {[5, 4, 3, 2, 1].map((star) => (
                <Box key={star} sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                  <Typography variant="body2" sx={{ width: 20 }}>
                    {star}
                  </Typography>
                  <Star sx={{ color: "gold", fontSize: 16, mr: 0.5 }} />
                  <Box
                    sx={{
                      flexGrow: 1,
                      bgcolor: "#f0f0f0",
                      height: 8,
                      borderRadius: 1,
                      mr: 1,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        height: "100%",
                        bgcolor: "primary.main",
                        width: `${
                          star === Math.round(product.rating)
                            ? "60%"
                            : star > Math.round(product.rating)
                              ? "20%"
                              : "80%"
                        }`,
                      }}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ width: 30 }}>
                    {star === Math.round(product.rating) ? "60%" : star > Math.round(product.rating) ? "20%" : "80%"}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" sx={{ mb: 2 }}>
            Customer reviews will be displayed here.
          </Typography>
        </Box>
      </Paper>

      {/* Related Products */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          Related Products
        </Typography>
        <Grid container spacing={2}>
          {relatedProducts.map((relatedProduct) => (
            <Grid item key={relatedProduct.id} xs={6} sm={6} md={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": {
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  },
                  cursor: "pointer",
                }}
                onClick={() => router.push(`/product-details/${relatedProduct.id}`)}
              >
                <Box sx={{ position: "relative", p: 2 }}>
                  <Chip
                    label={`${relatedProduct.cashback}% Cashback`}
                    color="error"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                      zIndex: 1,
                      fontWeight: "bold",
                    }}
                  />
                  <CardMedia
                    component="img"
                    image={relatedProduct.image}
                    alt={relatedProduct.name}
                    sx={{
                      height: 140,
                      objectFit: "contain",
                    }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {relatedProduct.category}
                  </Typography>
                  <Typography variant="subtitle2" component="h3" gutterBottom>
                    {relatedProduct.name}
                  </Typography>
                  <Typography variant="body2" color="text.primary" sx={{ fontWeight: "bold" }}>
                    KSh {formatNumberWithCommas(relatedProduct.price)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}

export default SingleProductPage
