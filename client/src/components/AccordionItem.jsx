import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function AccordionItem({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        type="button"
        onClick={toggleAccordion}
        className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-900 border-b border-gray-900"
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <motion.svg
          className={`w-3 h-3 rotate-${isOpen ? '0' : '180'} shrink-0`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <motion.path stroke="currentColor" d={`M9 5 5 1 1 5`} />
        </motion.svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 2 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AccordionItem;
