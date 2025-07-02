"use client";

import { useState } from "react";
import { Container, TextField, Button, Typography, Box, CircularProgress, Alert } from "@mui/material";
import axios from "axios";

export default function Home() {
  const [cidr, setCidr] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleScan = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/scan`, { cidr });
      setResult(response.data);
    } catch (err) {
      setError(axios.isAxiosError(err)? err.response?.data?.error : "Failed to start scan");
    }
    setLoading(false);
  };

  return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          IP Range Scanner
        </Typography>
        <Box mb={2}>
          <TextField
              label="IP Range (CIDR)"
              fullWidth
              value={cidr}
              onChange={(e) => setCidr(e.target.value)}
              placeholder="e.g. 192.168.1.0/24"
          />
        </Box>
        <Button variant="contained" onClick={handleScan} disabled={loading || !cidr}>
          {loading ? <CircularProgress size={24} /> : "Start Scan"}
        </Button>

        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

        {result && (
            <Box mt={4}>
              <Typography variant="h6">Scan Started</Typography>
              <pre>{JSON.stringify(result, null, 2)}</pre>
            </Box>
        )}
      </Container>
  );
}
