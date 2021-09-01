import { TiTimes } from 'react-icons/ti';

interface WaitlistTableRowProps {
  user: CheckedInUser;
  allowEdits: boolean;
  toggleIsCheckedIn: ToggleIsCheckedIn;
  removeUserFromWaitlist: RemoveUserFromWaitlist;
}

const WaitlistTableRow = ({ user, allowEdits, toggleIsCheckedIn, removeUserFromWaitlist }: WaitlistTableRowProps) => {
  return (
    <tr className='bg-gray-800' onClick={() => allowEdits && toggleIsCheckedIn(user.id)}>
      <td className={`${user.isCheckedIn && 'bg-gray-300'}`}>
        <p className={`${user.isCheckedIn && 'line-through'}`}>{user.name}</p>
      </td>
      <td className={`${user.isCheckedIn && 'bg-gray-300'}`}>
        <p className={`${user.isCheckedIn && 'line-through'}`}> {user.checkInTime}</p>
      </td>

      <td className={`${user.isCheckedIn && 'bg-gray-300'}`} onClick={() => allowEdits && removeUserFromWaitlist(user.id)}>
        <div className='cursor-pointer hover:text-red-600 w-8'>{allowEdits && <TiTimes size='2rem' />}</div>
      </td>
    </tr>
  );
};

export default WaitlistTableRow;
