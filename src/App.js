import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Featuredjobs from "./Components/Featuredjobs";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import Featuredemployers from "./Components/Featuredemployers";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Loginemp from "./Components/Loginemp";
import Loginjobb from "./Components/Loginjobb";
import Signupjob1 from "./Components/Signupjob";
import Signupemp from "./Components/Singnupemp";
import NotFound from "./Components/NotFound";
import Jobseekpp from "./Components/Jobseekpp";
import Employerpp from "./Components/Employerpp";
import Jobdescription from "./Components/Jobdescription";
import Category from "./Components/Category";
import Employerdash from "./Components/Employerdash";
import Removejob from "./Components/removejob";
import Jobseekdash from "./Components/jobseekdash";
import Cv from "./Components/cv";
import Jobdescriptiontrial from "./Components/Jobdescriptiontrial";
import Jobdescriptionedit from "./Components/Jobdescriptionedit";
import UpdateFeatured from "./Components/updatefeatured";
import Termsofuse from "./Components/termsofuse";
import JobPostForm from "./Components/Jobpostform";
import CategorySingle from "./Components/categorySingle";
import Singlejobdescription from "./Components/singlejobdescription";
import Adminlogin from "./Components/Adminlogin";
import AdminRoutes from "./Components/AdminProtectedRoute";
import JobseekerRoutes from "./Components/JobseekerProtectedRoute";
import EmployerRoutes from "./Components/EmployerProtectedRoute";
import EmployerppReadOnly from "./Components/EmployerppReadonly";
import Updateterms from "./Components/Updateterms";
import Headerloggedin from "./Components/headerlogedin";
import Headerloggedinemp from "./Components/headerlogedinemp";
import Applyjob from "./Components/Applyjob";
import JobseekerppReadOnly from "./Components/Jobseekerppreadonly";
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Featuredjobs />
                <Featuredemployers />
                <About />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Signupjob1 />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Loginjobb />
              </>
            }
          />
          <Route
            path="/loginemp"
            element={
              <>
                <Loginemp />
              </>
            }
          />
          <Route
            path="/signupemp"
            element={
              <>
                <Signupemp />
              </>
            }
          />
          <Route
            path="/adminlogin"
            element={
              <>
                <Adminlogin />
              </>
            }
          />
          <Route
            path="/jobseekerppreadonly"
            element={
              <>
                <JobseekerppReadOnly />
              </>
            }
          />

          <Route element={<JobseekerRoutes />}>
            <Route
              path="/jobseekerpp/:usernamejobseek"
              element={
                <>
                  <Jobseekpp />
                </>
              }
            />
            <Route
              path="/applyjob/:jobId"
              element={
                <>
                  <Applyjob />
                </>
              }
            />
            <Route
              path="/jobseekerppreadonly"
              element={
                <>
                  <JobseekerppReadOnly />
                </>
              }
            />

            <Route
              path="/jobseekerpp"
              element={
                <>
                  <Jobseekpp />
                </>
              }
            />
          </Route>
          <Route element={<EmployerRoutes />}>
            <Route
              path="/employerpp"
              element={
                <>
                  <Employerpp />
                </>
              }
            />
            <Route
              path="/employerpp/:usernameEmployer"
              element={
                <>
                  <Employerpp />
                </>
              }
            />
          </Route>

          <Route
            path="/jobdescription"
            element={
              <>
                <Jobdescription />
              </>
            }
          />
          <Route
            path="/jobdescriptiontrial/:usernameEmployer"
            element={
              <>
                <Jobdescriptiontrial />
              </>
            }
          />
          <Route
            path="/jobdescriptiontrial"
            element={<Jobdescriptiontrial />}
          />
          <Route
            path="/jobdescriptiontrialedit"
            element={<Jobdescriptionedit />}
          />
          <Route path="/category" element={<Category />} />
          <Route path="/category/:categoryName" element={<CategorySingle />} />
          <Route element={<AdminRoutes />}>
            <Route path="/admindash" element={<Employerdash />} />
            <Route path="/jobseekdash" element={<Jobseekdash />} />
            <Route path="/removejob" element={<Removejob />} />
            <Route path="/updatefeatured" element={<UpdateFeatured />} />
            <Route path="/employerdash" element={<Employerdash />} />
            <Route path="/updateterms" element={<Updateterms />} />
          </Route>
          <Route path="/termsofuse" element={<Termsofuse />} />

          <Route path="/cv" element={<Cv />} />
          <Route path="/jobpost/:usernameEmployer" element={<JobPostForm />} />
          <Route
            path="/singlejobdescription/jobdescription/:jobId"
            element={<Singlejobdescription />}
          />
          <Route
            path="/employerppreadonly/:usernameEmployer"
            element={<EmployerppReadOnly />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
