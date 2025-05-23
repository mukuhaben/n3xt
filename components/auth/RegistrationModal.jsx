"use client"

import { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Divider,
} from "@mui/material"
import { Close as CloseIcon } from "@mui/icons-material"
import { styled } from "@mui/material/styles"

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    maxWidth: "600px",
    width: "100%",
    margin: theme.spacing(2),
    borderRadius: theme.spacing(1),
  },
}))

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1, 2),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}))

const CloseButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  marginRight: -theme.spacing(1),
}))

const FormSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}))

const RegistrationModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    registrationType: "self",
    userType: "individual",
    individualName: "",
    contactPersonName: "",
    email: "",
    phoneNumber: "",
    cashbackPhoneNumber: "",
    kraPin: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleRadioChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Registration form submitted:", formData)
    // Here you would typically send the data to your API
    onClose()
  }

  return (
    <StyledDialog open={open} onClose={onClose} fullWidth aria-labelledby="registration-dialog-title">
      <StyledDialogTitle id="registration-dialog-title">
        Registration
        <CloseButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </CloseButton>
      </StyledDialogTitle>
      <DialogContent sx={{ p: 3, maxHeight: "80vh", overflowY: "auto" }}>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
            Create New Customer
          </Typography>

          <FormSection>
            <FormControl component="fieldset">
              <FormLabel component="legend">Registration Type</FormLabel>
              <RadioGroup row name="registrationType" value={formData.registrationType} onChange={handleRadioChange}>
                <FormControlLabel value="self" control={<Radio />} label="Self Registration" />
                <FormControlLabel value="agent" control={<Radio />} label="Registered by Sales Agent" />
              </RadioGroup>
            </FormControl>
          </FormSection>

          <FormSection>
            <FormControl component="fieldset">
              <FormLabel component="legend">Type of User</FormLabel>
              <RadioGroup row name="userType" value={formData.userType} onChange={handleRadioChange}>
                <FormControlLabel value="individual" control={<Radio />} label="Individual" />
                <FormControlLabel value="company" control={<Radio />} label="Company" />
              </RadioGroup>
            </FormControl>
          </FormSection>

          <FormSection>
            <Typography variant="subtitle1" gutterBottom>
              Individual Name{" "}
              <Typography component="span" color="error" variant="caption">
                (Please note: Your invoice will be generated in this name)
              </Typography>
            </Typography>
            <TextField
              fullWidth
              name="individualName"
              value={formData.individualName}
              onChange={handleChange}
              placeholder="Individual Name"
              variant="outlined"
              margin="dense"
              required
            />
          </FormSection>

          <FormSection>
            <Typography variant="subtitle1" gutterBottom>
              Contact Person Name
            </Typography>
            <TextField
              fullWidth
              name="contactPersonName"
              value={formData.contactPersonName}
              onChange={handleChange}
              placeholder="Contact Person Name"
              variant="outlined"
              margin="dense"
            />
          </FormSection>

          <FormSection>
            <Typography variant="subtitle1" gutterBottom>
              Email
            </Typography>
            <TextField
              fullWidth
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              variant="outlined"
              margin="dense"
              required
            />
          </FormSection>

          <FormSection>
            <Typography variant="subtitle1" gutterBottom>
              Phone Number
            </Typography>
            <TextField
              fullWidth
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="+254XXXXXXXX"
              variant="outlined"
              margin="dense"
              required
            />
          </FormSection>

          <FormSection>
            <Typography variant="subtitle1" gutterBottom>
              Cashback Phone Number{" "}
              <Typography component="span" color="error" variant="caption">
                (SAFARICOM MOBILE NUMBER ONLY)
              </Typography>
            </Typography>
            <TextField
              fullWidth
              name="cashbackPhoneNumber"
              value={formData.cashbackPhoneNumber}
              onChange={handleChange}
              placeholder="+254XXXXXXXX"
              variant="outlined"
              margin="dense"
              required
            />
          </FormSection>

          <FormSection>
            <Typography variant="subtitle1" gutterBottom>
              Individual KRA Pin{" "}
              <Typography component="span" color="error" variant="caption">
                (Fill this field to claim VAT)
              </Typography>
            </Typography>
            <TextField
              fullWidth
              name="kraPin"
              value={formData.kraPin}
              onChange={handleChange}
              placeholder="Enter KRA Pin"
              variant="outlined"
              margin="dense"
            />
          </FormSection>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </StyledDialog>
  )
}

export default RegistrationModal
