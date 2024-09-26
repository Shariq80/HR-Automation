// frontend/src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import { AuthProvider, useAuth } from './services/authService';

import Dashboard from './components/Dashboard';
import JobPostingForm from './components/JobPostingForm';
import JobDetail from './components/JobDetail';
import AdminPortal from './components/AdminPortal';
import Apply from './components/Apply';
import ManageApplications from './components/ManageApplications';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
          <Route path="/jobs/create" element={<ProtectedRoute component={JobPostingForm} roles={['hr', 'admin']} />} />
          <Route path="/jobs/:id" element={<ProtectedRoute component={JobDetail} />} />
          <Route path="/admin" element={<ProtectedRoute component={AdminPortal} roles={['admin']} />} />

          <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
          <Route path="/jobs/create" element={<ProtectedRoute component={JobPostingForm} roles={['hr', 'admin']} />}/>
          <Route path="/jobs/:id" element={<ProtectedRoute component={JobDetail} />} />
          <Route path="/admin" element={<ProtectedRoute component={AdminPortal} roles={['admin']} />} />
          <Route path="/jobs/:jobId/apply" element={<ProtectedRoute component={Apply} />} />
          <Route path="/applications/manage" element={<ProtectedRoute component={ManageApplications} roles={['admin']} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

const ProtectedRoute = ({ component: Component, roles = [] }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!user || (roles.length && !roles.includes(user.role))) {
    return <Navigate to="/login" replace />;
  }

  return <Component />;
};

export default App;

// // frontend/src/App.js
// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import Dashboard from './components/Dashboard';
// import JobPostingForm from './components/JobPostingForm';
// import JobDetail from './components/JobDetail';
// import AdminPortal from './components/AdminPortal';
// import LoginPage from './components/LoginPage';
// import { useAuth } from './services/authService';

// function App() {
//   const { user, isLoading } = useAuth();

//   if (isLoading) return <div>Loading...</div>;

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />
//         <Route
//           path="/dashboard"
//           element={user ? <Dashboard /> : <Navigate to="/login" replace />}
//         />
//         <Route
//           path="/jobs/create"
//           element={user && user.role === 'hr' || user.role === 'admin' ? <JobPostingForm /> : <Navigate to="/login" replace />}
//         />
//         <Route
//           path="/jobs/:id"
//           element={user ? <JobDetail /> : <Navigate to="/login" replace />}
//         />
//         <Route
//           path="/admin"
//           element={user && user.role === 'admin' ? <AdminPortal /> : <Navigate to="/login" replace />}
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;