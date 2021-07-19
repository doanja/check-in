interface WaitlistTableRowProps {
  user: CheckedInUser;
}

const WaitlistTableRow = ({ user }: WaitlistTableRowProps) => {
  return (
    <tr>
      <td className='border px-8 py-4'>{user.name}</td>
      <td className='border px-8 py-4'>{user.checkInTime}</td>
    </tr>
  );
};

export default WaitlistTableRow;
