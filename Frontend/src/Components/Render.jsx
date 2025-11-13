import { formGroupClasses } from "@mui/material";
import { useState } from "react";

function Render() {
    const [course, setCourse] = useState([{
        uuid: 1,
        title: "vcdkjdc",
        description: "jhvvcdjcjk",
        imageLink: "vedgdjsk",
        price: 3612832,
        published: "False"
    }, {
        uuid: 2,
        title: "vcdkjdc",
        description: "jhvvcdjcjk",
        imageLink: "vedgdjsk",
        price: 3612832,
        published: "True"
    }]);
    return (
        <>
            <Display course={course}></Display>
            <Nested course={course}></Nested>
            <Seperate course={course}></Seperate>
            {course.map(element => {
                return (
                    <div key = {element.uuid}>
                        <div style={{backgroundColor: "red"}}>
                            {element.title} {}
                            {element.description} {}
                            {element.imageLink} {}
                            {element.price} {}
                            {element.published}
                        </div>
                        <br/>
                        <Render course={element}></Render>
                    </div>
                )
            })}
        </>
    );
}

function Seperate(props) {
    return(
        <div style={{backgroundColor:"pink"}}>
            {props.course.map(element => {
                return (
                    <div key={element.uuid}>
                        <Present title={element.title} 
                                description = {element.description} 
                                imageLink={element.imageLink} 
                                price={element.price}></Present>
                    </div>
                )
            })}
            <br/>
        </div>
    )
}

function Present(props) {
    return (
        <div >
            {props.title} {}
            {props.description} {}
            {props.imageLink} {}
            {props.price} {}
        </div>
    )
}

function Nested(props) {
    return(
        <>
            {props.course.map(element => {
                return (
                    <div style={{backgroundColor:"orange"}} key={element.uuid}>
                        <Show course={element}></Show>
                    </div>
                )
            })}
            <br/>
        </>
    )
}

function Show(props) {
    return (
        <div>
            {props.course.title} {}
            {props.course.description} {}
            {props.course.imageLink} {}
            {props.course.price} {}
            {props.course.published}
        </div>
    )
}

function Display(props) {
    return (
        <>
            {props.course.map(element => {
                return (
                    <div key={element.uuid} style={{backgroundColor:"yellow"}}>
                        {element.title} {}
                        {element.description} {}
                        {element.imageLink} {}
                        {element.price} {}
                        {element.published}
                    </div>
                )
            })}
            <br/>
        </>
    )
}

function Render(props) {
    return (
        <div style={{ backgroundColor:"green"}}>
            {props.course.title} {}
            {props.course.description} {}
            {props.course.imageLink} {}
            {props.course.price} {}
            {props.course.published}
        </div>
    )
}

export default Render;