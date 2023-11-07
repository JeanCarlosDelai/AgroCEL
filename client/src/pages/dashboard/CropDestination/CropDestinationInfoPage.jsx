import { useLocation } from 'react-router-dom';
import { useFetchOneCropDestination } from '../../../queries/cropsDestination/cropsDestination';
import TableCropDestinationInfo from '../../../components/pages/CropsDestination/TableCropDestinationInfo';

function CropDestinationInfoPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const crop_id = searchParams.get('crop_id');
  const crop_destination_id = searchParams.get('crop_destination_id');

  const cropDestination = useFetchOneCropDestination(
    crop_id,
    crop_destination_id,
  );
  return (
    <div className="App">
      <TableCropDestinationInfo cropDestination={cropDestination} />
    </div>
  );
}

export default CropDestinationInfoPage;
