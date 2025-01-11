"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Grid2 as Grid,
  Typography,
  Paper,
} from "@mui/material";
import { ACCOUNTS, CATEGORIES, PAYMENT_MODES } from "@/constant";
import { addExpense } from "@/app/actions/expenseActions";

const AddExpense: React.FC = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [description, setDescription] = useState("");
  const [account, setAccount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await addExpense(formData);
    if (response.success) {
      // Reset form
      setAmount("");
      setCategory("");
      setPaymentMode("");
      setDescription("");
      setAccount("");
      setDate("");
      // You might want to add some feedback to the user here
    } else {
      // Handle error (e.g., show an error message to the user)
      console.error("Failed to add expense");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 400, height: "100%" }}>
      <Typography variant="h5" gutterBottom>
        Add Expense
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{
          height: "calc(100% - 32px)",
        }}
      >
        <Grid container spacing={2} height={"100%"} alignContent={"center"}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Amount"
              type="number"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              inputProps={{ step: "0.01" }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              fullWidth
              label="Category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              {CATEGORIES.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              fullWidth
              label="Payment Mode"
              name="payment_mode"
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
              required
            >
              {PAYMENT_MODES.map((mode) => (
                <MenuItem key={mode} value={mode}>
                  {mode}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              fullWidth
              label="Account"
              name="account"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              required
            >
              {ACCOUNTS.map((acc) => (
                <MenuItem key={acc} value={acc}>
                  {acc}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={2}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Date"
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>
          <Grid size={{ xs: 12 }} sx={{ marginTop: "auto" }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Expense
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AddExpense;
