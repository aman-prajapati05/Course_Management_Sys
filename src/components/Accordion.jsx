import React, { useState } from 'react';

const Accordion = ({ contents }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="accordion-collapse" data-accordion="collapse">
      {Object.keys(contents).map((key, index) => (
        <AccordionItem
          key={index}
          index={index}
          openIndex={openIndex}
          handleToggle={handleToggle}
          title={key}
          content={contents[key]}
        />
      ))}
    </div>
  );
};

const AccordionItem = ({ index, openIndex, handleToggle, title, content }) => {
  const isOpen = index === openIndex;

  return (
    <div>
      <h2 id={`accordion-collapse-heading-${index}`}>
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => handleToggle(index)}
          aria-expanded={isOpen}
          aria-controls={`accordion-collapse-body-${index}`}
        >
          <span>{title}</span>
          <svg
            className={`w-3 h-3 ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id={`accordion-collapse-body-${index}`}
        className={`${isOpen ? 'block' : 'hidden'}`}
        aria-labelledby={`accordion-collapse-heading-${index}`}
      >
        <div className="p-5 border border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Accordion;

