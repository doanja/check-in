interface WaitlistTableRowProps {
  user: CheckedInUser;
  allowEdits: boolean;
  toggleIsCheckedIn: ToggleIsCheckedIn;
}

const WaitlistTableRow = ({ user, allowEdits, toggleIsCheckedIn }: WaitlistTableRowProps) => {
  return (
    <tr className='bg-gray-800' onClick={() => allowEdits && toggleIsCheckedIn(user.id)}>
      <td className={`${user.isCheckedIn && 'bg-gray-600'} cursor-pointer`}>
        <p className={`${user.isCheckedIn && 'line-through'}`}>{user.name}</p>
      </td>
      <td className={`${user.isCheckedIn && 'bg-gray-600'} cursor-pointer`}>
        <p className={`${user.isCheckedIn && 'line-through'}`}> {user.checkInTime}</p>
      </td>
    </tr>
  );
};

export default WaitlistTableRow;
