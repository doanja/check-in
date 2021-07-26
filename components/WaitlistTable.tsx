import { useMemory } from 'contexts/MemoryContext';
import { WaitlistTableRow } from '@/components';

interface WaitlistTableProps {
  allowEdits: boolean;
}

const WaitlistTable = ({ allowEdits }: WaitlistTableProps) => {
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
    <div className='flex flex-col max-w-md mx-auto mt-3'>
      <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
            <table className='min-w-full shadow-lg bg-white'>
              <tbody>
                <tr>
                  <th className='bg-gray-100 border text-left px-8 py-4'>Name</th>
                  <th className='bg-gray-100 border text-left px-8 py-4'>Check-In Time</th>
                </tr>
                {checkedInUsers.map((user: CheckedInUser) => (
                  <WaitlistTableRow user={user} key={user.id} allowEdits={allowEdits} toggleIsCheckedIn={toggleIsCheckedIn} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitlistTable;
