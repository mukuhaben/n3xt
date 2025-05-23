"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  Grid,
  TextField,
  Button,
  Avatar,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Badge,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import {
  Person,
  Email,
  Phone,
  LocationOn,
  Edit,
  Save,
  Cancel,
  Delete,
  PhotoCamera,
  Visibility,
  VisibilityOff,
  ShoppingBag,
  Inbox as InboxIcon,
  Settings as SettingsIcon,
  Notifications,
  CheckCircle,
  AccessTime,
  History,
  Favorite,
  ExitToApp,
} from "@mui/icons-material"
import { useRouter } from "next/navigation"

// Sample order data
const sampleOrders = [
  {
    id: "ORD-2023-001",
    date: "2023-10-15",
    total: 5600000,
    status: "Completed",
    items: 3,
    cashback: 280000,
    etimsInvoice: "ETIMS-001-2023",
  },
  {
    id: "ORD-2023-002",
    date: "2023-10-10",
    total: 1900000,
    status: "Completed",
    items: 1,
    cashback: 95000,
    etimsInvoice: "ETIMS-002-2023",
  },
  {
    id: "ORD-2023-003",
    date: "2023-10-05",
    total: 3800000,
    status: "Pending",
    items: 2,
    cashback: 190000,
    etimsInvoice: "ETIMS-003-2023",
  },
]

// Sample messages
const sampleMessages = [
  {
    id: 1,
    type: "order",
    title: "Order Confirmation",
    content: "Your order #ORD-2023-001 has been confirmed and is being processed.",
    date: "2023-10-15",
    read: true,
  },
  {
    id: 2,
    type: "support",
    title: "Support Ticket Update",
    content: "Your support ticket #ST-2023-005 has been resolved. Please let us know if you need further assistance.",
    date: "2023-10-12",
    read: false,
  },
  {
    id: 3,
    type: "promotion",
    title: "Special Offer for You!",
    content: "Enjoy 15% off on all office supplies this week. Use code OFFICE15 at checkout.",
    date: "2023-10-10",
    read: false,
  },
  {
    id: 4,
    type: "order",
    title: "Order Shipped",
    content: "Your order #ORD-2023-002 has been shipped. Expected delivery: Oct 12, 2023.",
    date: "2023-10-08",
    read: true,
  },
]

