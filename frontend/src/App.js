import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';
import Complier from './Pages/Complier/Complier';
import Navbar from './Components/Navbar';
import HomePage from './Pages/HomePage/HomePage';
import CoursePage from './Pages/Course/CoursePage';
import { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import Loading from './Components/Loading';
import IndividualCoursePage from './Pages/Course/IndividualCoursePage';
import AdminPage from './Pages/Admin/AdminPage';
import CreateCourse from './Pages/Admin/CreateCourse';
import CreateNotes from './Pages/Admin/CreateNotes';
import baseUrl from './baseUrl/baseUrl';
import Footer from './Components/Footer';
import Aboutus from './Pages/HomePage/Aboutus';
import DashboardPage from './Pages/Dashboard/DashboardPage';
import ContactUs from './Pages/HomePage/ContactUs';
import Forum from './Pages/HomePage/Forum';

const App = () => {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/auth/me`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.error) return null;
        throw new Error(data.error || 'Something went wrong');
      }
      return data;
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Protected: login required */}
        <Route
          path="/course"
          element={authUser ? <CoursePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/course/:id"
          element={authUser ? <IndividualCoursePage /> : <Navigate to="/login" />}
        />

        {/* Admin-only routes */}
        {authUser?.role !== 'user' && (
          <>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/course/create" element={<CreateCourse />} />
            <Route path="/admin/notes/create/:id" element={<CreateNotes />} />
          </>
        )}

        {/* Auth-check for additional user-only sections */}
        <Route
          path="/dashboard"
          element={authUser ? <DashboardPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/contact"
          element={authUser ? <ContactUs /> : <Navigate to="/login" />}
        />
        <Route
          path="/forum"
          element={authUser ? <Forum /> : <Navigate to="/login" />}
        />

        {/* Public access */}
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
        <Route path="/aboutus" element={<Aboutus />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
};

export default App;
