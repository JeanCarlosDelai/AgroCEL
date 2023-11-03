import CreateOtherActivitieModal from '../../../components/otherActivities/CreateOtherActivitieModal';
import OtherActivitie from '../../../components/otherActivities/OtherActivitie';
import { useFetchOtherActivities } from '../../../queries/otherActivities/otherActivities';

const OtherActivitiesContainer = ({ area }) => {
  const area_id = area.data.id;
  const otherActivities = useFetchOtherActivities(area_id);
  // console.log(otherActivities.data);
  if (otherActivities?.data?.length <= 0) {
    return (
      <div className="flex">
        <section className="p-4">
          <div className="mx-auto max-w-screen-xl ">
            <div className="bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden border border-gray-300">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center md:space-x-3 flex-shrink-0">
                  <CreateOtherActivitieModal area_id={area_id} />
                  <h6>Nenhum manejo encontrada</h6>
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
      <section className="p-4">
        <div className="mx-auto max-w-screen-xl ">
          <div className="bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden border border-gray-300">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center md:space-x-3 flex-shrink-0">
                <CreateOtherActivitieModal area_id={area_id} />
                <h6>
                  {otherActivities?.data?.length} Manejo
                  {otherActivities?.data?.length > 1 && 's'} encontrada
                  {otherActivities?.data?.length > 1 && 's'}{' '}
                </h6>
              </div>
            </div>
            <div className="mx-auto">
              <table className="w-full text-sm text-left text-gray-500  border border-black300">
                <thead className="text-xs text-gray-300 uppercase bg-black border border-gray-300">
                  <tr>
                    <th scope="col" className="px-4 py-4">
                      Nome do manejo
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Categoria
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Data da colheita
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Tempo de colheita
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Descrição
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
                  {otherActivities?.data?.map((otherActivities) => {
                    return (
                      <OtherActivitie
                        key={otherActivities.id}
                        otherActivitie={otherActivities}
                      />
                    );
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
export default OtherActivitiesContainer;
