import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../Store/Atoms/admin";

function Signup() {
    const navigate = useNavigate();
    const setUser = useSetRecoilState(userState);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    return(
        <>
            {/* {email}
            {password} */}
            <div style={{ display:"flex", justifyContent:"center", marginTop:150, marginBottom: 10}}>
                <Typography variant="h6"> Welcome to Coursera! Signup below.</Typography>
            </div>
            <div style={{ display:"flex", justifyContent:"center"}}>
                <div style={{ backgroundColor:"#fff", width: 400, padding: 20, borderRadius: 4 }}>
                    <TextField 
                        fullWidth={true}
                        variant="outlined" 
                        label="Email"
                        onChange = {e => {
                            setEmail(e.target.value);
                        }}
                    />
                    <br/><br/>
                    <TextField 
                        fullWidth={true}
                        variant="outlined" 
                        label="Password"
                        onChange={e => {
                            setPassword(e.target.value);
                        }}
                    />
                    <br/><br/>
                    <Button 
                        variant="contained" 
                        size="small"
                        onClick={ () => {
                            fetch("http://localhost:3000/admin/signup", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
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
                                    setUser({ user: email, isLoading: false});
                                    navigate("/"); // We will not do this now. As we have set the user loggedin 
                                                      // or not loggedin state in the above line setUser(). 
                                                      // So as soon as the user signup successfully automaticallly 
                                                      // page will get refereshed.
                                }
                            })
                        }}
                        >Signup</Button>
                </div>
            </div>
        </>
    )
}

export default Signup;