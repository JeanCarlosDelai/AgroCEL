import { Label, Flowbite, Select } from 'flowbite-react';

const FormSelectObject = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  options,
}) => {
  return (
    <Flowbite>
      <div>
        <Label htmlFor={name}>{labelText || name}</Label>
        {type === 'select' ? (
          <Select id={name} name={name} value={value} onChange={handleChange}>
            <option value="" disabled hidden>
              {value}
            </option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
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
    </Flowbite>
  );
};

export default FormSelectObject;
