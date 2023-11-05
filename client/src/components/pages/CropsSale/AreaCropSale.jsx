import FormatDate from '../../../utils/FormatDate';

const AreaCropSale = ({ crop }) => {
  const crop_date_format = FormatDate(crop?.crop_date);
  return (
    <>
      <tr className="border-b dark:border-gray-700">
        <td scope="row" className="px-4 py-3 font-medium  whitespace-nowrap">
          {crop?.name}
        </td>
        <td className="px-4 py-3">{crop?.quantity}</td>
        <td className="px-4 py-3">{crop_date_format}</td>
        <td className="flex-1 m-0 p-3 justify-end"></td>
      </tr>
    </>
  );
};
export default AreaCropSale;
