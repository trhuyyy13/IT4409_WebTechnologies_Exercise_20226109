const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const addBtn = document.getElementById('addProductBtn');
const addForm = document.getElementById('addProductForm');
const cancelBtn = document.getElementById('cancelBtn');
const errorMsg = document.getElementById('errorMsg');
const productList = document.getElementById('product-list');


// ===== LẤY DỮ LIỆU TỪ HTML ban đầu nếu localStorage trống =====
function initProducts() {
  const saved = localStorage.getItem('products');
  if (saved) return JSON.parse(saved);

  const htmlProducts = Array.from(document.querySelectorAll('.product-item')).map(item => {
    return {
      name: item.querySelector('.product-name').textContent,
      desc: item.querySelector('p').textContent,
      price: item.querySelector('.price').textContent.replace(/\D/g, ''),
      image: item.querySelector('img').src
    };
  });
  localStorage.setItem('products', JSON.stringify(htmlProducts));
  return htmlProducts;
}

let products = initProducts();

// ===== HIỂN THỊ DANH SÁCH SẢN PHẨM =====
function renderProducts(list) {
  const items = document.querySelectorAll('.product-item');
  items.forEach(i => i.remove());

  list.forEach(p => {
    const item = document.createElement('article');
    item.className = 'product-item';
    item.innerHTML = `
      <h3 class="product-name">${p.name}</h3>
      <img src="${p.image}" alt="${p.name}" width="200" height="280">
      <p>${p.desc}</p>
      <p class="price"><strong>Giá:</strong> ${Number(p.price).toLocaleString()}đ</p>
    `;
    productList.appendChild(item);
  });
}
renderProducts(products);

// ===== TÌM KIẾM =====
function searchProducts() {
  const keyword = searchInput.value.toLowerCase().trim();
  document.querySelectorAll('.product-item').forEach(item => {
    const name = item.querySelector('.product-name').textContent.toLowerCase();
    item.style.display = name.includes(keyword) ? "" : "none";
  });
}
searchBtn.addEventListener('click', searchProducts);
searchInput.addEventListener('keyup', searchProducts);

// ===== ẨN/HIỆN FORM =====
addBtn.addEventListener('click', () => {
  addForm.classList.toggle('hidden');
  errorMsg.textContent = "";
});
cancelBtn.addEventListener('click', () => {
  addForm.reset();
  addForm.classList.add('hidden');
});

// ===== THÊM SẢN PHẨM MỚI =====
addForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('newName').value.trim();
  const desc = document.getElementById('newDesc').value.trim();
  const price = document.getElementById('newPrice').value.trim();
  const numPrice = Number(price);

  if (!name) return errorMsg.textContent = "⚠️ Tên sản phẩm không được để trống.";
  if (isNaN(numPrice) || numPrice <= 0) return errorMsg.textContent = "⚠️ Giá phải là số hợp lệ và lớn hơn 0.";
  if (desc.length < 5) return errorMsg.textContent = "⚠️ Mô tả quá ngắn.";
  errorMsg.textContent = "";

  const newProduct = {
    name,
    desc,
    price: numPrice,
    image: `https://picsum.photos/200/280?random=${Math.floor(Math.random() * 9999)}`
  };

  products.unshift(newProduct);
  localStorage.setItem('products', JSON.stringify(products));
  renderProducts(products);

  addForm.reset();
  addForm.classList.add('hidden');
});
