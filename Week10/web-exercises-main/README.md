# Ứng Dụng Quản Lý Người Dùng

Ứng dụng web hiện đại được xây dựng bằng React để quản lý danh sách người dùng với đầy đủ chức năng CRUD.

## Tính Năng Chính

- ✨ **Hiển thị danh sách**: Bảng người dùng với giao diện responsive
- ➕ **Thêm mới**: Form tạo người dùng với validation đầy đủ
- ✏️ **Chỉnh sửa**: Cập nhật thông tin qua modal dialog
- 🗑️ **Xóa**: Xóa người dùng với xác nhận
- 🔍 **Tìm kiếm**: Lọc theo tên hoặc email real-time
- 📄 **Phân trang**: Điều hướng qua các trang dữ liệu
- 🔄 **Sắp xếp**: Click header để sort theo cột

## Công Nghệ Sử Dụng

- React 18.x
- Vite (Build tool)
- Tailwind CSS (Styling)
- Axios (HTTP client)
- JSONPlaceholder API (Mock backend)

## Cài Đặt và Chạy

```bash
# Di chuyển vào thư mục project
cd react-app

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build
```

Ứng dụng sẽ chạy tại: http://localhost:5173

## Cấu Trúc Thư Mục

```
src/
├── components/          # UI components
│   ├── FormDialog.jsx   # Form thêm/sửa user
│   ├── NotificationBar.jsx  # Thông báo
│   └── PageControl.jsx  # Phân trang
├── hooks/              # Custom React hooks
│   ├── useDataManager.js      # Logic CRUD
│   └── useFilterAndPages.js   # Tìm kiếm & phân trang
├── services/           # API service layer
│   └── apiClient.js
├── config/             # Constants và cấu hình
│   └── settings.js
└── App.jsx             # Component chính
```

## API Endpoints

API Base: `https://jsonplaceholder.typicode.com`

| Method | Endpoint      | Mô tả              |
|--------|---------------|-------------------|
| GET    | /users        | Lấy danh sách user |
| POST   | /users        | Tạo user mới      |
| PUT    | /users/:id    | Cập nhật user     |
| DELETE | /users/:id    | Xóa user          |

## Tác Giả


