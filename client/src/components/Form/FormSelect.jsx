const FormSelect = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  options,
  control,
  hasError,
}) => {
  const inputClass = `bg-gray-500 border ${
    hasError ? 'border-red-500' : 'border-gray-300'
  } text-gray-900 text-sm rounded-lg focus:ring-primary-600 ${
    hasError ? 'focus:border-red-500' : 'focus:border-primary-600'
  } block w-full p-2 placeholder-gray-100 dark:focus:ring-primary-500 dark:focus:border-primary-500`;
  return (
    <div className="mb-2 block">
      <label
        className={`block mb-2 text-sm font-medium ${
          hasError ? 'text-red-700 dark:text-red-500' : 'text-white'
        }`}
        htmlFor={name}
      >
        {' '}
        {labelText || name}{' '}
      </label>

      {type === 'select' ? (
        <select id={name} name={name} value={value} onChange={handleChange}>
          <option value={value}>{value}</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default FormSelect;
