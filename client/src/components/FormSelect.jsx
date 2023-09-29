const FormSelect = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  options,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      {type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className="form-select"
        >
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
          className="form-input"
        />
      )}
    </div>
  );
};

export default FormSelect;
