import React from 'react';
import AccordionItem from './AccordionItem';
import { motion, AnimatePresence } from 'framer-motion';

function Accordion({ items }) {
  return (
    <div>
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5, type: 'tween' }}
        >
          <AccordionItem
            key={index}
            title={item.title}
            content={item.content}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default Accordion;
