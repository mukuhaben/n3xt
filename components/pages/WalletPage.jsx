"use client"

import { Container, Typography, Box, Grid, Button, Card, CardContent } from "@mui/material"
import { AccountBalanceWallet, TrendingUp, History, GetApp } from "@mui/icons-material"

export default function WalletPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        E-Wallet
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <AccountBalanceWallet sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Current Balance
              </Typography>
              <Typography variant="h4" color="primary">
                $1,250.00
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <TrendingUp sx={{ fontSize: 48, color: "success.main", mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Total Cashback
              </Typography>
              <Typography variant="h4" color="success.main">
                $125.50
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <History sx={{ fontSize: 48, color: "info.main", mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Transactions
              </Typography>
              <Typography variant="h4" color="info.main">
                24
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Button variant="contained" fullWidth startIcon={<GetApp />}>
              Withdraw Funds
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button variant="outlined" fullWidth>
              Add Funds
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button variant="outlined" fullWidth>
              Transaction History
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button variant="outlined" fullWidth>
              Settings
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
