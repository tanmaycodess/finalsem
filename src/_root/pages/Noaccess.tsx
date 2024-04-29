const Noaccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <svg
        className="w-24 h-24 text-gray-500 mb-8 md:ml-10"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 1 21 12.79z"></path>
        <path d="M21 12.79l-4.24-4.24M21 12.79l-1.79 1.79M21 12.79l-4.24 4.24M12 8v.01M12 16v.01"></path>
      </svg>
      <h1 className="text-4xl font-bold text-gray-100 mb-4 md:ml-20">Access Denied</h1>
      <p className="text-lg text-gray-400 text-center md:ml-40">
        It seems you currently can't access this page.
        Please contact the Club President for assistance.
      </p>
    </div>
  );
}

export default Noaccess;
