# Student Management Frontend

## 🎨 Giới thiệu

Giao diện người dùng cho hệ thống quản lý sinh viên, được phát triển với React và Vite để đảm bảo hiệu suất tối ưu.

## ⚙️ Cấu hình môi trường

Tạo file `.env` trong thư mục gốc:

```env
VITE_API_URL=http://localhost:5000
```

## 🛠️ Scripts

```bash
# Khởi động development server
npm run dev

# Build production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📱 Tính năng giao diện

- Modal forms cho thêm/sửa sinh viên
- Real-time search với debouncing
- Sorting động theo tên
- Responsive design cho mobile/tablet
- Loading states và error handling
- Smooth animations và transitions

## 🎨 Thiết kế

- Modern gradient backgrounds
- Card-based layout
- Accessible forms với validation
- Mobile-first approach
- Dark/Light theme ready

## 🔧 Công nghệ

- **React 18**: UI library với hooks
- **Vite**: Build tool thế hệ mới
- **Axios**: HTTP client
- **CSS3**: Styling với animations
- **ESLint**: Code quality

## 📂 Cấu trúc

```
src/
├── App.jsx          # Main component
├── App.css          # Styles
├── main.jsx         # Entry point
└── index.css        # Global styles
```

## 🚀 Performance

- Code splitting tự động
- Lazy loading components
- Optimized re-renders
- Fast refresh trong development

## 📝 Ghi chú

Dự án này sử dụng Vite để có trải nghiệm phát triển nhanh hơn so với Create React App truyền thống.
