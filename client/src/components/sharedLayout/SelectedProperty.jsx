import { BsArrowRight } from 'react-icons/bs';
import { getPropertyNameFromLocalStorage } from '../../utils/localStorage';
import { FaMapMarkedAlt } from 'react-icons/fa';

import usePropertyStore from '../../store/propertys/usePropertyStore';

const SelectedProperty = () => {
  const selectedProperty = usePropertyStore((state) => state.selectedProperty);
  return (
    <div className="flex items-center ml-5 mb-14 mt-4">
      <div>
        <FaMapMarkedAlt size={50} />
      </div>
      <div className="ml-4 mt-2">
        <BsArrowRight size={50} />
      </div>
      <h1 className="ml-3 mt-2">
        {selectedProperty && (selectedProperty.name ?? '')}
      </h1>
    </div>
  );
};

export default SelectedProperty;
