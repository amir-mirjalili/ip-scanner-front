"use client";

import { useEffect, useState } from "react";
import { TextField, Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Alert } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import {Asset} from "@/types/asset";


export default function AssetsPage() {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // State to handle errors

    useEffect( () => {
        const fetchAssets = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/assets`);
                setAssets(res.data);
                setError(null);
            } catch (e) {
                console.error("Failed to load assets", e);
                setError("Failed to load assets. Please try again later."); // Set error message
            } finally {
                setLoading(false); // Ensure loading is set to false regardless of success or failure
            }
        };
        fetchAssets();
    }, []);
    const filteredAssets = assets.filter(asset =>
        asset.ipAddress?.toLowerCase().includes(filter.toLowerCase()) || // Case-insensitive search
        (asset.hostname?.toLowerCase().includes(filter.toLowerCase()) ?? false) ||
        (asset.macAddress?.toLowerCase().includes(filter.toLowerCase()) ?? false)
    );

    return (
        <Box sx={{ p: 3 }}> {/* Add some padding to the main box */}
            <Typography variant="h4" gutterBottom>Assets</Typography>
            <TextField
                label="Filter by IP, Hostname, MAC"
                fullWidth
                sx={{ mb: 2 }}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />

            {error && ( // Display error message if an error occurred
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {filteredAssets.length === 0 && filter === "" ? (
                        <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
                            No assets found.
                        </Typography>
                    ) : filteredAssets.length === 0 && filter !== "" ? (
                        <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
                            No assets match your filter criteria.
                        </Typography>
                    ) : (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>IP Address</TableCell>
                                    <TableCell>Hostname</TableCell>
                                    <TableCell>MAC</TableCell>
                                    <TableCell>OS</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredAssets.map((asset) => (
                                    <TableRow key={asset.id}>
                                        <TableCell>{asset.ipAddress}</TableCell>
                                        <TableCell>{asset.hostname || "-"}</TableCell>
                                        <TableCell>{asset.macAddress || "-"}</TableCell>
                                        <TableCell>{asset.os || "-"}</TableCell>
                                        <TableCell>
                                            <Link href={`/assets/${asset.id}/edit`} style={{ textDecoration: 'none', color: 'blue' }}>
                                                Edit
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </>
            )}
        </Box>
    );
}