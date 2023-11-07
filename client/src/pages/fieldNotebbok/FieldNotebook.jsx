import Accordion from '../../components/Accordion/Accordion';
import AccordionItemsField from '../../components/pages/FieldNotebook/AccordionItemsField';

const FildsNotebookContainer = () => {
  const accordionItemsField = AccordionItemsField();
  return (
    <div>
      <Accordion items={accordionItemsField} />
    </div>
  );
};
export default FildsNotebookContainer;
