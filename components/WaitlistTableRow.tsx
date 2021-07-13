interface WaitlistTableRowProps {
  user: CheckedInUser;
}

const WaitlistTableRow = ({ user }: WaitlistTableRowProps) => {
  return (
    <tr>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='text-sm font-medium text-gray-900'>{user.name}</div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-900'>{user.checkInTime}</div>
      </td>
    </tr>
  );
};

export default WaitlistTableRow;
