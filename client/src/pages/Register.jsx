import { useForm } from 'react-hook-form';
import { Logo, FormRow } from '../components';
import { createUser } from '../queries/users/users';
import SubmitButton from '../components/Buttons/SubmitButton';
import ClearButtonForm from '../components/Buttons/ClearButtonForm';
import { Link } from 'react-router-dom';
import { CreateUserSchema } from '../schemas/CreateUserSchema';
import { yupResolver } from '@hookform/resolvers/yup';

function Register() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(CreateUserSchema),
  });

  const handlerCreateUser = async (user) => {
    await createUser(user);
    reset();
  };

  return (
    <form
      className="flex h-screen items-center justify-center bg-gray-800"
      onSubmit={handleSubmit(handlerCreateUser)}
    >
      <div className="w-full max-w-sm p-4 bg-gray-600 border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8">
        <div className="flex justify-center mr-14">
          <Logo />
        </div>
        <h5 className="text-xl font-medium text-gray-900">
          Se registre na plataforma
        </h5>
        <br />
        <FormRow
          type="text"
          name="name"
          labelText="Nome"
          placeholder="Nome"
          control={control}
          hasError={JSON.stringify(errors.name?.message)}
        />
        <br />
        <FormRow
          type="email"
          name="email"
          labelText="Email"
          placeholder="agrocel@.com.br"
          control={control}
          hasError={JSON.stringify(errors.email?.message)}
        />
        <br />
        <FormRow
          type="password"
          name="password"
          labelText="Senha"
          placeholder="*********"
          control={control}
          hasError={JSON.stringify(errors.password?.message)}
        />
        <br />
        <div className="relative inline-flex items-center justify-center">
          <ClearButtonForm onClick={() => reset()} />
          <SubmitButton label="Registrar" />
        </div>
        <div className="text-sm font-medium text-gray-300 mt-4 ">
          Já registrado?
          <Link
            className="text-green-500 hover:underline ml-2"
            onClick={() => reset()}
            to="/login"
          >
            Faça Login
          </Link>
        </div>
      </div>
    </form>
  );
}
export default Register;
