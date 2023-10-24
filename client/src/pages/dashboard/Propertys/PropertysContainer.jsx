import { useEffect, useRef, useState } from 'react';
import Property from './Property';
import { useSelector, useDispatch } from 'react-redux';
import { Loading } from '../../../components';
import { getAllPropertys } from '../../../features/property/propertySlice';
import { Table, Button, Flowbite, Modal } from 'flowbite-react';
import CreateProperty from './CreateProperty';

const PropertysContainer = () => {
  const { propertys, isLoading } = useSelector((store) => store.property);
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState();
  const emailInputRef = useRef(null);
  const props = { openModal, setOpenModal, emailInputRef };

  useEffect(() => {
    dispatch(getAllPropertys());
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const propertyArray = propertys.data || [];

  if (propertyArray.length === 0) {
    return (
      <Flowbite>
        <Table>
          <Table.Cell>
            <Button
              gradientDuoTone="greenToBlue"
              outline
              onClick={() => props.setOpenModal('initial-focus')}
            >
              + Adicionar nova propriedade
            </Button>
            <Modal
              show={props.openModal === 'initial-focus'}
              size="md"
              popup
              onClose={() => props.setOpenModal(undefined)}
              initialFocus={props.emailInputRef}
            >
              <Modal.Header />
              <Modal.Body>
                <CreateProperty />
              </Modal.Body>
            </Modal>
          </Table.Cell>
          <Table.Cell>
            <h2>Sem Propriedades para mostrar...</h2>
          </Table.Cell>
        </Table>
      </Flowbite>
    );
  }

  return (
    <Flowbite>
      <Table>
        <Table.Cell>
          <Button
            gradientDuoTone="greenToBlue"
            outline
            onClick={() => props.setOpenModal('initial-focus')}
          >
            + Adicionar nova propriedade
          </Button>
          <Modal
            show={props.openModal === 'initial-focus'}
            size="md"
            popup
            onClose={() => props.setOpenModal(undefined)}
            initialFocus={props.emailInputRef}
          >
            <Modal.Header />
            <Modal.Body>
              <CreateProperty />
            </Modal.Body>
          </Modal>
        </Table.Cell>
        <Table.Cell>
          <h6>
            {propertyArray.length} Propriedade{propertyArray.length > 1 && 's'}{' '}
            encontrada{propertyArray.length > 1 && 's'}{' '}
          </h6>
        </Table.Cell>
      </Table>
      <br />
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell></Table.HeadCell>
          <Table.HeadCell>Nome da Propriedade</Table.HeadCell>
          <Table.HeadCell>Cidade</Table.HeadCell>
          <Table.HeadCell>Área total</Table.HeadCell>
          <Table.HeadCell>Área Cultivada</Table.HeadCell>
          <Table.HeadCell>Editar</Table.HeadCell>
          <Table.HeadCell>Excluir</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {propertyArray.map((property) => {
            return <Property key={property.id} {...property} />;
          })}
        </Table.Body>
      </Table>
    </Flowbite>
  );
};
export default PropertysContainer;
