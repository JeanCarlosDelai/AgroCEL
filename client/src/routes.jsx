import { Route, Routes } from 'react-router-dom';
import { Landing, Register, Error, ProtectedRoute } from './pages';
import { SharedLayout, Profile } from './pages/dashboard';
import PropertysContainer from './pages/dashboard/Propertys/PropertysContainer';
import PropertysArea from './pages/dashboard/Areas/AreasContainer';
import AreaInfoPage from './pages/dashboard/Areas/AreaInfoPage';
import FildsNotebookContainer from './pages/fieldNotebbok/FieldNotebook';
import Login from './pages/Login';

export function AppRoutes() {
  return (
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
        <Route path="areas" element={<PropertysArea />} />
        <Route path="area-info" element={<AreaInfoPage />} />
        <Route path="field-notebook" element={<FildsNotebookContainer />} />
      </Route>
      <Route path="landing" element={<Landing />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
