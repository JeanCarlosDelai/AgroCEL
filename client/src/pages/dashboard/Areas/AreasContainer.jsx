import Area from '../../../components/areas/Area';
import CreateAreaModal from '../../../components/areas/CreateAreaModal';
import { useFetchArea } from '../../../queries/areas/areas';
import usePropertyStore from '../../../store/propertys/usePropertyStore';

const AreasContainer = () => {
  // Está sendo renderizado duas vezes
  const selectedProperty = usePropertyStore((state) => state.selectedProperty);

  const property_id = selectedProperty.property_id;

  const areas = useFetchArea(property_id);

  if (areas?.data?.length <= 0) {
    return (
      <div className="flex">
        <section>
          <div className="mx-auto max-w-screen-xl ">
            <div className="bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden border border-gray-300">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center md:space-x-3 flex-shrink-0">
                  <CreateAreaModal />
                  <h6>Nenhuma área encontrada</h6>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex">
      <section>
        <div className="mx-auto max-w-screen-xl ">
          <div className="bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden border border-gray-300">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center md:space-x-3 flex-shrink-0">
                <CreateAreaModal property_id={property_id} />
                <h6>
                  {areas?.data?.length} Área
                  {areas?.data?.length > 1 && 's'} encontrada
                  {areas?.data?.length > 1 && 's'}{' '}
                </h6>
              </div>
            </div>
            <div className="mx-auto">
              <table className="w-full text-sm text-left text-gray-500  border border-black300">
                <thead className="text-xs text-gray-300 uppercase bg-black border border-gray-300">
                  <tr>
                    <th scope="col" className="px-4 py-4">
                      Nome da área
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Espécie
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Variedade
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Area Cultivada
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Detalhes
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Editar
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Excluir
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 text-gray-300">
                  {areas?.data?.map((area) => {
                    return <Area key={area.id} area={area} />;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default AreasContainer;
