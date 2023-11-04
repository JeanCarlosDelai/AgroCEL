import { useFetchProfile } from '../../../queries/users/profile';
import ProfileCard from '../../../components/Profile/ProfileCard';
import React from 'react';
import { getUserFromLocalStorage } from '../../../utils/localStorage';

const Profile = () => {
  const user = getUserFromLocalStorage();

  return (
    <div className="max-w-sm p-6 bg-gray-800 border border-gray-200 rounded-lg shadow ">
      <div className="mb-4">
        <h1 className="text-gray-300 mb-4">Perfil</h1>
        <ProfileCard user={user} />
      </div>
    </div>
  );
};

export default Profile;
