import { Radio } from 'flowbite-react';
import UpdatePropertyModal from './UpdatePropertyModal';
import usePropertyStore from '../../store/propertys/usePropertyStore';
import DeletePropertyModal from './DeletePropertyModal';

const Property = ({ property }) => {
  const selectProperty = usePropertyStore((state) => state.selectProperty);

  return (
    <>
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
    </>
    // <Flowbite>
    //   <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
    //     <Table.Cell className="p-4">
    //       <Radio onClick={handleSelectProperty} />
    //     </Table.Cell>
    //     <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
    //       {name}
    //     </Table.Cell>
    //     <Table.Cell>{city}</Table.Cell>
    //     <Table.Cell>{total_area}</Table.Cell>
    //     <Table.Cell>{cultivated_area}</Table.Cell>
    //     <Table.Cell>
    //       <button
    //         style={{ color: 'black' }}
    //         onClick={() => {
    //           dispatch(
    //             setEditProperty({
    //               property_id: id,
    //               name,
    //               city,
    //               state,
    //               total_area,
    //               cultivated_area,
    //             }),
    //           );
    //           props.setOpenModal('initial-focus');
    //         }}
    //       >
    //         <AiOutlineEdit />
    //       </button>
    //       <Modal
    //         show={props.openModal === 'initial-focus'}
    //         size="md"
    //         popup
    //         onClose={() => props.setOpenModal(undefined)}
    //         initialFocus={props.emailInputRef}
    //       >
    //         <Modal.Header />
    //         <Modal.Body>
    //           <CreateProperty />
    //         </Modal.Body>
    //       </Modal>
    //     </Table.Cell>
    //     <Table.Cell>
    //       <button
    //         type="button"
    //         onClick={() => dispatch(deleteProperty(id))}
    //         style={{ color: 'red' }}
    //       >
    //         <BsTrash />
    //       </button>
    //     </Table.Cell>
    //   </Table.Row>
    // </Flowbite>
  );
};
export default Property;
