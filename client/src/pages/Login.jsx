import { useForm } from 'react-hook-form';
import { login } from '../queries/users/users';
import SubmitButton from '../components/Buttons/SubmitButton';
import ClearButtonForm from '../components/Buttons/ClearButtonForm';
import { Link } from 'react-router-dom';
import { LoginSchema } from '../schemas/LoginSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import {
  addTokenToLocalStorage,
  addUserToLocalStorage,
} from '../utils/localStorage';
import Logo from '../components/logo/Logo';
import FormRow from '../components/Form/FormRow';

function Login() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(LoginSchema),
  });

  const handlerLogin = async (user) => {
    try {
      const response = await login(user);
      addUserToLocalStorage(response.data.user);
      addTokenToLocalStorage(response.data.token);
      navigate('/propertys');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form
      className="flex h-screen items-center justify-center bg-gray-800"
      onSubmit={handleSubmit(handlerLogin)}
    >
      <div className="w-full max-w-sm p-4 bg-gray-600 border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8">
        <div className="flex justify-center mr-14">
          <Logo />
        </div>
        <h5 className="text-xl font-medium text-gray-900">
          Faça login na plataforma
        </h5>
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
          <SubmitButton label="Login" />
        </div>
        <div className="text-sm font-medium text-gray-300 mt-4 ">
          Não é registrado?
          <Link
            className="text-green-500 hover:underline ml-2"
            onClick={() => reset()}
            to="/register"
          >
            Registre-se
          </Link>
        </div>
      </div>
    </form>
  );
}

export default Login;
