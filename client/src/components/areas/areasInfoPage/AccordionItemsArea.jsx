import OtherActivitiesContainer from '../../../pages/dashboard/OtherActivities/OtherActivitiesContainer';
import ApplicationsContainer from '../../../pages/dashboard/Applications/ApplicationsContainer';
import CropsContainer from '../../../pages/dashboard/Crops/CropsContainer';
import TableAreainfo from './TableAreaInfo';

function AccordionItemsArea({ area }) {
  return [
    {
      title: 'Informações da área ',
      content: <TableAreainfo area={area} />,
    },
    {
      title: 'Colheitas',
      content: <CropsContainer area={area} />,
    },
    {
      title: 'Aplicações',
      content: <ApplicationsContainer area={area} />,
    },
    {
      title: 'Manejo',
      content: <OtherActivitiesContainer area={area} />,
    },
  ];
}

export default AccordionItemsArea;
