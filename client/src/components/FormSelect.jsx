import { Label, TextInput, Flowbite, Select } from 'flowbite-react';

const FormSelect = ({
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
            <option value={value}>{value}</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
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

export default FormSelect;
