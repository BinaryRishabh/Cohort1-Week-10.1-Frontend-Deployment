import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoadingStateSelector } from "../Store/Selectors/isLoading";
import { isUserStateSelector } from "../Store/Selectors/admin";

function Home() {
    const navigate = useNavigate();
    const userLoading = useRecoilValue(isLoadingStateSelector);
    const user = useRecoilValue(isUserStateSelector);

    if(userLoading) return <></>

    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ marginLeft: 150, marginTop: 150 }}>
                <Typography 
                    variant="h6" 
                    fontSize={20} 
                    fontFamily={"calibri"}
                >COURSERA ADMIN</Typography>
                <Typography 
                    variant="h6" 
                    fontSize={15}
                > A place to learn, earn and grow.</Typography>
                {!user && <div> {/* This is the way to write if condition inside react return. Here, we have written
                                    "!user" so that when user is not logged in then only we will render these two 
                                    buttons else hide them. */}
                    <Button 
                        variant="contained" 
                        size="small" 
                        style={{ marginRight: 10 }} 
                        onClick={() => navigate("/signup")}
                    >SIGNUP</Button>
                    <Button 
                        variant="contained" 
                        size="small" 
                        onClick={() => navigate("/signin")}
                    >SIGNIN</Button> 
                </div> }
            </div>
            <div style={{ marginRight: 100, marginTop: 50 }}>
                <img style={{ height: 300, width: 500 }} src="pexels-pixabay-159844.jpg" />
            </div>
        </div>
    )
}

export default Home;