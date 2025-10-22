// ===== LẤY CÁC PHẦN TỬ =====
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const addBtn = document.getElementById('addProductBtn');
const addForm = document.getElementById('addProductForm');
const productList = document.getElementById('product-list');

// ===== TÌM KIẾM SẢN PHẨM =====
function searchProducts() {
  const keyword = searchInput.value.toLowerCase().trim();
  const products = document.querySelectorAll('.product-item');

  products.forEach(item => {
    const name = item.querySelector('.product-name').textContent.toLowerCase();
    if (name.includes(keyword)) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
}

searchBtn.addEventListener('click', searchProducts);
searchInput.addEventListener('keyup', searchProducts);

// ===== ẨN/HIỆN FORM THÊM SẢN PHẨM =====
addBtn.addEventListener('click', () => {
  addForm.classList.toggle('hidden');
});

// ===== SUBMIT FORM THÊM SẢN PHẨM =====
addForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('newName').value.trim();
  const desc = document.getElementById('newDesc').value.trim();
  const price = document.getElementById('newPrice').value.trim();

  if (!name || !price) {
    alert("Vui lòng nhập đầy đủ tên và giá sản phẩm!");
    return;
  }

  // Tạo sản phẩm mới
  const newItem = document.createElement('article');
  newItem.className = 'product-item';
  newItem.innerHTML = `
    <h3 class="product-name">${name}</h3>
    <img src="https://picsum.photos/200/280?random=${Math.floor(Math.random() * 100)}" alt="${name}">
    <p>${desc}</p>
    <p class="price"><strong>Giá:</strong> ${price}đ</p>
  `;

  productList.appendChild(newItem);
  addForm.reset();
  addForm.classList.add('hidden');
});
