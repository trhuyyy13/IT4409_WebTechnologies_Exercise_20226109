# Student Information System - Web Application

## 📋 Mô tả dự án

Ứng dụng quản lý thông tin sinh viên được xây dựng bằng MERN Stack (MongoDB, Express.js, React, Node.js). Dự án cung cấp đầy đủ các chức năng CRUD và tìm kiếm, sắp xếp dữ liệu.

## 🚀 Công nghệ sử dụng

### Frontend
- React 18 với Vite
- Axios để giao tiếp API
- CSS3 với responsive design

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- CORS middleware

## 📦 Cài đặt

### Yêu cầu hệ thống
- Node.js >= 18.0.0
- MongoDB >= 6.0
- npm hoặc yarn

### Các bước cài đặt

1. **Clone repository**
```bash
cd Week12
```

2. **Cài đặt Backend**
```bash
cd backend
npm install
```

3. **Cài đặt Frontend**
```bash
cd students-management
npm install
```

4. **Khởi động MongoDB**
```bash
docker-compose up -d
```

5. **Chạy Backend**
```bash
cd backend
node index.js
```

6. **Chạy Frontend**
```bash
cd students-management
npm run dev
```

## 🎯 Tính năng

- ✅ Hiển thị danh sách sinh viên
- ✅ Thêm sinh viên mới
- ✅ Cập nhật thông tin sinh viên
- ✅ Xóa sinh viên
- ✅ Tìm kiếm theo tên
- ✅ Sắp xếp theo tên (A-Z, Z-A)
- ✅ Giao diện responsive

## 🔌 API Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | /api/students | Lấy tất cả sinh viên |
| POST | /api/students | Thêm sinh viên mới |
| PUT | /api/students/:id | Cập nhật sinh viên |
| DELETE | /api/students/:id | Xóa sinh viên |

## 👨‍💻 Tác giả

MSSV: 20226109

## 📝 License

MIT License
