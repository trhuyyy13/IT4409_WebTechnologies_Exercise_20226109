const PageControl = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) => {
  const generatePageNumbers = () => {
    const pages = [];
    const maxDisplayed = 5;

    if (totalPages <= maxDisplayed) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const firstItem = (currentPage - 1) * itemsPerPage + 1;
  const lastItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-t-3 border-gray-200">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="text-base text-gray-700 font-semibold">
          Hiển thị <span className="font-black text-teal-700">{firstItem}</span> đến{' '}
          <span className="font-black text-teal-700">{lastItem}</span> trong tổng số{' '}
          <span className="font-black text-teal-700">{totalItems}</span> bản ghi
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-5 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            « Trước
          </button>

          {generatePageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              disabled={page === '...'}
              className={`px-5 py-3 rounded-xl border-2 font-bold transition-all ${
                page === currentPage
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white border-teal-500 shadow-lg'
                  : page === '...'
                  ? 'border-transparent text-gray-400 cursor-default'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-5 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Sau »
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageControl;
