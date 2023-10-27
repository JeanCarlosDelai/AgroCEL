import { useDispatch } from 'react-redux';
import {
  deleteCrop,
  setEditCrop,
  getAllCrops,
} from '../../../features/crop/cropSlice';
import { Flowbite, Modal, Table } from 'flowbite-react';
import { BsTrash } from 'react-icons/bs';
import { useRef, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import CreateCrop from './CreateCrop';
const Crop = ({ area_id, id, name, quantity, crop_date, crop_time }) => {
  const dispatch = useDispatch();

  const handleDeleteCrop = ({ id, area_id }) => {
    dispatch(deleteCrop({ id, area_id }));
    dispatch(getAllCrops(area_id));
  };

  const [openModal, setOpenModal] = useState();
  const emailInputRef = useRef(null);
  const props = { openModal, setOpenModal, emailInputRef };

  return (
    <Flowbite>
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell>{quantity} Kg</Table.Cell>
        <Table.Cell>{crop_date}</Table.Cell>
        <Table.Cell>{crop_time} horas</Table.Cell>
        <Table.Cell>
          <button
            style={{ color: 'black' }}
            onClick={() => {
              dispatch(
                setEditCrop({
                  area_id,
                  id,
                  name,
                  quantity,
                  crop_date,
                  crop_time,
                }),
              );
              props.setOpenModal('initial-focus');
            }}
          >
            <AiOutlineEdit />
          </button>
          <Modal
            show={props.openModal === 'initial-focus'}
            size="md"
            popup
            onClose={() => props.setOpenModal(undefined)}
            initialFocus={props.emailInputRef}
          >
            <Modal.Header />
            <Modal.Body>
              <CreateCrop />
            </Modal.Body>
          </Modal>
        </Table.Cell>
        <Table.Cell>
          <button
            type="button"
            onClick={() => handleDeleteCrop({ id, area_id })}
            style={{ color: 'red' }}
          >
            <BsTrash />
          </button>
        </Table.Cell>
      </Table.Row>
    </Flowbite>
    // <PropertyWrapper>
    //   <div className="info">
    //     <h2>{name}</h2>
    //     <h2>Quantidade colhida: {quantity} Kg</h2>
    //     <h2>Data da colheita: {crop_date} Kg</h2>
    //     <h2>Tempo de colheita: {crop_time} horas</h2>
    //   </div>
    //   <div className="info"></div>

    //   <footer>
    //     <div className="actions">
    //       <Link
    //         to="/create-crop"
    //         className="btn edit-btn"
    //         onClick={() =>
    //           dispatch(
    //             setEditCrop({
    //               area_id,
    //               id,
    //               name,
    //               quantity,
    //               crop_date,
    //               crop_time,
    //             }),
    //           )
    //         }
    //       >
    //         Editar
    //       </Link>
    //       <button
    //         type="button"
    //         className="btn delete-btn"
    //         onClick={() => handleDeleteCrop({ id, area_id })}
    //       >
    //         Excluir
    //       </button>
    //     </div>
    //   </footer>
    // </PropertyWrapper>
  );
};
export default Crop;
