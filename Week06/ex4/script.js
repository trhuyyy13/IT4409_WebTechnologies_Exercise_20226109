// ===== LẤY CÁC PHẦN TỬ =====
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const addBtn = document.getElementById('addProductBtn');
const addForm = document.getElementById('addProductForm');
const cancelBtn = document.getElementById('cancelBtn');
const errorMsg = document.getElementById('errorMsg');
const productList = document.getElementById('product-list');

// ===== TÌM KIẾM SẢN PHẨM =====
function searchProducts() {
  const keyword = searchInput.value.toLowerCase().trim();
  const products = document.querySelectorAll('.product-item');

  products.forEach(item => {
    const name = item.querySelector('.product-name').textContent.toLowerCase();
    item.style.display = name.includes(keyword) ? "" : "none";
  });
}

searchBtn.addEventListener('click', searchProducts);
searchInput.addEventListener('keyup', searchProducts);

// ===== ẨN/HIỆN FORM THÊM SẢN PHẨM =====
addBtn.addEventListener('click', () => {
  addForm.classList.toggle('hidden');
  errorMsg.textContent = "";
});

// ===== NÚT HỦY =====
cancelBtn.addEventListener('click', () => {
  addForm.reset();
  errorMsg.textContent = "";
  addForm.classList.add('hidden');
});

// ===== SUBMIT FORM THÊM SẢN PHẨM =====
addForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('newName').value.trim();
  const desc = document.getElementById('newDesc').value.trim();
  const price = document.getElementById('newPrice').value.trim();

  // ===== VALIDATE =====
  if (!name) {
    errorMsg.textContent = "⚠️ Tên sản phẩm không được để trống.";
    return;
  }

  const numPrice = Number(price);
  if (isNaN(numPrice) || numPrice <= 0) {
    errorMsg.textContent = "⚠️ Giá phải là số hợp lệ và lớn hơn 0.";
    return;
  }

  if (desc.length < 5) {
    errorMsg.textContent = "⚠️ Mô tả quá ngắn.";
    return;
  }

  // Xóa lỗi nếu hợp lệ
  errorMsg.textContent = "";

  // ===== TẠO SẢN PHẨM MỚI =====
  const newItem = document.createElement('article');
  newItem.className = 'product-item';
  newItem.innerHTML = `
    <h3 class="product-name">${name}</h3>
    <img src="https://picsum.photos/200/280?random=${Math.floor(Math.random() * 1000)}" alt="${name}">
    <p>${desc}</p>
    <p class="price"><strong>Giá:</strong> ${numPrice.toLocaleString()}đ</p>
  `;

  // ===== THÊM LÊN ĐẦU DANH SÁCH =====
  const firstProduct = productList.querySelector('.product-item');
  if (firstProduct) {
    productList.insertBefore(newItem, firstProduct);
  } else {
    productList.appendChild(newItem);
  }

  // Reset và ẩn form
  addForm.reset();
  addForm.classList.add('hidden');
});
