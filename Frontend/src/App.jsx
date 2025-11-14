import {BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import AppBar from "./Components/AppBar";
import Home from "./Components/Home";
import AddCourse from "./Components/AddCourse";
import Courses from "./Components/Courses";
import Course from "./Components/Course";
import { useEffect } from "react";
import axios from "axios";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { userState } from "./Store/Atoms/admin";
import { BASE_URL } from "../config";


function App() {

  return (
    <RecoilRoot> {/* The components that are wrapped inside the RecoilRoot can only use the properties of Recoil
                        like here: AppBar, Home, Sihnup, Signin, Course, etc. But as "App" is wrapped inside it, so we 
                        cannot use in it. */}
      <div style={{ 
        backgroundColor:"#F2F2F2", 
        minHeight: "100vh", 
        width: "100%" 
      }}>
        
          <Router>
            <AppBar />
            <InitUser /> {/* This component has been declared below.*/}
            <Routes>
              <Route path="/" element={ <Home /> } /> 
              <Route path="/signup" element={ <Signup /> }/>
              <Route path="/signin" element={ <Signin /> }/>
              <Route path="/addCourse" element={ <AddCourse /> } />
              <Route path="/allCourses" element={ <Courses /> } />
              <Route path="/course/:courseId" element={ <Course />} />
            </Routes>
          </Router>
      </div>
    </RecoilRoot>
  )
}


// We are writing this here not inside App.jsx file because, the App.jsx is not inside the "<RecoilRoot>".
// And this function/component has been initialized inside the "<RecoilRoot>".
function InitUser() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState); // "userState" is an atom defined inside the File 
                                                // /Store/Atoms/user.js and we are setting the state of this atom
                                                // using the recoil function that is used to set the state of
                                                // an atom. i.e. useSetRecoilState();

  const init = async() => {
    try {
      const response = await axios.get(`${BASE_URL}/api/admin/verify`, {
        method: "GET",
        headers: {
          "authorization": localStorage.getItem("token")
        }
      })

      if(response.data.user) {
        setUser({
          isLoading: false,
          user: response.data.user
        })
      }
      else {
        setUser({
          isLoading: false,
          user: null
        })
        navigate("/");
      }
    }
    catch (e) {
      setUser({
        isLoading: false,
        user: null
      })
      navigate("/");
    }
  }

  useEffect(() => {
    init(); // This function has been declared just above.
  }, []);

  return <></>
}

export default App;