"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { TextField, Button, Box, Typography, CircularProgress, Alert } from "@mui/material";
import axios from "axios";
import {Asset} from "@/types/asset";

export default function EditAssetPage() {
    const {id} = useParams<{ id: string }>();
    const router = useRouter();
    const [asset, setAsset] = useState<Asset | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAsset = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/assets/${id}`);
                setAsset(res.data);
            } catch (e) {
                setError(axios.isAxiosError(e)? e.response?.data?.error : "Failed to load asset");
            }
            setLoading(false);
        };
        fetchAsset();
    }, [id]);

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:8080/assets/${id}`, asset);
            router.push("/assets");
        } catch (e) {
            setError(axios.isAxiosError(e)? e.response?.data?.error : "Failed to update asset");
        }
    };

    if (loading) return <CircularProgress/>;
    if (!asset) return <Typography>No asset found</Typography>;

    return (
        <Box>
            <Typography variant="h5" gutterBottom>Edit Asset</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
                label="IP Address"
                fullWidth
                sx={{mb: 2}}
                value={asset.ipAddress}
                disabled
            />
            <TextField
                label="Hostname"
                fullWidth
                sx={{mb: 2}}
                value={asset.hostname || ""}
                onChange={(e) => setAsset({...asset, hostname: e.target.value})}
            />
            <TextField
                label="MAC Address"
                fullWidth
                sx={{mb: 2}}
                value={asset.macAddress || ""}
                onChange={(e) => setAsset({...asset, macAddress: e.target.value})}
            />
            <TextField
                label="OS"
                fullWidth
                sx={{mb: 2}}
                value={asset.os || ""}
                onChange={(e) => setAsset({...asset, os: e.target.value})}
            />
            <Button variant="contained" onClick={handleSave}>Save</Button>
        </Box>
    );
}
