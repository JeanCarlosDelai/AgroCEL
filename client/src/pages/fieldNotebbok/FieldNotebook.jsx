import CreateCropModal from '../../components/pages/crops/CreateCropModal';
import { TableRow } from '../../components/areas/areasInfoPage/TableRow';
import CreateApplicationModal from '../../components/pages/applications/CreateApplicationModal';
import CreateOtherActivitieModal from '../../components/pages/otherActivities/CreateOtherActivitieModal';

const FildsNotebookContainer = () => {
  return (
    <>
      <div className="flex">
        <section className="p-4">
          <div className="mx-auto max-w-screen-xl ">
            <div className="bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden border border-gray-300">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center md:space-x-3 flex-shrink-0">
                  <CreateCropModal />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="flex">
        <section className="p-4">
          <div className="mx-auto max-w-screen-xl ">
            <div className="bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden border border-gray-300">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center md:space-x-3 flex-shrink-0">
                  <CreateApplicationModal />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="flex">
        <section className="p-4">
          <div className="mx-auto max-w-screen-xl ">
            <div className="bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden border border-gray-300">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center md:space-x-3 flex-shrink-0">
                  <CreateOtherActivitieModal />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default FildsNotebookContainer;
