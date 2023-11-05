import { BsCurrencyDollar } from 'react-icons/bs';
import { useFetchCropsSale } from '../../../queries/cropsSale/cropsSale';
import FormatDate from '../../../utils/FormatDate';
import CreateCropSaleModal from './CreateCropSaleModal';
import { CgDetailsMore } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { FaWineBottle } from 'react-icons/fa';

const AreaCropSale = ({ crop }) => {
  const crop_date_format = FormatDate(crop?.crop_date);
  // console.log(crop.id);
  const cropsSale = useFetchCropsSale(crop.area_id);
  // console.log(cropsSale.data.crop_id);

  const matchingCropsSales = cropsSale.data
    ? cropsSale.data.filter(
        (cropsSaleData) => cropsSaleData.crop_id === crop.id,
      )
    : '';

  console.log(matchingCropsSales);
  return (
    <>
      <tr className="border-b dark:border-gray-700">
        <td scope="row" className="px-4 py-3 font-medium  whitespace-nowrap">
          {crop?.name}
        </td>
        <td className="px-4 py-3">{crop?.quantity}</td>
        <td className="px-4 py-3">{crop_date_format}</td>
        <td>
          {matchingCropsSales.length == 0 ? (
            <>
              <CreateCropSaleModal crop={crop} />
            </>
          ) : (
            <>
              <BsCurrencyDollar
                className="ml-7"
                size={15}
                style={{ color: 'red' }}
              />
            </>
          )}
        </td>
        <td>
          {matchingCropsSales.length == 0 ? (
            <>
              <CreateCropSaleModal crop={crop} />
            </>
          ) : (
            <>
              <FaWineBottle
                className="ml-10"
                size={15}
                style={{ color: 'red' }}
              />
            </>
          )}
        </td>
        <td className="px-4 py-3">
          {matchingCropsSales.length > 0 && (
            <div>
              <p>{matchingCropsSales[0].name}</p>
            </div>
          )}
        </td>
        <td>
          <Link
            to={`/crop-sale-info?crop_id=${matchingCropsSales[0]?.crop_id}&crop_sale_id=${matchingCropsSales[0]?.id}`}
            className="flex items-center justify-center"
          >
            <CgDetailsMore />
          </Link>
        </td>
      </tr>
    </>
  );
};
export default AreaCropSale;
