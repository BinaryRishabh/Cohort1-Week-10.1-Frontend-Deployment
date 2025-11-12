import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCourse() {
    const navigate = useNavigate();

    const [title, setTile] = useState("");
    const [description, setDescription] = useState("");
    const [imageLink, setImageLink] = useState("");
    const [price, setPrice] = useState(0);
    const [published, setPublished] = useState(false);

    return (
        <>
         {/* { title +" "+ description +" "+ imageLink +" "+ price +" "+ published} */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: 60, marginBottom: 10}}>
                <Typography variant="h6">Add a Course</Typography>
            </div>
            <div style={{ display: "flex", justifyContent:"center"}}>
                <div style={{ backgroundColor:"#fff", height: 330, width: 400, padding: 10, borderRadius: 4}}>
                    <TextField 
                        fullWidth = { true }
                        variant="outlined" 
                        label="Title" 
                        size="small"
                        onChange={e => {
                            setTile(e.target.value);
                        }}
                    />
                    <br/><br/>
                    <TextField 
                        fullWidth = { true }
                        variant="outlined" 
                        label="Description" 
                        size="small"
                        onChange={e => {
                            setDescription(e.target.value);
                        }}
                    />
                    <br/><br/>
                    <TextField 
                        fullWidth = { true }
                        variant="outlined" 
                        label="Image Link" 
                        size="small"
                        onChange={e => {
                            setImageLink(e.target.value);
                        }}
                    />
                    <br/><br/>
                    <TextField 
                        fullWidth = { true }
                        variant="outlined" 
                        label="Price" 
                        size="small"
                        onChange={e => {
                            setPrice(e.target.value);
                        }}
                    />
                    <br/><br/>
                    <FormControl style={{ width: 130,}} size="small">
                        <InputLabel size="small">Published</InputLabel>
                        <Select
                            size="small"
                            label="Published"
                            value={published}
                            onChange={e => {
                                setPublished(e.target.value)
                            }}
                        >
                            <MenuItem value={true}>True</MenuItem>
                            <MenuItem value={false}>False</MenuItem>
                        </Select>
                    </FormControl>
                    <br/><br/>
                    <div style={{ display:"flex", justifyContent:"space-between"}}>
                        <Button 
                            variant="contained" 
                            size="small"
                            onClick={() => {
                                fetch("http://localhost:3000/course/addCourse", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "authorization": localStorage.getItem("token")
                                    },
                                    body: JSON.stringify({
                                        title: title,
                                        description: description,
                                        imageLink: imageLink,
                                        price: price,
                                        published: published
                                    })
                                })
                                .then(res => {
                                    return res.json();
                                })
                                .then(res => {
                                    navigate("/allCourses");
                                })
                            }}
                        >Add Course</Button>
                        {/* <Button 
                            variant="contained" 
                            size="small"
                            onClick={() => {
                                navigate("/allCourses");
                            }}
                        > All Courses </Button> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddCourse;