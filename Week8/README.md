# React CRUD Application - Quản lý người dùng

Ứng dụng quản lý người dùng với đầy đủ chức năng CRUD (Create, Read, Update, Delete) được xây dựng bằng React.

## Cấu trúc dự án

```
React-CRUD/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── SearchForm.js
│   │   ├── AddUser.js
│   │   └── ResultTable.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Các tính năng

**CREATE (Thêm)**: Thêm người dùng mới với form modal
**READ (Đọc)**: Hiển thị danh sách người dùng từ API
**UPDATE (Sửa)**: Chỉnh sửa thông tin người dùng
**DELETE (Xóa)**: Xóa người dùng khỏi danh sách
**SEARCH (Tìm kiếm)**: Tìm kiếm theo name hoặc username

## Cài đặt

### Bước 1: Cài đặt Node.js

### Bước 2: Cài đặt dependencies
```bash
npm install
```

### Bước 3: Chạy ứng dụng
```bash
npm start
```

Ứng dụng sẽ chạy tại: http://localhost:3000

## Build cho production
```bash
npm run build
```

## Công nghệ sử dụng

- **React 18**: Thư viện JavaScript để xây dựng giao diện
- **React Hooks**: useState, useEffect
- **JSONPlaceholder API**: API giả lập để lấy dữ liệu người dùng


