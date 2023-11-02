import DeleteCropModal from './DeleteCropModal';
import UpdateCropModal from './UpdateCropModal';

const Crop = ({ crop }) => {
  return (
    <>
      <tr className="border-b dark:border-gray-700">
        <td scope="row" className="px-4 py-3 font-medium  whitespace-nowrap">
          {crop?.name}
        </td>
        <td className="px-4 py-3">{crop?.quantity}</td>
        <td className="px-4 py-3">{crop?.crop_date}</td>
        <td className="px-4 py-3">{crop?.crop_time}</td>
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
