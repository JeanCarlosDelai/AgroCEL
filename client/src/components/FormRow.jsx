import { Label, TextInput, Flowbite } from 'flowbite-react';

const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <Flowbite>
      <div>
        <div className="mb-2 block">
          <Label htmlFor={name}>{labelText || name} </Label>
        </div>

        <TextInput
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
        />
      </div>
    </Flowbite>
  );
};
export default FormRow;
