import { useMemory } from 'contexts/MemoryContext';
import WaitlistTableRow from './WaitlistTableRow';

const WaitlistTable = () => {
  const { checkedInUsers } = useMemory();

  return (
    <div className='flex flex-col max-w-md mx-auto'>
      <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
            <table className='min-w-full shadow-lg bg-white'>
              <tr>
                <th className='bg-gray-100 border text-left px-8 py-4'>Name</th>
                <th className='bg-gray-100 border text-left px-8 py-4'>Check-In Time</th>
              </tr>
              {checkedInUsers.map((user: CheckedInUser, i) => (
                <WaitlistTableRow user={user} key={i} />
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitlistTable;
