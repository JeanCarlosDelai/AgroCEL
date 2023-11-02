import React, { useState } from 'react';

function AccordionItem({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        type="button"
        onClick={toggleAccordion}
        className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-900 border-b border-gray-900 "
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <svg
          className={`w-3 h-3 rotate-${isOpen ? '0' : '180'} shrink-0`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path stroke="currentColor" d={`M9 5 5 1 1 5`} />
        </svg>
      </button>
      {isOpen && <div className="py-5 border-b border-gray-900">{content}</div>}
    </div>
  );
}

export default AccordionItem;
