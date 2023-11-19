import FormatDate from '../../../utils/FormatDate';
import DeleteCropModal from './DeleteCropModal';
import UpdateCropModal from './UpdateCropModal';

const Crop = ({ crop }) => {
  const crop_date_format = FormatDate(crop?.crop_date);
  return (
    <>
      <tr className="border-b dark:border-gray-700">
        <td scope="row" className="px-4 py-3 font-medium  whitespace-nowrap">
          {crop?.name}
        </td>
        <td className="px-4 py-3">{crop?.quantity} Kg</td>
        <td className="px-4 py-3">{crop_date_format}</td>
        <td className="px-4 py-3">{crop?.crop_time} horas</td>
        <td className="flex-1 m-0 p-3 justify-end">
          <UpdateCropModal crop={crop} />
        </td>
        <td className="flex-1 p-3">
          <DeleteCropModal crop={crop} />
        </td>
      </tr>
    </>
  );
};
export default Crop;
