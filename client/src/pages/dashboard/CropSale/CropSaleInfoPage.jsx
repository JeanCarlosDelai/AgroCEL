import { useLocation } from 'react-router-dom';
import { useFetchOneCropSale } from '../../../queries/cropsSale/cropsSale';
import TableCropSaleInfo from '../../../components/pages/CropsSale/TableCropSaleInfo';

function CropSaleInfoPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const crop_id = searchParams.get('crop_id');
  const crop_sale_id = searchParams.get('crop_sale_id');

  const cropSale = useFetchOneCropSale(crop_id, crop_sale_id);

  return (
    <div className="App">
      <TableCropSaleInfo cropSale={cropSale} />
    </div>
  );
}

export default CropSaleInfoPage;
