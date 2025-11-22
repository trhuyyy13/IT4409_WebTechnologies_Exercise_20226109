import { useState } from 'react';
import './App.css';
import UserModal from './components/UserModal';
import Toast from './components/Toast';
import Pagination from './components/Pagination';
import useUserManagement from './hooks/useUserManagement';
import useSearchAndPagination from './hooks/useSearchAndPagination';

function App() {
  const {
    users,
    loading,
    error,
    notification,
    showNotification,
    modalConfig,
    addNewUser,
    modifyUser,
    removeUser,
    openAddModal,
    openModifyModal,
    closeModal,
    dismissNotification,
  } = useUserManagement();

  const {
    searchTerm,
    updateSearchTerm,
    activePage,
    updateActivePage,
    recordsPerPage,
    filteredData,
    paginatedData,
    pageCount,
  } = useSearchAndPagination(users);

  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('ascending');

  const toggleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending');
    } else {
      setSortColumn(column);
      setSortDirection('ascending');
    }
  };

  const sortedData = [...paginatedData].sort((a, b) => {
    const valueA = a[sortColumn]?.toLowerCase() || '';
    const valueB = b[sortColumn]?.toLowerCase() || '';
    
    if (sortDirection === 'ascending') {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });

  const confirmRemoval = (user) => {
    if (window.confirm(`Bạn có chắc muốn xóa "${user.name}" không?`)) {
      removeUser(user.id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 border-t-4 border-purple-500">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                Quản Lý Người Dùng
              </h1>
              <p className="text-gray-600 text-lg">
                Hệ thống quản lý thông tin người dùng toàn diện
              </p>
            </div>
            <button
              onClick={openAddModal}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Thêm Người Dùng
            </button>
          </div>
        </div>

        {/* Search & Stats */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Tìm kiếm theo tên hoặc email..."
                value={searchTerm}
                onChange={(e) => {
                  updateSearchTerm(e.target.value);
                  updateActivePage(1);
                }}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              <svg
                className="absolute left-4 top-3.5 h-6 w-6 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex items-center gap-3 bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-xl">
              <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-gray-700 font-medium">
                Hiển thị <span className="font-bold text-purple-600">{filteredData.length}</span> / {users.length} người dùng
              </span>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {loading ? (
            <div className="flex flex-col justify-center items-center py-20">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
                <div className="absolute top-0 left-0 animate-ping rounded-full h-16 w-16 border-4 border-pink-400 opacity-20"></div>
              </div>
              <p className="mt-4 text-gray-600 font-medium">Đang tải dữ liệu...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 text-red-700 p-6 rounded-xl">
                <svg className="mx-auto h-16 w-16 mb-4 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="font-semibold text-lg">{error}</p>
              </div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-purple-100 to-pink-100 border-b-2 border-purple-200">
                    <tr>
                      <th className="px-6 py-5 text-left text-xs font-bold text-purple-700 uppercase tracking-wider">
                        Mã số
                      </th>
                      <th
                        className="px-6 py-5 text-left text-xs font-bold text-purple-700 uppercase tracking-wider cursor-pointer hover:bg-purple-200 transition-colors"
                        onClick={() => toggleSort('name')}
                      >
                        <div className="flex items-center gap-2">
                          Họ và Tên
                          {sortColumn === 'name' && (
                            <span className="text-purple-600">{sortDirection === 'ascending' ? '▲' : '▼'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-6 py-5 text-left text-xs font-bold text-purple-700 uppercase tracking-wider cursor-pointer hover:bg-purple-200 transition-colors"
                        onClick={() => toggleSort('email')}
                      >
                        <div className="flex items-center gap-2">
                          Email
                          {sortColumn === 'email' && (
                            <span className="text-purple-600">{sortDirection === 'ascending' ? '▲' : '▼'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-6 py-5 text-left text-xs font-bold text-purple-700 uppercase tracking-wider cursor-pointer hover:bg-purple-200 transition-colors"
                        onClick={() => toggleSort('phone')}
                      >
                        <div className="flex items-center gap-2">
                          Số Điện Thoại
                          {sortColumn === 'phone' && (
                            <span className="text-purple-600">{sortDirection === 'ascending' ? '▲' : '▼'}</span>
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-5 text-right text-xs font-bold text-purple-700 uppercase tracking-wider">
                        Thao Tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {sortedData.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-16 text-center">
                          <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                          </svg>
                          <p className="text-gray-500 text-lg font-medium">Không tìm thấy người dùng nào</p>
                        </td>
                      </tr>
                    ) : (
                      sortedData.map((user) => (
                        <tr
                          key={user.id}
                          className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-3 py-1 text-sm font-bold text-purple-700 bg-purple-100 rounded-full">
                              #{user.id}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                            {user.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {user.phone}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => openModifyModal(user)}
                              className="text-blue-600 hover:text-blue-800 mr-4 font-semibold transition-colors"
                            >
                              Sửa
                            </button>
                            <button
                              onClick={() => confirmRemoval(user)}
                              className="text-red-600 hover:text-red-800 font-semibold transition-colors"
                            >
                              Xóa
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {filteredData.length > 0 && (
                <Pagination
                  currentPage={activePage}
                  totalPages={pageCount}
                  onPageChange={updateActivePage}
                  totalItems={filteredData.length}
                  itemsPerPage={recordsPerPage}
                />
              )}
            </>
          )}
        </div>
      </div>

      {modalConfig.isOpen && (
        <UserModal
          user={modalConfig.user}
          isEdit={modalConfig.isEdit}
          onClose={closeModal}
          onSubmit={modalConfig.isEdit ? modifyUser : addNewUser}
        />
      )}

      {showNotification && (
        <Toast message={notification} onClose={dismissNotification} />
      )}
    </div>
  );
}

export default App;
