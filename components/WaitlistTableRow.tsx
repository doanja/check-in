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
      <td className={`cursor-pointer hover:text-gray-100 ${user.isCheckedIn && 'bg-gray-300'}`} onClick={() => removeUserFromWaitlist(user.id)}>
        <TiTimes size='2rem' />
      </td>
    </tr>
  );
};

export default WaitlistTableRow;
