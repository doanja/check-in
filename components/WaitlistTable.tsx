import { useMemory } from 'contexts/MemoryContext';
import WaitlistTableRow from './WaitlistTableRow';

const WaitlistTable = () => {
  const { checkedInUsers } = useMemory();

  return (
    <div className='flex flex-col mt-3 px-5 w-full'>
      <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-200'>
              {/* title */}
              <thead className='bg-gray-50'>
                <tr>
                  <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Name
                  </th>
                  <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Check In Time
                  </th>
                </tr>
              </thead>

              {/* body */}
              <tbody className='bg-white divide-y divide-gray-200'>
                {checkedInUsers.map((user: CheckedInUser, i) => (
                  <WaitlistTableRow user={user} key={i} />
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
