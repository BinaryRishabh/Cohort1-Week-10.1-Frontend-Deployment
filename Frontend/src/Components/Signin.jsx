import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../Store/Atoms/admin";

function Signin() {
    const navigate = useNavigate();
    const setUser = useSetRecoilState(userState);

    const[email, setEmail] = useState("");
    const [password, setPassword]  = useState("");

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 150 }}>
                <Typography variant="h6">Welcome to Coursera! Signin below.</Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
                <div style={{ backgroundColor: "#fff", width: 400, padding: 20, borderRadius: 4 }}>
                    <TextField 
                        fullWidth = { true }
                        variant="outlined" 
                        label="Email" 
                        onChange={e => {
                            setEmail(e.target.value);
                        }}
                    />
                    <br /><br />
                    <TextField 
                        fullWidth = { true }
                        variant="outlined" 
                        label="Password" 
                        onChange={e => {
                            setPassword(e.target.value);
                        }}
                    />
                    <br /><br />
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                            fetch("http://localhost:3000/api/admin/signin", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    email: email,
                                    password: password
                                })
                            })
                            .then(res => {
                                return res.json();
                            })
                            .then(res => {
                                const token = res.token;
                                // console.log(token);
                                localStorage.setItem("token", token);
                                if(token) {
                                    setUser({ user: email, isLoading: false });
                                    navigate("/");
                                }
                            })
                        }}
                    >Signin</Button>
                </div>
            </div>
        </>
    )
}

export default Signin;