// Helper function to format numbers with commas
const formatNumberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const AccountPage = () => {
  const theme = useTheme()
  const router = useRouter()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  // Tab state
  const [tabValue, setTabValue] = useState(0)

  // User state
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [editedUser, setEditedUser] = useState(null)
  const [passwordChange, setPasswordChange] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [passwordError, setPasswordError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState("")
  const [profileSuccess, setProfileSuccess] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  // Messages state
  const [messages, setMessages] = useState(sampleMessages)

  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    orderUpdates: true,
    promotions: true,
    newsletter: true,
    twoFactorAuth: false,
    language: "English",
    currency: "KSh",
  })

  // Load user data
  useEffect(() => {
    // In a real app, you would fetch from an API
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("currentUser")

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)

        // Add some default fields if they don't exist
        const enhancedUser = {
          ...parsedUser,
          phone: parsedUser.phone || "+254 722 123456",
          address: parsedUser.address || "123 Main St, Nairobi",
          city: parsedUser.city || "Nairobi",
          county: parsedUser.county || "Nairobi County",
          postalCode: parsedUser.postalCode || "00100",
          profileImage: parsedUser.profileImage || null,
        }

        setUser(enhancedUser)
        setEditedUser(enhancedUser)
      } else {
        // Redirect to login if no user found
        router.push("/login")
      }
    }

    setLoading(false)
  }, [router])

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  // Toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode)
    if (!editMode) {
      setEditedUser({ ...user })
    } else {
      // Cancel editing
      setEditedUser(user)
    }
  }

  // Handle user field change
  const handleUserChange = (e) => {
    const { name, value } = e.target
    setEditedUser({
      ...editedUser,
      [name]: value,
    })
  }

  // Handle password field change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordChange({
      ...passwordChange,
      [name]: value,
    })
  }

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field],
    })
  }

  // Handle profile image change
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setEditedUser({
          ...editedUser,
          profileImage: reader.result,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  // Remove profile image
  const removeProfileImage = () => {
    setEditedUser({
      ...editedUser,
      profileImage: null,
    })
  }

  // Save profile changes
  const saveProfileChanges = () => {
    setUser(editedUser)
    setEditMode(false)
    setProfileSuccess("Profile updated successfully!")

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("currentUser", JSON.stringify(editedUser))
    }

    // Clear success message after 3 seconds
    setTimeout(() => {
      setProfileSuccess("")
    }, 3000)
  }

  // Change password
  const changePassword = () => {
    setPasswordError("")
    setPasswordSuccess("")

    // Validate passwords
    if (!passwordChange.currentPassword) {
      setPasswordError("Current password is required")
      return
    }

    if (!passwordChange.newPassword) {
      setPasswordError("New password is required")
      return
    }

    if (passwordChange.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters")
      return
    }

    if (passwordChange.newPassword !== passwordChange.confirmPassword) {
      setPasswordError("Passwords do not match")
      return
    }

    // In a real app, you would call your API to change the password
    // For demo, just show success message
    setPasswordSuccess("Password changed successfully!")

    // Reset password fields
    setPasswordChange({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })

    // Clear success message after 3 seconds
    setTimeout(() => {
      setPasswordSuccess("")
    }, 3000)
  }

  // Mark message as read
  const markMessageAsRead = (messageId) => {
    setMessages(messages.map((message) => (message.id === messageId ? { ...message, read: true } : message)))
  }

  // Handle settings change
  const handleSettingsChange = (e) => {
    const { name, checked } = e.target
    setSettings({
      ...settings,
      [name]: checked,
    })
  }

  // Open delete account dialog
  const openDeleteDialog = () => {
    setDeleteDialogOpen(true)
  }

  // Close delete account dialog
  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false)
  }

  // Delete account
  const deleteAccount = () => {
    // In a real app, you would call your API to delete the account

    // Clear user data from localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentUser")
    }

    // Redirect to home page
    router.push("/")

    // Close dialog
    closeDeleteDialog()
  }

  // Count unread messages
  const unreadCount = messages.filter((message) => !message.read).length

  // Loading state
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading account information...</Typography>
      </Container>
    )
  }

  // Not logged in
  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5">Please log in to view your account</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => router.push("/login")}>
          Go to Login
        </Button>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
        My Account
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Avatar sx={{ width: 80, height: 80, mx: "auto", mb: 2, bgcolor: "primary.main" }}>
              <Person sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h6" gutterBottom>
              {user.username}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {user.email}
            </Typography>
            <Button variant="outlined" size="small" onClick={() => setTabValue(0)}>
              Edit Profile
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 3, textAlign: "center" }}>
                <History sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Order History
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  View your past orders
                </Typography>
                <Button variant="contained" onClick={() => setTabValue(1)}>
                  View Orders
                </Button>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 3, textAlign: "center" }}>
                <Favorite sx={{ fontSize: 48, color: "error.main", mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Wishlist
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Manage your wishlist
                </Typography>
                <Button variant="contained">View Wishlist</Button>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 3, textAlign: "center" }}>
                <SettingsIcon sx={{ fontSize: 48, color: "info.main", mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Settings
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Account preferences
                </Typography>
                <Button variant="contained" onClick={() => setTabValue(3)}>
                  Manage Settings
                </Button>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 3, textAlign: "center" }}>
                <ExitToApp sx={{ fontSize: 48, color: "warning.main", mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Sign Out
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Logout from your account
                </Typography>
                <Button variant="outlined" color="warning" onClick={() => router.push("/logout")}>
                  Sign Out
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Paper sx={{ mt: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant={isMobile ? "fullWidth" : "standard"}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab label="Profile" icon={<Person />} iconPosition="start" sx={{ minHeight: 64 }} />
          <Tab label="My Orders" icon={<ShoppingBag />} iconPosition="start" sx={{ minHeight: 64 }} />
          <Tab
            label={
              <Badge badgeContent={unreadCount} color="error">
                Inbox
              </Badge>
            }
            icon={<InboxIcon />}
            iconPosition="start"
            sx={{ minHeight: 64 }}
          />
          <Tab label="Settings" icon={<SettingsIcon />} iconPosition="start" sx={{ minHeight: 64 }} />
        </Tabs>

        {/* Profile Tab */}
        <Box sx={{ p: 3, display: tabValue === 0 ? "block" : "none" }}>
          {profileSuccess && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {profileSuccess}
            </Alert>
          )}

          <Grid container spacing={4}>
            {/* Profile Image */}
            <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Avatar src={editedUser?.profileImage} alt={user.username} sx={{ width: 150, height: 150, mb: 2 }} />

                {editMode && (
                  <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 1 }}>
                    <Button variant="outlined" component="label" startIcon={<PhotoCamera />}>
                      Upload Photo
                      <input type="file" hidden accept="image/*" onChange={handleProfileImageChange} />
                    </Button>

                    {editedUser?.profileImage && (
                      <Button variant="outlined" color="error" onClick={removeProfileImage}>
                        Remove Photo
                      </Button>
                    )}
                  </Box>
                )}
              </Box>
            </Grid>

            {/* Profile Information */}
            <Grid item xs={12} md={8}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                <Button
                  variant={editMode ? "outlined" : "contained"}
                  color={editMode ? "error" : "primary"}
                  startIcon={editMode ? <Cancel /> : <Edit />}
                  onClick={toggleEditMode}
                  sx={{ mr: 1 }}
                >
                  {editMode ? "Cancel" : "Edit Profile"}
                </Button>

                {editMode && (
                  <Button variant="contained" color="primary" startIcon={<Save />} onClick={saveProfileChanges}>
                    Save Changes
                  </Button>
                )}
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={editedUser?.username || ""}
                    onChange={handleUserChange}
                    disabled={!editMode}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={editedUser?.email || ""}
                    onChange={handleUserChange}
                    disabled={!editMode}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={editedUser?.phone || ""}
                    onChange={handleUserChange}
                    disabled={!editMode}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={editedUser?.address || ""}
                    onChange={handleUserChange}
                    disabled={!editMode}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={editedUser?.city || ""}
                    onChange={handleUserChange}
                    disabled={!editMode}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="County"
                    name="county"
                    value={editedUser?.county || ""}
                    onChange={handleUserChange}
                    disabled={!editMode}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Postal Code"
                    name="postalCode"
                    value={editedUser?.postalCode || ""}
                    onChange={handleUserChange}
                    disabled={!editMode}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 4 }} />

              <Typography variant="h6" gutterBottom>
                Change Password
              </Typography>

              {passwordError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {passwordError}
                </Alert>
              )}

              {passwordSuccess && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  {passwordSuccess}
                </Alert>
              )}

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Current Password"
                    name="currentPassword"
                    type={showPasswords.current ? "text" : "password"}
                    value={passwordChange.currentPassword}
                    onChange={handlePasswordChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => togglePasswordVisibility("current")} edge="end">
                            {showPasswords.current ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="New Password"
                    name="newPassword"
                    type={showPasswords.new ? "text" : "password"}
                    value={passwordChange.newPassword}
                    onChange={handlePasswordChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => togglePasswordVisibility("new")} edge="end">
                            {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    name="confirmPassword"
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passwordChange.confirmPassword}
                    onChange={handlePasswordChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => togglePasswordVisibility("confirm")} edge="end">
                            {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" onClick={changePassword}>
                    Change Password
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        {/* Orders Tab */}
        <Box sx={{ p: 3, display: tabValue === 1 ? "block" : "none" }}>
          <Typography variant="h6" gutterBottom>
            Order History
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Items</TableCell>
                  <TableCell>Cashback</TableCell>
                  <TableCell>ETIMS Invoice</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sampleOrders.map((order) => (
                  <TableRow key={order.id} hover>
                    <TableCell>
                      <Button
                        color="primary"
                        onClick={() => router.push(`/orders/${order.id}`)}
                        sx={{ textTransform: "none" }}
                      >
                        {order.id}
                      </Button>
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>KSh {formatNumberWithCommas(order.total)}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell>KSh {formatNumberWithCommas(order.cashback)}</TableCell>
                    <TableCell>{order.etimsInvoice}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        color={order.status === "Completed" ? "success" : "warning"}
                        size="small"
                        icon={
                          order.status === "Completed" ? (
                            <CheckCircle fontSize="small" />
                          ) : (
                            <AccessTime fontSize="small" />
                          )
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {sampleOrders.length === 0 && (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="body1">You haven't placed any orders yet.</Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => router.push("/product-details")}
              >
                Start Shopping
              </Button>
            </Box>
          )}
        </Box>

        {/* Inbox Tab */}
        <Box sx={{ p: 3, display: tabValue === 2 ? "block" : "none" }}>
          <Typography variant="h6" gutterBottom>
            Messages
          </Typography>

          <List>
            {messages.map((message) => (
              <ListItem
                key={message.id}
                alignItems="flex-start"
                sx={{
                  mb: 1,
                  bgcolor: message.read ? "transparent" : "rgba(0, 0, 0, 0.03)",
                  borderRadius: 1,
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor:
                        message.type === "order"
                          ? "primary.main"
                          : message.type === "support"
                            ? "success.main"
                            : "warning.main",
                    }}
                  >
                    {message.type === "order" ? (
                      <ShoppingBag />
                    ) : message.type === "support" ? (
                      <InboxIcon />
                    ) : (
                      <Notifications />
                    )}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: message.read ? 400 : 600 }}>
                        {message.title}
                      </Typography>
                      {!message.read && <Chip label="New" size="small" color="primary" sx={{ ml: 1, height: 20 }} />}
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
                        {message.content}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {message.date}
                      </Typography>
                    </>
                  }
                />
                {!message.read && (
                  <Button
                    size="small"
                    onClick={() => markMessageAsRead(message.id)}
                    sx={{ alignSelf: "center", ml: 1 }}
                  >
                    Mark as Read
                  </Button>
                )}
              </ListItem>
            ))}
          </List>

          {messages.length === 0 && (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="body1">You have no messages.</Typography>
            </Box>
          )}
        </Box>

        {/* Settings Tab */}
        <Box sx={{ p: 3, display: tabValue === 3 ? "block" : "none" }}>
          <Typography variant="h6" gutterBottom>
            Notification Preferences
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.emailNotifications}
                    onChange={handleSettingsChange}
                    name="emailNotifications"
                    color="primary"
                  />
                }
                label="Email Notifications"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.smsNotifications}
                    onChange={handleSettingsChange}
                    name="smsNotifications"
                    color="primary"
                  />
                }
                label="SMS Notifications"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.orderUpdates}
                    onChange={handleSettingsChange}
                    name="orderUpdates"
                    color="primary"
                  />
                }
                label="Order Updates"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.promotions}
                    onChange={handleSettingsChange}
                    name="promotions"
                    color="primary"
                  />
                }
                label="Promotions and Offers"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.newsletter}
                    onChange={handleSettingsChange}
                    name="newsletter"
                    color="primary"
                  />
                }
                label="Newsletter"
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Privacy and Security
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.twoFactorAuth}
                    onChange={handleSettingsChange}
                    name="twoFactorAuth"
                    color="primary"
                  />
                }
                label="Two-Factor Authentication"
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Danger Zone
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Button variant="outlined" color="error" startIcon={<Delete />} onClick={openDeleteDialog}>
              Delete Account
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Delete Account Dialog */}
      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? This action cannot be undone and all your data will be
            permanently removed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteAccount} color="error">
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default AccountPage
