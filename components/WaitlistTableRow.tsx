import { TiTimes } from 'react-icons/ti';

interface WaitlistTableRowProps {
  user: CheckedInUser;
  allowEdits: boolean;
  toggleIsCheckedIn: ToggleIsCheckedIn;
}

const WaitlistTableRow = ({ user, allowEdits, toggleIsCheckedIn }: WaitlistTableRowProps) => {
  return (
    // <tr className='relative' onClick={() => allowEdits && toggleIsCheckedIn(user.id)}>
    //   <td className={`border px-8 py-4 ${user.isCheckedIn && 'bg-gray-300'}`}>
    //     <p className={`${user.isCheckedIn && 'line-through'}`}>{user.name}</p>
    //   </td>
    //   <td className={`border px-8 py-4 ${user.isCheckedIn && 'bg-gray-300'}`}>
    //     <p className={`${user.isCheckedIn && 'line-through'}`}> {user.checkInTime}</p>
    //   </td>
    // </tr>

    <tr className='bg-gray-800' onClick={() => allowEdits && toggleIsCheckedIn(user.id)}>
      <td className={`p-3 ${user.isCheckedIn && 'bg-gray-300'}`}>
        <p className={`${user.isCheckedIn && 'line-through'}`}>{user.name}</p>
      </td>
      <td className={`p-3 ${user.isCheckedIn && 'bg-gray-300'}`}>
        <p className={`${user.isCheckedIn && 'line-through'}`}> {user.checkInTime}</p>
      </td>
      <td className='p-3'>
        <div className='text-gray-400 hover:text-gray-100'>
          <TiTimes size='2rem' />
        </div>
      </td>
    </tr>
  );
};

export default WaitlistTableRow;
