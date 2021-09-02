const menu = () => {
  return (
    <div className='flex flex-col h-full'>
      <div className='max-w-2xl w-full h-full my-12 rounded-md shadow-2xl mx-auto overflow-hidden z-10 border border-gray-400 md:my-24'>
        <div className='pb-10 md:p-4 md:pb-16 h-full w-full'>
          <p className='text-3xl font-semibold leading-snug mb-3 text-center capitalize'>Menu</p>
          <iframe src={process.env.NEXT_PUBLIC_MENU_LINK} className='h-full w-full' />
        </div>
      </div>
    </div>
  );
};

export default menu;
