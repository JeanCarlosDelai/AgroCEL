import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  deleteArea,
  setEditArea,
  getAllAreas,
} from '../../../features/area/areaSlice';
import { Table, Flowbite } from 'flowbite-react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { CgDetailsMore } from 'react-icons/cg';

const Area = ({
  id,
  name,
  property_id,
  species,
  variety,
  driving_system,
  rookstock_type,
  cultivated_area,
  geographic_coordinates,
  implementation_date,
  number_rows,
  distance_between_rows,
  distance_between_plants,
  number_plants,
}) => {
  const dispatch = useDispatch();

  const handleDeleteArea = ({ id, property_id }) => {
    dispatch(deleteArea({ id, property_id }));
    dispatch(getAllAreas(property_id));
  };

  return (
    <Flowbite>
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {name}
        </Table.Cell>
        <Table.Cell>{species}</Table.Cell>
        <Table.Cell>{variety}</Table.Cell>
        <Table.Cell>{cultivated_area}</Table.Cell>
        <Table.Cell className="p-4">
          <Link to={`/area-info?property_id=${property_id}&area_id=${id}`}>
            <CgDetailsMore />
          </Link>
        </Table.Cell>
        <Table.Cell>
          <Link
            to="/create-area"
            onClick={() =>
              dispatch(
                setEditArea({
                  areaId: id,
                  property_id,
                  name,
                  species,
                  variety,
                  driving_system,
                  rookstock_type,
                  cultivated_area,
                  geographic_coordinates,
                  implementation_date,
                  number_rows,
                  distance_between_rows,
                  distance_between_plants,
                  number_plants,
                }),
              )
            }
          >
            <AiOutlineEdit />
          </Link>
        </Table.Cell>
        <Table.Cell>
          <button
            type="button"
            onClick={() => handleDeleteArea({ id, property_id })}
            style={{ color: 'red' }}
          >
            <BsTrash />
          </button>
        </Table.Cell>
      </Table.Row>
    </Flowbite>
  );
};
export default Area;
