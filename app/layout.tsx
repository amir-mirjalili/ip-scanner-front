"use client";

import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    IP Scanner Dashboard
                </Typography>
                <Button color="inherit" component={Link} href="/">
                    Scan
                </Button>
                <Button color="inherit" component={Link} href="/assets">
                    Assets
                </Button>
            </Toolbar>
        </AppBar>
        <Container sx={{ mt: 4 }}>
            {children}
        </Container>
        </body>
        </html>
    );
}
