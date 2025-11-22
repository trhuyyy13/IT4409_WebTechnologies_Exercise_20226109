import { useState, useEffect } from 'react';

const FormDialog = ({ user, isEdit, onClose, onSubmit }) => {
  const [formInput, setFormInput] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormInput({
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user]);

  const checkValidation = () => {
    const errors = {};

    if (!formInput.name.trim()) {
      errors.name = 'Vui lòng nhập họ tên';
    } else if (formInput.name.trim().length < 3) {
      errors.name = 'Họ tên phải có ít nhất 3 ký tự';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formInput.email.trim()) {
      errors.email = 'Vui lòng nhập email';
    } else if (!emailPattern.test(formInput.email)) {
      errors.email = 'Định dạng email không hợp lệ';
    }

    const phonePattern = /^[\d\s\-\(\)\.]+$/;
    if (!formInput.phone.trim()) {
      errors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!phonePattern.test(formInput.phone)) {
      errors.phone = 'Định dạng số điện thoại không hợp lệ';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (!checkValidation()) {
      return;
    }

    if (isEdit) {
      onSubmit(user.id, formInput);
    } else {
      onSubmit(formInput);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-6 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden transform transition-all">
        <div className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 p-8">
          <h2 className="text-3xl font-black text-white flex items-center gap-3">
            {isEdit ? (
              <>
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Chỉnh Sửa Thông Tin
              </>
            ) : (
              <>
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                Thêm Người Dùng Mới
              </>
            )}
          </h2>
        </div>

        <form onSubmit={handleFormSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-base font-bold text-gray-800 mb-3">
              Họ và Tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formInput.name}
              onChange={handleInputChange}
              className={`w-full px-5 py-3 border-2 rounded-xl focus:ring-3 focus:ring-teal-400 focus:border-transparent transition-all text-base ${
                validationErrors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Nhập họ và tên đầy đủ"
            />
            {validationErrors.name && (
              <p className="mt-2 text-sm text-red-600 font-semibold flex items-center gap-2">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {validationErrors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-base font-bold text-gray-800 mb-3">
              Địa Chỉ Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formInput.email}
              onChange={handleInputChange}
              className={`w-full px-5 py-3 border-2 rounded-xl focus:ring-3 focus:ring-teal-400 focus:border-transparent transition-all text-base ${
                validationErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="example@domain.com"
            />
            {validationErrors.email && (
              <p className="mt-2 text-sm text-red-600 font-semibold flex items-center gap-2">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {validationErrors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-base font-bold text-gray-800 mb-3">
              Số Điện Thoại <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formInput.phone}
              onChange={handleInputChange}
              className={`w-full px-5 py-3 border-2 rounded-xl focus:ring-3 focus:ring-teal-400 focus:border-transparent transition-all text-base ${
                validationErrors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="0123-456-789"
            />
            {validationErrors.phone && (
              <p className="mt-2 text-sm text-red-600 font-semibold flex items-center gap-2">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {validationErrors.phone}
              </p>
            )}
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 border-2 border-gray-400 rounded-xl text-gray-700 hover:bg-gray-100 font-bold transition-all text-lg"
            >
              Hủy Bỏ
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl hover:from-teal-600 hover:to-cyan-600 font-bold transition-all shadow-lg hover:shadow-xl text-lg"
            >
              {isEdit ? 'Cập Nhật' : 'Tạo Mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormDialog;
