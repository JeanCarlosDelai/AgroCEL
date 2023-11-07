import { useFetchCrops } from '../../../queries/crops/crops';
import { useForm } from 'react-hook-form';
import { useFetchArea } from '../../../queries/areas/areas';
import FormSelectObject from '../../../components/Form/FormSelectObject';
import { useState } from 'react';
import SubmitButton from '../../../components/Buttons/SubmitButton';
import usePropertyStore from '../../../store/propertys/usePropertyStore';
import AreaCropSale from '../../../components/pages/CropsSale/AreaCropSale';

const CropsSaleContainer = () => {
  const selectedProperty = usePropertyStore((state) => state.selectedProperty);

  const property_id = selectedProperty.property_id;

  const [selectedArea, setSelectedArea] = useState(null);

  const areas = useFetchArea(property_id);

  const crops = useFetchCrops(selectedArea);

  const areaOptions = areas.data
    ? [
        {
          value: '',
          label: 'Selecione',
        },
        ...areas.data.map((area) => ({
          value: area.id,
          label: area.name,
        })),
      ]
    : [];

  const { handleSubmit, control } = useForm({
    defaultValues: {
      area_id: 'selecione',
    },
  });

  const handleAreaChange = (selectedValue) => {
    setSelectedArea(selectedValue);
  };

  if (!crops.data) {
    return (
      <div className="flex">
        <section>
          <div className="mx-auto max-w-screen-xl ">
            <div className="bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden border border-gray-300">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center md:space-x-3 flex-shrink-0">
                  <form onSubmit={handleSubmit(handleAreaChange)}>
                    <FormSelectObject
                      type="select"
                      name="area_id"
                      labelText="Selecionar área"
                      control={control}
                      options={areaOptions}
                      onChange={(e) => handleAreaChange(e.target.value)}
                      value={selectedArea ? selectedArea.label : ''}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (crops?.data?.length <= 0) {
    return (
      <div className="flex">
        <section>
          <div className="mx-auto max-w-screen-xl ">
            <div className="bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden border border-gray-300">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center md:space-x-3 flex-shrink-0">
                  <form onSubmit={handleSubmit(handleAreaChange)}>
                    <FormSelectObject
                      type="select"
                      name="area_id"
                      labelText="Selecionar área"
                      control={control}
                      options={areaOptions}
                      onChange={(e) => handleAreaChange(e.target.value)}
                      value={selectedArea}
                    />
                  </form>
                  <h6 className="pt-4">Nenhuma colheita encontrada</h6>
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
                <form onSubmit={handleSubmit(handleAreaChange)}>
                  <FormSelectObject
                    type="select"
                    name="area_id"
                    labelText="Selecionar área"
                    control={control}
                    options={areaOptions}
                    onChange={(e) => handleAreaChange(e.target.value)}
                    value={selectedArea}
                  />
                </form>
                <h6 className="pt-4">
                  {crops?.data?.length} Colheita
                  {crops?.data?.length > 1 && 's'} encontrada
                  {crops?.data?.length > 1 && 's'}
                </h6>
              </div>
            </div>
            <div className="mx-auto">
              <table className="w-full text-sm text-left text-gray-500  border border-black300">
                <thead className="text-xs text-gray-300 uppercase bg-black border border-gray-300">
                  <tr>
                    <th scope="col" className="px-4 py-4">
                      Nome da colheita
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Quantidade colhida
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Data da colheita
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Vender
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Nome da Venda
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Detalhes da Venda
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Produzir
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Nome da Produção
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Detalhes da Produção
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 text-gray-300">
                  {crops?.data?.map((crop) => {
                    return <AreaCropSale key={crop.id} crop={crop} />;
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
export default CropsSaleContainer;
