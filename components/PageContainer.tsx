interface PageContainerProps {
  children: React.ReactNode;
  headerLeft: string;
  headerRight?: string;
  subHeader?: string;
}

const PageContainer = ({ children, headerLeft, headerRight, subHeader }: PageContainerProps) => {
  return (
    <div className='page-container'>
      <div className='mx-auto z-10 mt-48 text-center'>
        <h1 className='text-white text-5xl font-semibold'>
          {headerLeft}
          <span className='text-purple-300'>{headerRight}</span>
        </h1>
        <p className='text-blue-300 mt-2'>{subHeader}</p>
      </div>
      <div className='max-w-xl w-full mt-24 mb-24 rounded-md shadow-2xl bg-white mx-auto overflow-hidden z-10'>
        <div className='px-16 py-10'>{children}</div>
      </div>
    </div>
  );
};

export default PageContainer;
