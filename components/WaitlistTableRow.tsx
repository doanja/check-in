interface WaitlistTableRowProps {
  user: CheckedInUser;
  allowEdits: boolean;
  toggleIsCheckedIn: ToggleIsCheckedIn;
}

const WaitlistTableRow = ({ user, allowEdits, toggleIsCheckedIn }: WaitlistTableRowProps) => {
  return (
    <tr onClick={() => toggleIsCheckedIn(user.id)}>
      <td className={`border px-8 py-4`}>
        <p className={`${user.isCheckedIn ? 'line-through' : ''}`}>{user.name}</p>
      </td>
      <td className={`border px-8 py-4 ${user.isCheckedIn && 'line-through'}`}>{user.checkInTime}</td>
    </tr>
  );
};

export default WaitlistTableRow;
