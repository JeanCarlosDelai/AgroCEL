import { CgDetailsMore } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import UpdateCropDestinationModal from './UpdateCropDestinationModal';
import DeleteCropDestinationModal from './DeleteCropDestinationModal';
const CropDestination = (cropDestination) => {
  return (
    <>
      <tr className="border-b dark:border-gray-700">
        <td scope="row" className="px-4 py-3 font-medium  whitespace-nowrap">
          {cropDestination?.cropDestination?.name}
        </td>
        <td className="px-4 py-3">
          {cropDestination?.cropDestination?.quantity} Kg
        </td>
        <td className="px-4 py-3">
          {cropDestination?.cropDestination?.destination}
        </td>
        <td className="px-4 py-3">
          {cropDestination?.cropDestination?.processing_type}
        </td>
        <td>
          <Link
            to={`/crop-destination-info?crop_id=${cropDestination.cropDestination.crop_id}&crop_destination_id=${cropDestination.cropDestination.id}`}
            className="flex items-center justify-center"
          >
            <CgDetailsMore />
          </Link>
        </td>
        <td className="px-4 py-3">
          <UpdateCropDestinationModal
            cropDestination={cropDestination.cropDestination}
          />
        </td>
        <td className="px-4 py-3">
          <DeleteCropDestinationModal
            cropDestination={cropDestination.cropDestination}
          />
        </td>
      </tr>
    </>
  );
};
export default CropDestination;
