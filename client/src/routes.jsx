import { Route, Routes } from 'react-router-dom';
import { Landing, Register, Error, ProtectedRoute } from './pages';
import { SharedLayout, Profile } from './pages/dashboard';
import PropertysContainer from './pages/dashboard/Propertys/PropertysContainer';
import CreateProperty from './pages/dashboard/Propertys/CreateProperty';
import PropertysArea from './pages/dashboard/Areas/AreasContainer';
import CreateArea from './pages/dashboard/Areas/CreateArea';
import AreaInfoPage from './pages/dashboard/Areas/AreaInfoPage';
import FildsNotebookContainer from './pages/fieldNotebbok/FieldNotebook';
import CreateCrop from './pages/fieldNotebbok/Crops/CreateCrop';

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
        <Route path="create-property" element={<CreateProperty />} />
        <Route path="areas" element={<PropertysArea />} />
        <Route path="create-area" element={<CreateArea />} />
        <Route path="area-info" element={<AreaInfoPage />} />
        <Route path="field-notebook" element={<FildsNotebookContainer />} />
        <Route path="create-crop" element={<CreateCrop />} />
      </Route>
      <Route path="landing" element={<Landing />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
