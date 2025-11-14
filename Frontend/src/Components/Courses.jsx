import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";

function Courses() {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch(`${BASE_URL}/api/course/allCourses`, {
            method: "GET",
            headers: {
                authorization: localStorage.getItem("token")
            }
        })
            .then(res => {
                return res.json();
            })
            .then(res => {
                console.log(res.courses);
                console.log(typeof(res.courses))
                if(res.courses) setCourses(res.courses);
            })
    }, [])

    return (
        <>
            <Course courses={courses}></Course>
        </>
    )
}
function Course(props) {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', padding: '0 20px', margin: '0 auto' }}>
            {props.courses.map(course => (
                <div key={course.id} style={{ flex: '0 0 calc(33.33% - 20px)',minWidth: '250px',maxWidth: '300px',boxSizing: 'border-box' }}>
                    <Display course={course} />
                </div>
            ))}
        </div>
    )
}

function Display(props) {
    const navigate = useNavigate();

    return (
        <Button 
            fullWidth
            sx={{
                padding: '0 !important', // Remove default button padding
                margin: '0 !important', // Remove default button margin
                textTransform: 'none', // Remove uppercase transformation
                textAlign: 'left', // Keep text aligned left
                display: 'block', // Make button behave like div
                '&:hover': {
                    backgroundColor: 'transparent !important', // Remove default hover background
                    transform: 'translateY(-2px)', // Add your custom hover effect
                    boxShadow: '0 6px 20px rgba(0,0,0,0.15)' // Enhanced shadow on hover
                },
                '&:active': {
                    backgroundColor: 'transparent !important', // Remove active state background
                    transform: 'translateY(0)' // Reset transform on click
                }
            }}

            onClick={() => {
                navigate(`/course/${props.course.id}`);
            }}
        >
            <div style={{
                width: '100%', backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', overflow: 'hidden', transition: 'transform 0.3s ease, box-shadow 0.3s ease', cursor: 'pointer' }}>
                {/* Image Section */}
                <div style={{ width: '100%', height: '160px', overflow: 'hidden' }}>
                    <img 
                        src={props.course.imageLink || ''} 
                        style={{  width: '100%',  height: '100%',  objectFit: 'cover',  objectPosition: 'center'  }} 
                        alt={props.course.title}
                    />
                </div>
                
                {/* Content Section */}
                <div style={{ padding: '20px' }}>
                    <h3 style={{ margin: '0 0 10px 0', color: '#2d3436', fontSize: '18px', fontWeight: '600' }}>
                        {props.course.title}
                    </h3>
                    
                    <p style={{ margin: '0 0 15px 0', color: '#636e72', fontSize: '14px', lineHeight: '1.4'  }}>
                        {props.course.description}
                    </p>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'  }}>
                        <span style={{ color: '#e84393', fontSize: '16px', fontWeight: 'bold' }}>
                            ${props.course.price}
                        </span>
                    </div>
                </div>
            </div>
        </Button>
    )
}

export default Courses;