import { BsCurrencyDollar } from 'react-icons/bs';
import { useFetchCropsSale } from '../../../queries/cropsSale/cropsSale';
import FormatDate from '../../../utils/FormatDate';
import CreateCropSaleModal from './CreateCropSaleModal';
import { CgDetailsMore } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { FaWineBottle } from 'react-icons/fa';
import CreateCropDestinationModal from '../CropsDestination/CreateCropDestinationModal';
import { useFetchCropsDestination } from '../../../queries/cropsDestination/cropsDestination';

const AreaCropSale = ({ crop }) => {
  const crop_date_format = FormatDate(crop?.crop_date);

  const cropsSale = useFetchCropsSale(crop.area_id);
  const cropsDestination = useFetchCropsDestination(crop.area_id);

  const matchingCropsSales = cropsSale.data
    ? cropsSale.data.filter(
        (cropsSaleData) => cropsSaleData.crop_id === crop.id,
      )
    : '';

  const matchingCropsDestination = cropsDestination.data
    ? cropsDestination.data.filter(
        (cropsDestinationData) => cropsDestinationData.crop_id === crop.id,
      )
    : '';

  return (
    <>
      <tr className="border-b dark:border-gray-700">
        <td scope="row" className="px-4 py-3 font-medium  whitespace-nowrap">
          {crop?.name}
        </td>
        <td className="px-4 py-3">{crop?.quantity} Kg</td>
        <td className="px-4 py-3">{crop_date_format}</td>
        <td>
          {!matchingCropsDestination.length > 0 ? (
            matchingCropsSales.length == 0 &&
            matchingCropsDestination.length == 0 ? (
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
            )
          ) : (
            <hr />
          )}
        </td>

        <td className="px-4 py-3">
          {matchingCropsSales.length > 0 ? (
            <div>
              <p>{matchingCropsSales[0].name}</p>
            </div>
          ) : (
            <hr />
          )}
        </td>
        <td>
          {matchingCropsSales.length > 0 ? (
            <Link
              to={`/crop-sale-info?crop_id=${matchingCropsSales[0]?.crop_id}&crop_sale_id=${matchingCropsSales[0]?.id}`}
              className="flex items-center justify-center"
            >
              <CgDetailsMore />
            </Link>
          ) : (
            <hr />
          )}
        </td>

        {/* Production */}
        <td>
          {!matchingCropsSales.length > 0 ? (
            matchingCropsSales.length == 0 &&
            matchingCropsDestination.length == 0 ? (
              <>
                <CreateCropDestinationModal crop={crop} />
              </>
            ) : (
              <>
                <FaWineBottle
                  className="ml-9"
                  size={15}
                  style={{ color: 'red' }}
                />
              </>
            )
          ) : (
            <hr />
          )}
        </td>

        <td className="px-4 py-3">
          {matchingCropsDestination.length > 0 ? (
            <div>
              <p>{matchingCropsDestination[0].name}</p>
            </div>
          ) : (
            <hr />
          )}
        </td>
        <td>
          {matchingCropsDestination.length > 0 ? (
            <Link
              to={`/crop-destination-info?crop_id=${matchingCropsDestination[0]?.crop_id}&crop_destination_id=${matchingCropsDestination[0]?.id}`}
              className="flex items-center justify-center"
            >
              <CgDetailsMore />
            </Link>
          ) : (
            <hr className="mr-2" />
          )}
        </td>
      </tr>
    </>
  );
};
export default AreaCropSale;
