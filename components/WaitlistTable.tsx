import { useMemory } from '@/contexts';
import { WaitlistTableRow } from '@/components';

interface WaitlistTableProps {
  allowEdits: boolean;
  removeUserFromWaitlist: RemoveUserFromWaitlist;
}

const WaitlistTable = ({ allowEdits, removeUserFromWaitlist }: WaitlistTableProps) => {
  const { checkedInUsers, setCheckedInUsers } = useMemory();

  const toggleIsCheckedIn = (userId: string) => {
    const a = checkedInUsers.map((user: CheckedInUser) => {
      if (user.id === userId) {
        user.isCheckedIn = !user.isCheckedIn;
      }
      return user;
    });

    setCheckedInUsers(a);
  };

  return (
    <div className='flex flex-col w-full mt-3'>
      <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
          <table className='table border-separate text-sm w-full'>
            <thead className='bg-gray-800 text-gray-100'>
              <tr>
                <th className='p-3 text-left'>Name</th>
                <th className='p-3 text-left'>Check-In Time</th>
                <th className='p-3 text-left'></th>
              </tr>
            </thead>
            <tbody>
              {checkedInUsers.map((user: CheckedInUser, index: number) => (
                <WaitlistTableRow
                  user={user}
                  key={index}
                  allowEdits={allowEdits}
                  toggleIsCheckedIn={toggleIsCheckedIn}
                  removeUserFromWaitlist={removeUserFromWaitlist}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WaitlistTable;
