import { useEffect } from 'react';

const NotificationBar = ({ message, onClose }) => {
  useEffect(() => {
    const autoClose = setTimeout(onClose, 3500);
    return () => clearTimeout(autoClose);
  }, [onClose]);

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-slide-in-right">
      <div className="bg-white rounded-2xl shadow-2xl border-l-4 border-teal-500 p-5 flex items-center gap-4 min-w-[350px] max-w-md">
        <div className="flex-shrink-0">
          <div className="bg-teal-100 rounded-full p-2">
            <svg
              className="h-7 w-7 text-teal-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <p className="text-gray-800 font-bold flex-1 text-base">{message}</p>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-gray-400 hover:text-gray-700 transition-colors p-1"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NotificationBar;
