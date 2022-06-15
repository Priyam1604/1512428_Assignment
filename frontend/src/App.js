import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import {
  Home as AdminHome,
  Class,
  Courses,
  Lecturers,
  Semester,
  Students, 
  EnrollLists,
} from "./components/admin";

import {Home as StudentHome} from './components/student'

import Login from "./components/Login";
import MarkLists from "./components/student/MarkLists";
import LectureHome from "./components/lecture/LectureHome";
import LectureNav from "./components/lecture/LectureNav";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/student" exact element={<StudentHome />} >
            <Route path="home" element={<MarkLists />}/>
          </Route>
          <Route path="/lecture" exact element={<LectureNav />} >
            <Route path="home" element={<LectureHome />}/>
          </Route>
          <Route path="admin" element={<AdminHome />}>
            <Route path="semester" element={<Semester />} />
            <Route path="course" element={<Courses />} />
            <Route path="lecture" element={<Lecturers />} />
            <Route path="class" element={<Class />} />
            <Route path="student" element={<Students />} />
            <Route path="enrolls" element={<EnrollLists />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
