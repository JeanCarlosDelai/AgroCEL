import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Landing, Register, Error, ProtectedRoute } from './pages';
import { SharedLayout, Profile } from './pages/dashboard';
import { Footer } from './components/index';
import PropertysContainer from './pages/dashboard/Propertys/PropertysContainer';
import CreateProperty from './pages/dashboard/Propertys/CreateProperty';
function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route path="profile" element={<Profile />} />
          <Route path="propertys" element={<PropertysContainer />} />
          <Route path="create-property" element={<CreateProperty />} />
        </Route>
        <Route path="landing" element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer position="top-center" />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
