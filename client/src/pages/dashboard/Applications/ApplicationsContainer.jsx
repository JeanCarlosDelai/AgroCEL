import CreateApplicationModal from '../../../components/applications/CreateApplicationModal';
import Application from '../../../components/applications/Application';
import { useFetchApplications } from '../../../queries/applications/applications';

const ApplicationsContainer = ({ area }) => {
  const area_id = area.data.id;
  const applications = useFetchApplications(area_id);

  if (applications?.data?.length <= 0) {
    return (
      <div className="flex">
        <section className="p-4">
          <div className="mx-auto max-w-screen-xl ">
            <div className="bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden border border-gray-300">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center md:space-x-3 flex-shrink-0">
                  <CreateApplicationModal area_id={area_id} />
                  <h6>Nenhuma aplicação encontrada</h6>
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
                <CreateApplicationModal area_id={area_id} />
                <h6>
                  {applications?.data?.length} Aplicação
                  {applications?.data?.length > 1 && 's'} encontrada
                  {applications?.data?.length > 1 && 's'}{' '}
                </h6>
              </div>
            </div>
            <div className="mx-auto">
              <table className="w-full text-sm text-left text-gray-500  border border-black300">
                <thead className="text-xs text-gray-300 uppercase bg-black border border-gray-300">
                  <tr>
                    <th scope="col" className="px-4 py-4">
                      Produto Usado
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Tipo de aplicação
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Quantidade
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Dia da aplicação
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Tempo de aplicação
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Descrição
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 text-gray-300">
                  {applications?.data?.map((application) => {
                    return (
                      <Application
                        key={application.id}
                        application={application}
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
export default ApplicationsContainer;
