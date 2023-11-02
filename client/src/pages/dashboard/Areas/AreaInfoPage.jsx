import { useLocation } from 'react-router-dom';
import { useFetchOneArea } from '../../../queries/areas/areas';
import { Accordion } from '../../../components';
import AccordionItemsArea from '../../../components/areas/areasInfoPage/AccordionItemsArea';

function AreaInfoPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const property_id = searchParams.get('property_id');
  const area_id = searchParams.get('area_id');

  const area = useFetchOneArea(property_id, area_id);

  const accordionItems = AccordionItemsArea({ area });

  return (
    <div className="App">
      <h1>{area?.data?.name}</h1>
      <Accordion items={accordionItems} />
    </div>
  );
}

export default AreaInfoPage;
