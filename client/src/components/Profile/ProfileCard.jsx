import { useForm } from 'react-hook-form';
import FormRow from '../FormRow';
import SubmitButton from '../Buttons/SubmitButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { UpdateProfileSchema } from '../../schemas/UpdateProfileSchema';
import { updateProfile } from '../../queries/users/profile';
import { addUserToLocalStorage } from '../../utils/localStorage';
import { useState } from 'react';

const ProfileCard = (user) => {
  const [userData, setUserData] = useState(user);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.user.name,
      email: user.user.email,
    },
    resolver: yupResolver(UpdateProfileSchema),
  });

  const handlerUpdateProfile = async (profile) => {
    // console.log(profile);
    await updateProfile(profile);

    const updatedUser = {
      name: profile.name,
      email: profile.email,
      avatar: user.user.avatar,
      avatar_url: user.user.avatar_url,
      id: user.user.id,
      updated_at: user.user.updated_at,
    };

    addUserToLocalStorage(updatedUser);
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit(handlerUpdateProfile)}>
        <div className="grid gap-4 mb-4 sm:grid-cols-2">
          <FormRow
            type="text"
            name="name"
            labelText="Name"
            placeholder="Nome"
            control={control}
            hasError={JSON.stringify(errors.name?.message)}
          />
          <FormRow
            type="email"
            name="email"
            labelText="E-mail"
            placeholder="teste@texte.com.br"
            control={control}
            hasError={JSON.stringify(errors.email?.message)}
          />
        </div>
        <div className="relative inline-flex items-center justify-center">
          <SubmitButton label="Enviar" />
        </div>
      </form>
    </div>
  );
};

export default ProfileCard;
