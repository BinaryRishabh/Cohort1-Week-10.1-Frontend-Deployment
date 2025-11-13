import {Button, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isUserStateSelector } from "../Store/Selectors/admin";
import { isLoadingStateSelector } from "../Store/Selectors/isLoading";
import { userState } from "../Store/Atoms/admin";
// import axios from "axios";

function AppBar() {
    const navigate = useNavigate();
    const isLoading = useRecoilValue(isLoadingStateSelector);
    const user = useRecoilValue(isUserStateSelector);
    const setUser = useSetRecoilState(userState);

    if(isLoading) return <>Loading...</>

    return (
        <div style={{display: "flex", justifyContent:"space-between", padding: "4px"}}>
            <div>
                <Button
                    style={{ color:"#000"}} 
                    sx={{ "&:hover": { backgroundColor: "#F2F2F2" } }} 
                    onClick={() => { 
                        navigate("/")
                    }}>
                    <Typography>Coursera</Typography>
                </Button>
            </div>
            
            {user && <div style={{ display: "flex", justifyContent:"space-between" }}>
                <Button
                    size="small"
                    style={{ marginRight: 10, color: "#000", "&:hover": { backgroundColor: "#F2F2F2"}}}
                    onClick={
                        () => navigate("/addCourse")
                    }
                > AddCourse </Button>
                <Button
                    size="small"
                    sx={{ "&:hover": { backgroundColor: "#F2F2F2"}}}
                    style={{ marginRight: 10, color: "#000"}}
                    onClick={() => {
                        navigate("/allCourses");
                    }}
                > Courses </Button>
                <Button
                    style={{ color: "#000", "&:hover": { backgroundColor: "#F2F2F2" }}}
                    size="small"
                    onClick={() => {
                        localStorage.clear();
                        setUser({ user: null, isLoading: false});
                        navigate("/");
                    }}
                >LogOut</Button>
            </div> }
        </div>
    )
}

export default AppBar;