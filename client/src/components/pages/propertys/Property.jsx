import { Radio } from 'flowbite-react';
import UpdatePropertyModal from './UpdatePropertyModal';
import usePropertyStore from '../../../store/propertys/usePropertyStore';
import DeletePropertyModal from './DeletePropertyModal';
const Property = ({ property }) => {
  const selectProperty = usePropertyStore((state) => state.selectProperty);

  return (
    <tr className="border-b dark:border-gray-700">
      <td className="px-4 py-3">
        <Radio
          onClick={() =>
            selectProperty({
              name: property.name,
              property_id: property.id,
            })
          }
        />
      </td>
      <td scope="row" className="px-4 py-3 font-medium  whitespace-nowrap">
        {property.name}
      </td>

      <td className="px-4 py-3">{property.city}</td>
      <td className="px-4 py-3">{property.state}</td>
      <td className="px-4 py-3">{property.cultivated_area}</td>
      <td className="px-4 py-3">{property.total_area}</td>

      <td className="flex-1 m-0 p-3 justify-end">
        <UpdatePropertyModal value={property} />
      </td>
      <td className="flex-1 p-3">
        <DeletePropertyModal value={property} />
      </td>
    </tr>
  );
};
export default Property;
