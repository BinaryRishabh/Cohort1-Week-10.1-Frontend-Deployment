import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {Button, Card, Grid, TextField, Typography} from "@mui/material";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { courseState } from "../Store/Atoms/course";
import { isCourseDetailsSelector, isCourseImageSelector, isCourseLoadingSelector, isCoursePriceSelector, isCourseTitleSelector } from "../Store/Selectors/course";
import { BASE_URL } from "../../config";

function Course() {
    const { courseId } = useParams();
    const setCourse = useSetRecoilState(courseState);
    const isLoading = useRecoilValue(isCourseLoadingSelector);

    useEffect(() => {
        setCourse({ isLoading: true, course: null });

        fetch(`${BASE_URL}/api/course/${courseId}`, {
            method: "GET",
            headers: {
                authorization: localStorage.getItem("token")
            }
        })
        .then(res => {
            return res.json();
        })
        .then(res => {
            // console.log(res.course);
            const courseDetail = res.course;
            if(res.course) {
                // console.log(courseDetail);
                setCourse({ isLoading: false, course: courseDetail });
            }
        })
        .catch(e => {
            setCourse({ isLoading: false, course: null});
        })
    }, [courseId]);

    if(isLoading) return <div>Loading...</div>
    
    console.log("ghdchv");
    return (
        <div>
            <GrayTopper />
            <Grid container spacing={0}>
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 5}}>
                    <UpdateCard />
                </Grid>
                <Grid  size={{ xs: 12, sm: 12, md: 12, lg: 7 }}>
                    <CourseCard />
                </Grid>
            </Grid>
        </div>
    )
}

function UpdateCard() {
    const courseDetails = useRecoilValue(isCourseDetailsSelector);
    const { courseId }= useParams();
    const setCourse = useSetRecoilState(courseState);
    
    const [title, setTitle] = useState(courseDetails.title);
    const [description, setDescription] = useState(courseDetails.description);
    const [image, setImage] = useState(courseDetails.imageLink);
    const [price, setPrice] = useState(courseDetails.price);

    return (
        <>
            <div style={{ display:"flex", justifyContent:"center"}}>
                <div style={{ backgroundColor: "#fff", height: 270, width: 400, padding: 20, borderRadius: 4, marginTop: 200, marginLeft: 20}}>
                    <Typography> Update Course Details </Typography>
                    <br/>
                    <TextField
                        fullWidth={ true }
                        // variant="outlined"
                        size="small"
                        label="Title"
                        value={title}
                        onChange={e => {
                            setTitle(e.target.value);
                        }}
                    />
                    <br/><br/>
                    {/* { title +" "+ description +" "+ image +" "+ price } */}

                    <TextField
                        fullWidth={ true }
                        // variant="outlined"
                        size="small"
                        label="Description"
                        value={description}
                        onChange={e => {
                            setDescription(e.target.value);
                        }}
                    />
                    <br/><br/>

                    <TextField
                        fullWidth={ true }
                        // variant="outlined"
                        size="small"
                        label="ImageLink"
                        value={image}
                        onChange={e => {
                            setImage(e.target.value);
                        }}
                    />
                    <br/><br/>

                    <TextField
                        fullWidth={ true }
                        // variant="outlined"
                        size="small"
                        label="Price"
                        value={price}
                        onChange={e => {
                            setPrice(e.target.value);
                        }}
                    />
                    <br/><br/>
                    
                    <Button 
                        variant="contained" 
                        size="small"
                        onClick={() => {
                            console.log("z", courseId);
                            axios.put(`${BASE_URL}/api/course/courseUpdate/${courseId}`, 
                                {
                                    title,
                                    description,
                                    imageLink: image,
                                    price
                                },
                                {
                                    headers: {
                                        "authorization": localStorage.getItem("token"),
                                    }
                            })
                            .then(res => {
                                console.log(res);
                                const updatedCourse = {
                                    id: courseId,
                                    title: title,
                                    description: description,
                                    imageLink: image,
                                    price: price
                                }
                                setCourse({ course: updatedCourse, isLoading: false });
                            })
                        }}
                    >Update Course</Button>
                </div>
            </div>
        </>
    )
}

function CourseCard() {
    return(
        <div style={{ marginTop: 190, justifyContent: "center" }}>
            <Card style={{ 
                width: 350, 
                minHeight: 200, 
                borderRadius: 20, 
                paddingBottom: 15,
                marginLeft: 350,
                zIndex: 2
            }}>
                <Image />
                <div style={{marginLeft: 10}}>
                    <Typography variant="h5">
                        <Title />                        
                    </Typography>
                    <Typography variant="subtitle2" style={{ color: "gray"}}>
                        <b> Price: </b> 
                        <Typography variant="subtitle1" component="span">
                        <Price />
                        </Typography>
                    </Typography>
                </div>
            </Card>
        </div>
    )
}


function GrayTopper() {
    return(
        <div style={{ height: 180, background: "#212121", top: 0, width: "100vw", zIndex: 0, marginBottom: -250}}>
            <div style={{ height: 180, display: "flex", justifyContent:"center", flexDirection: "column"}}>
                <Typography style={{ color: "#fff", fontWeight: 600}} variant="h3" textAlign={"center"}>
                <Title />
                </Typography>
            </div>
        </div>
    )
}

function Title() {
    const title = useRecoilValue(isCourseTitleSelector);
    return (
        <span> {title} </span>
    )
}

function Image() {
    const imageLink = useRecoilValue(isCourseImageSelector);
    return (
        <>
            <img src={imageLink} style={{ width: 350 }} />
        </>
    )
}

function Price() {
    const price = useRecoilValue(isCoursePriceSelector);
    return(
        <b> RS { price } </b>
    )
}

export default Course;