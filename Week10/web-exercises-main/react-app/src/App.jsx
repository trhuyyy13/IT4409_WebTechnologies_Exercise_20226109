import { useState } from 'react';
import './App.css';
import FormDialog from './components/FormDialog';
import NotificationBar from './components/NotificationBar';
import PageControl from './components/PageControl';
import useDataManager from './hooks/useDataManager';
import useFilterAndPages from './hooks/useFilterAndPages';

function App() {
  const {
    userList,
    isLoading,
    errorMsg,
    alertMsg,
    displayAlert,
    dialogState,
    createNewUser,
    editExistingUser,
    deleteUserById,
    showCreateDialog,
    showEditDialog,
    hideDialog,
    closeAlert,
  } = useDataManager();

  const {
    filterText,
    changeFilter,
    pageNumber,
    changePage,
    itemsPerPage,
    filteredItems,
    pageItems,
    totalPageCount,
  } = useFilterAndPages(userList);

  const [orderBy, setOrderBy] = useState('name');
  const [orderDir, setOrderDir] = useState('asc');

  const handleSortChange = (column) => {
    if (orderBy === column) {
      setOrderDir(orderDir === 'asc' ? 'desc' : 'asc');
    } else {
      setOrderBy(column);
      setOrderDir('asc');
    }
  };

  const orderedItems = [...pageItems].sort((itemA, itemB) => {
    const valA = itemA[orderBy]?.toLowerCase() || '';
    const valB = itemB[orderBy]?.toLowerCase() || '';
    
    if (orderDir === 'asc') {
      return valA > valB ? 1 : -1;
    } else {
      return valA < valB ? 1 : -1;
    }
  });

  const handleDeleteConfirm = (user) => {
    if (window.confirm(`Xác nhận xóa người dùng "${user.name}"?`)) {
      deleteUserById(user.id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 mb-10 border-l-8 border-teal-500">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">
            <div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Hệ Thống Quản Lý
              </h1>
              <p className="text-gray-600 text-xl font-medium">
                Quản lý thông tin người dùng một cách hiệu quả và chuyên nghiệp
              </p>
            </div>
            <button
              onClick={showCreateDialog}
              className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-10 py-5 rounded-2xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center gap-4 text-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Tạo Mới
            </button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-10">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Nhập tên hoặc email để tìm kiếm..."
                value={filterText}
                onChange={(e) => {
                  changeFilter(e.target.value);
                  changePage(1);
                }}
                className="w-full pl-14 pr-6 py-4 border-3 border-gray-200 rounded-2xl focus:ring-4 focus:ring-teal-400 focus:border-transparent transition-all text-lg"
              />
              <svg
                className="absolute left-5 top-4 h-7 w-7 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex items-center gap-4 bg-gradient-to-r from-teal-100 via-cyan-100 to-blue-100 px-8 py-4 rounded-2xl border-2 border-teal-300">
              <svg className="h-6 w-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-gray-700 font-bold text-lg">
                Tìm thấy: <span className="font-black text-teal-700">{filteredItems.length}</span> / {userList.length}
              </span>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-100">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center py-24">
              <div className="relative">
                <div className="animate-spin rounded-full h-20 w-20 border-t-5 border-b-5 border-teal-600"></div>
                <div className="absolute top-0 left-0 animate-ping rounded-full h-20 w-20 border-5 border-cyan-400 opacity-30"></div>
              </div>
              <p className="mt-6 text-gray-600 font-bold text-xl">Đang tải dữ liệu...</p>
            </div>
          ) : errorMsg ? (
            <div className="p-10 text-center">
              <div className="bg-gradient-to-r from-red-50 via-pink-50 to-orange-50 border-3 border-red-300 text-red-800 p-8 rounded-2xl">
                <svg className="mx-auto h-20 w-20 mb-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="font-bold text-2xl">{errorMsg}</p>
              </div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-teal-200 via-cyan-200 to-blue-200 border-b-3 border-teal-400">
                    <tr>
                      <th className="px-8 py-6 text-left text-sm font-black text-teal-800 uppercase tracking-wide">
                        ID
                      </th>
                      <th
                        className="px-8 py-6 text-left text-sm font-black text-teal-800 uppercase tracking-wide cursor-pointer hover:bg-teal-300 transition-all"
                        onClick={() => handleSortChange('name')}
                      >
                        <div className="flex items-center gap-3">
                          Tên người dùng
                          {orderBy === 'name' && (
                            <span className="text-teal-700 text-lg">{orderDir === 'asc' ? '▲' : '▼'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-8 py-6 text-left text-sm font-black text-teal-800 uppercase tracking-wide cursor-pointer hover:bg-teal-300 transition-all"
                        onClick={() => handleSortChange('email')}
                      >
                        <div className="flex items-center gap-3">
                          Địa chỉ Email
                          {orderBy === 'email' && (
                            <span className="text-teal-700 text-lg">{orderDir === 'asc' ? '▲' : '▼'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-8 py-6 text-left text-sm font-black text-teal-800 uppercase tracking-wide cursor-pointer hover:bg-teal-300 transition-all"
                        onClick={() => handleSortChange('phone')}
                      >
                        <div className="flex items-center gap-3">
                          Điện thoại
                          {orderBy === 'phone' && (
                            <span className="text-teal-700 text-lg">{orderDir === 'asc' ? '▲' : '▼'}</span>
                          )}
                        </div>
                      </th>
                      <th className="px-8 py-6 text-right text-sm font-black text-teal-800 uppercase tracking-wide">
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y-2 divide-gray-100">
                    {orderedItems.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-8 py-20 text-center">
                          <svg className="mx-auto h-20 w-20 text-gray-300 mb-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                          </svg>
                          <p className="text-gray-500 text-2xl font-bold">Không có dữ liệu</p>
                        </td>
                      </tr>
                    ) : (
                      orderedItems.map((user) => (
                        <tr
                          key={user.id}
                          className="hover:bg-gradient-to-r hover:from-teal-50 hover:via-cyan-50 hover:to-blue-50 transition-all duration-300"
                        >
                          <td className="px-8 py-5 whitespace-nowrap">
                            <span className="px-4 py-2 text-base font-black text-teal-800 bg-teal-100 rounded-xl border-2 border-teal-300">
                              #{user.id}
                            </span>
                          </td>
                          <td className="px-8 py-5 whitespace-nowrap text-base font-bold text-gray-900">
                            {user.name}
                          </td>
                          <td className="px-8 py-5 whitespace-nowrap text-base text-gray-700">
                            {user.email}
                          </td>
                          <td className="px-8 py-5 whitespace-nowrap text-base text-gray-700">
                            {user.phone}
                          </td>
                          <td className="px-8 py-5 whitespace-nowrap text-right text-base font-bold">
                            <button
                              onClick={() => showEditDialog(user)}
                              className="text-blue-600 hover:text-blue-900 mr-6 font-bold transition-all hover:underline"
                            >
                              Chỉnh sửa
                            </button>
                            <button
                              onClick={() => handleDeleteConfirm(user)}
                              className="text-red-600 hover:text-red-900 font-bold transition-all hover:underline"
                            >
                              Xóa bỏ
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {filteredItems.length > 0 && (
                <PageControl
                  currentPage={pageNumber}
                  totalPages={totalPageCount}
                  onPageChange={changePage}
                  totalItems={filteredItems.length}
                  itemsPerPage={itemsPerPage}
                />
              )}
            </>
          )}
        </div>

        {dialogState.isOpen && (
          <FormDialog
            user={dialogState.user}
            isEdit={dialogState.isEdit}
            onClose={hideDialog}
            onSubmit={dialogState.isEdit ? editExistingUser : createNewUser}
          />
        )}

        {displayAlert && (
          <NotificationBar message={alertMsg} onClose={closeAlert} />
        )}
      </div>
    </div>
  );
}

export default App;