import React from "react";
import { useState } from "react";
import { Card, CardContent, TextField, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = async () => {
        const newErrors = {};
        if (!email) newErrors.email = "Email is required";
        if (!password) newErrors.password = "Password is required";
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const res = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (res.ok) {
                alert("Signup successful. Please login.");
            } else {
                alert(data.message);
            }
        }
    };

    return (
        <div style={styles.container}>
            <Card style={styles.card}>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom>
                        Sign Up
                    </Typography>

                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!errors.password}
                        helperText={errors.password}
                    />

                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={handleSubmit}
                    >
                        Create Account
                    </Button>

                    <Typography align="center" sx={{ mt: 2 }}>
                        Already have an account? <Link to="/">Login</Link>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

const styles = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f8",
    },
    card: {
        width: 380,
    },
};

export default SignupPage;
