"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
  Divider,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Checkbox,
  FormControlLabel,
  TextField,
  InputAdornment,
  Paper,
  Rating,
  useTheme,
  useMediaQuery,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material"
import { FavoriteBorder, ShoppingCart, ViewList, ViewModule, FilterList, Search } from "@mui/icons-material"
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
  },
]

// Helper function to format numbers with commas
const formatNumberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const ProductDetailsPage = () => {
  const theme = useTheme()
  const router = useRouter()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  // State for products and filters
  const [products, setProducts] = useState(sampleProducts)
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [priceRange, setPriceRange] = useState([0, 10000000])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)

  // Get unique categories and brands
  const categories = [...new Set(sampleProducts.map((product) => product.category))]
  const brands = [...new Set(sampleProducts.map((product) => product.brand))]

  // Handle price range change
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue)
  }

  // Handle category selection
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  // Handle brand selection
  const handleBrandChange = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand))
    } else {
      setSelectedBrands([...selectedBrands, brand])
    }
  }

  // Handle sort change
  const handleSortChange = (event) => {
    setSortBy(event.target.value)
  }

  // Handle search
  const handleSearch = (event) => {
    setSearchQuery(event.target.value)
  }

  // Filter and sort products
  useEffect(() => {
    let filteredProducts = [...sampleProducts]

    // Filter by price
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1],
    )

    // Filter by category
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) => selectedCategories.includes(product.category))
    }

    // Filter by brand
    if (selectedBrands.length > 0) {
      filteredProducts = filteredProducts.filter((product) => selectedBrands.includes(product.brand))
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query),
      )
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating)
        break
      case "cashback":
        filteredProducts.sort((a, b) => b.cashback - a.cashback)
        break
      default:
        // 'featured' - no sorting needed
        break
    }

    setProducts(filteredProducts)
  }, [priceRange, selectedCategories, selectedBrands, sortBy, searchQuery])

  // Add to cart function
  const addToCart = (product) => {
    // Create a cart item from the product
    const cartItem = {
      id: `item${product.id}`,
      name: product.name,
      size: "medium",
      color: "blue",
      material: "Plastic",
      seller: "Artist Market",
      price: product.price,
      basePrice: product.price,
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

  // Navigate to product detail
  const navigateToProduct = (productId) => {
    router.push(`/product-details/${productId}`)
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <MuiLink underline="hover" color="inherit" sx={{ cursor: "pointer" }} onClick={() => router.push("/")}>
          Home
        </MuiLink>
        <Typography color="text.primary">Products</Typography>
      </Breadcrumbs>

      <Grid container spacing={3}>
        {/* Filters - Desktop */}
        {!isMobile && (
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Filters
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {/* Price Range */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Price Range
                </Typography>
                <Slider
                  value={priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={10000000}
                  step={100000}
                  valueLabelFormat={(value) => `KSh ${formatNumberWithCommas(value)}`}
                />
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                  <Typography variant="body2">KSh {formatNumberWithCommas(priceRange[0])}</Typography>
                  <Typography variant="body2">KSh {formatNumberWithCommas(priceRange[1])}</Typography>
                </Box>
              </Box>

              {/* Categories */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Categories
                </Typography>
                {categories.map((category) => (
                  <FormControlLabel
                    key={category}
                    control={
                      <Checkbox
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        size="small"
                      />
                    }
                    label={
                      <Typography variant="body2">
                        {category} ({sampleProducts.filter((p) => p.category === category).length})
                      </Typography>
                    }
                  />
                ))}
              </Box>

              {/* Brands */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Brands
                </Typography>
                {brands.map((brand) => (
                  <FormControlLabel
                    key={brand}
                    control={
                      <Checkbox
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandChange(brand)}
                        size="small"
                      />
                    }
                    label={
                      <Typography variant="body2">
                        {brand} ({sampleProducts.filter((p) => p.brand === brand).length})
                      </Typography>
                    }
                  />
                ))}
              </Box>
            </Paper>
          </Grid>
        )}

        {/* Products */}
        <Grid item xs={12} md={!isMobile ? 9 : 12}>
          {/* Toolbar */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              {/* Search */}
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearch}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Sort */}
              <Grid item xs={6} sm={3} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Sort By</InputLabel>
                  <Select value={sortBy} onChange={handleSortChange} label="Sort By">
                    <MenuItem value="featured">Featured</MenuItem>
                    <MenuItem value="price-low">Price: Low to High</MenuItem>
                    <MenuItem value="price-high">Price: High to Low</MenuItem>
                    <MenuItem value="rating">Highest Rated</MenuItem>
                    <MenuItem value="cashback">Highest Cashback</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* View Mode */}
              <Grid item xs={6} sm={3} md={3}>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <IconButton color={viewMode === "grid" ? "primary" : "default"} onClick={() => setViewMode("grid")}>
                    <ViewModule />
                  </IconButton>
                  <IconButton color={viewMode === "list" ? "primary" : "default"} onClick={() => setViewMode("list")}>
                    <ViewList />
                  </IconButton>
                </Box>
              </Grid>

              {/* Filter Button - Mobile Only */}
              {isMobile && (
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<FilterList />}
                    onClick={() => setFilterDrawerOpen(true)}
                  >
                    Filters
                  </Button>
                </Grid>
              )}
            </Grid>
          </Paper>

          {/* Results Count */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Showing {products.length} results
            </Typography>
          </Box>

          {/* Products Grid/List */}
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid
                item
                key={product.id}
                xs={12}
                sm={viewMode === "grid" ? 6 : 12}
                md={viewMode === "grid" ? 4 : 12}
                lg={viewMode === "grid" ? 3 : 12}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: viewMode === "list" ? "row" : "column",
                    "&:hover": {
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    },
                    cursor: "pointer",
                  }}
                >
                  {/* Product Image */}
                  <Box
                    sx={{
                      position: "relative",
                      width: viewMode === "list" ? { xs: "40%", sm: "30%", md: "20%" } : "100%",
                      p: 2,
                    }}
                    onClick={() => navigateToProduct(product.id)}
                  >
                    {/* Cashback Badge */}
                    <Chip
                      label={`${product.cashback}% Cashback`}
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
                      image={product.image}
                      alt={product.name}
                      sx={{
                        height: viewMode === "list" ? 120 : 180,
                        objectFit: "contain",
                      }}
                    />
                  </Box>

                  {/* Product Details */}
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      p: 2,
                    }}
                  >
                    {/* Product Info */}
                    <Box onClick={() => navigateToProduct(product.id)}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Item code: {product.itemCode}
                      </Typography>

                      <Typography variant="subtitle1" component="h2" gutterBottom sx={{ fontWeight: 500 }}>
                        {product.name}
                      </Typography>

                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Rating value={product.rating} precision={0.5} size="small" readOnly sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          ({product.reviews})
                        </Typography>
                      </Box>

                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {product.category} | {product.brand}
                      </Typography>
                    </Box>

                    {/* Price and Actions */}
                    <Box
                      sx={{
                        mt: "auto",
                        display: "flex",
                        flexDirection: viewMode === "list" ? "row" : "column",
                        alignItems: viewMode === "list" ? "center" : "flex-start",
                        justifyContent: viewMode === "list" ? "space-between" : "flex-start",
                      }}
                    >
                      <Typography
                        variant="h6"
                        color="text.primary"
                        sx={{ fontWeight: "bold", mb: viewMode === "list" ? 0 : 1 }}
                      >
                        KSh {formatNumberWithCommas(product.price)}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          width: viewMode === "list" ? "auto" : "100%",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<ShoppingCart />}
                          onClick={(e) => {
                            e.stopPropagation()
                            addToCart(product)
                          }}
                          sx={{
                            flex: viewMode === "list" ? "none" : 1,
                            textTransform: "none",
                          }}
                        >
                          Add to Cart
                        </Button>
                        <IconButton
                          color="primary"
                          sx={{ border: "1px solid", borderColor: "divider" }}
                          onClick={(e) => {
                            e.stopPropagation()
                            // Add to wishlist functionality would go here
                          }}
                        >
                          <FavoriteBorder />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}

            {/* No Results */}
            {products.length === 0 && (
              <Grid item xs={12}>
                <Paper sx={{ p: 4, textAlign: "center" }}>
                  <Typography variant="h6" gutterBottom>
                    No products found
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Try adjusting your filters or search query
                  </Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ProductDetailsPage
