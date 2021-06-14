import { User } from '@prisma/client';

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className='border rounded-lg p-4 flex'>
      <div className='ml-4'>
        <p className='text-xl text-gray-700'>{user.name}</p>
        <p className='text-gray-500'>Email: {user.email}</p>
        <p className='text-gray-500'>Phone: {user.phone}</p>
        <p className='text-gray-500'>Birthday: {user.birthday}</p>
        <p className='text-gray-500'>Points: {user.points}</p>
        <p className='text-gray-500'>Checkins: {user.checkins}</p>
        <p className='text-gray-500'>Role: {user.role}</p>
      </div>
    </div>
  );
};

export default UserCard;
