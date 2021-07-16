interface PageContainerProps {
  headerLeft?: string;
  headerRight?: string;
  subHeader?: string;
  children: React.ReactNode;
}

const PageContainer = ({ headerLeft, headerRight, subHeader, children }: PageContainerProps) => {
  return (
    <div className='page-wrap'>
      <div className='mx-auto z-10 text-center'>
        <h1 className='text-gray-500 text-5xl font-semibold'>
          {headerLeft}
          <span className='text-gray-700'>{headerRight}</span>
        </h1>
        <p className='text-grey-700 mt-2'>{subHeader}</p>
      </div>
      <div className='max-w-xl w-full mt-24 mb-24 rounded-md shadow-2xl bg-white mx-auto overflow-hidden z-10'>
        <div className='px-16 py-10'>{children}</div>
      </div>
    </div>
  );
};

export default PageContainer;
