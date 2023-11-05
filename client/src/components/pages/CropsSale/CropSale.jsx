import { CgDetailsMore } from 'react-icons/cg';
import FormatDate from '../../../utils/FormatDate';
import { Link } from 'react-router-dom';
import UpdateCropSaleModal from './UpdateCropSaleModal';
import DeleteCropSaleModal from './DeleteCropSaleModal';
const CropSale = (cropSale) => {
  const discharge_date_format = FormatDate(cropSale?.cropsSale?.discharge_date);
  return (
    <>
      <tr className="border-b dark:border-gray-700">
        <td scope="row" className="px-4 py-3 font-medium  whitespace-nowrap">
          {cropSale?.cropsSale?.name}
        </td>
        <td className="px-4 py-3">{cropSale?.cropsSale?.quantity} Kg</td>
        <td className="px-4 py-3">{cropSale?.cropsSale?.purchasing_entity}</td>
        <td className="px-4 py-3">{discharge_date_format}</td>
        <td className="flex-1 m-0 p-3 justify-center">
          <Link
            to={`/crop-sale-info?crop_id=${cropSale.cropsSale.crop_id}&crop_sale_id=${cropSale.cropsSale.id}`}
          >
            <CgDetailsMore />
          </Link>
        </td>
        <td className="px-4 py-3">
          <UpdateCropSaleModal cropSale={cropSale.cropsSale} />
        </td>
        <td className="px-4 py-3">
          <DeleteCropSaleModal cropSale={cropSale.cropsSale} />
        </td>
      </tr>
    </>
  );
};
export default CropSale;
