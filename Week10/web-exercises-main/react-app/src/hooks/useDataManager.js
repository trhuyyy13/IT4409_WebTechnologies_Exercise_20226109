import { useState, useEffect, useCallback } from 'react';
import { userApiService } from '../services/apiClient';

const useDataManager = () => {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [alertMsg, setAlertMsg] = useState('');
  const [displayAlert, setDisplayAlert] = useState(false);
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    user: null,
    isEdit: false,
  });

  const triggerAlert = useCallback((message) => {
    setAlertMsg(message);
    setDisplayAlert(true);
    setTimeout(() => setDisplayAlert(false), 3500);
  }, []);

  const fetchUserList = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMsg(null);
      const data = await userApiService.fetchAllUsers();
      setUserList(data);
    } catch (err) {
      setErrorMsg(err.message);
      triggerAlert(`⚠️ Lỗi: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [triggerAlert]);

  useEffect(() => {
    fetchUserList();
  }, [fetchUserList]);

  const createNewUser = async (userData) => {
    try {
      const newUser = await userApiService.createNewUser(userData);
      setUserList((prevList) => [...prevList, { ...newUser, id: prevList.length + 1 }]);
      triggerAlert('✅ Đã thêm người dùng mới thành công!');
      setDialogState({ isOpen: false, user: null, isEdit: false });
    } catch (err) {
      triggerAlert(`❌ Không thể thêm người dùng: ${err.message}`);
    }
  };

  const editExistingUser = async (userId, userData) => {
    try {
      await userApiService.modifyUser(userId, userData);
      setUserList((prevList) =>
        prevList.map((user) =>
          user.id === userId ? { ...user, ...userData } : user
        )
      );
      triggerAlert('✅ Cập nhật thông tin thành công!');
      setDialogState({ isOpen: false, user: null, isEdit: false });
    } catch (err) {
      triggerAlert(`❌ Cập nhật thất bại: ${err.message}`);
    }
  };

  const deleteUserById = async (userId) => {
    try {
      await userApiService.removeUser(userId);
      setUserList((prevList) => prevList.filter((user) => user.id !== userId));
      triggerAlert('✅ Đã xóa người dùng thành công!');
    } catch (err) {
      triggerAlert(`❌ Không thể xóa: ${err.message}`);
    }
  };

  const showCreateDialog = () => {
    setDialogState({ isOpen: true, user: null, isEdit: false });
  };

  const showEditDialog = (user) => {
    setDialogState({ isOpen: true, user, isEdit: true });
  };

  const hideDialog = () => {
    setDialogState({ isOpen: false, user: null, isEdit: false });
  };

  const closeAlert = () => {
    setDisplayAlert(false);
  };

  return {
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
  };
};

export default useDataManager;
