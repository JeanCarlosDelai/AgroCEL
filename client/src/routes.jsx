import { Route, Routes } from 'react-router-dom';
import { Landing, Register, Error, ProtectedRoute } from './pages';
import { SharedLayout, Profile } from './pages/dashboard';
import PropertysContainer from './pages/dashboard/Propertys/PropertysContainer';
import PropertysArea from './pages/dashboard/Areas/AreasContainer';
import AreaInfoPage from './pages/dashboard/Areas/AreaInfoPage';
import FildsNotebookContainer from './pages/fieldNotebbok/FieldNotebook';
import Login from './pages/Login';
import CardHome from './pages/dashboard/CardHome';
import CropsSaleContainer from './pages/dashboard/CropSale/CropsSaleContainer';
import CropsSaleListContainer from './pages/dashboard/CropSale/CropsSaleListContainer';
import CropSaleInfoPage from './pages/dashboard/CropSale/CropSaleInfoPage';
import CropDestinationInfoPage from './pages/dashboard/CropDestination/CropDestinationInfoPage';

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
        <Route path="sale" element={<CropsSaleContainer />} />
        <Route path="view-sale" element={<CropsSaleListContainer />} />
        <Route path="crop-sale-info" element={<CropSaleInfoPage />} />
        <Route
          path="crop-destination-info"
          element={<CropDestinationInfoPage />}
        />
        <Route path="/" element={<CardHome />} />
      </Route>
      <Route path="landing" element={<Landing />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
CropSaleInfoPage;
