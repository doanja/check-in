import Link from 'next/link';

interface UserTableProps {
  user: User;
  showDetails?: boolean;
}

const UserTableRow = ({ user, showDetails = true }: UserTableProps) => {
  return (
    <tbody className='bg-white divide-y divide-gray-200 hover:bg-gray-100'>
      <tr>
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='text-sm font-medium text-gray-900'>{user.name}</div>
        </td>

        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='text-sm font-medium text-gray-900'>{user.email ? user.email : '-'}</div>
        </td>

        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='text-sm font-medium text-gray-900'>{user.phone}</div>
        </td>

        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='text-sm font-medium text-gray-900'>{user.birthday ? user.phone : '-'}</div>
        </td>

        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='text-sm font-medium text-gray-900'>{user.checkInCount}</div>
        </td>

        {showDetails && (
          <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
            <Link href={`/dashboard/${user.id}`}>
              <a className='text-indigo-600 cursor-pointer hover:text-indigo-900'>Details</a>
            </Link>
          </td>
        )}
      </tr>
    </tbody>
  );
};

export default UserTableRow;
