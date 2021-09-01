interface PageContainerProps {
  title: string;
  children: React.ReactNode;
}

const PageContainer = ({ title, children }: PageContainerProps) => {
  return (
    <div className='flex flex-col justify-center h-full'>
      <div className='max-w-xl w-full my-12 rounded-md shadow-2xl mx-auto overflow-hidden z-10 border border-gray-400 md:my-24'>
        <div className='px-4 py-2 md:px-16 md:py-10'>
          <p className='text-3xl font-semibold leading-snug mb-3 text-center capitalize'>{title}</p>
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageContainer;
