const searchInput = document.getElementById('searchInput');
const filterPrice = document.getElementById('filterPrice');
const sortSelect = document.getElementById('sortSelect');
const searchBtn = document.getElementById('searchBtn');
const addBtn = document.getElementById('addProductBtn');
const addForm = document.getElementById('addProductForm');
const cancelBtn = document.getElementById('cancelBtn');
const errorMsg = document.getElementById('errorMsg');
const productList = document.getElementById('product-list');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');
const popupTitle = document.getElementById('popupTitle');
const popupImage = document.getElementById('popupImage');
const popupDesc = document.getElementById('popupDesc');
const popupPrice = document.getElementById('popupPrice');
const editForm = document.getElementById('editForm');
const editName = document.getElementById('editName');
const editPrice = document.getElementById('editPrice');
const editDesc = document.getElementById('editDesc');
let currentEditIndex = null;

// ===== DỮ LIỆU GỐC =====
function getProducts() {
  const data = localStorage.getItem('products');
  if (data) return JSON.parse(data);
  const defaults = [
    {
      name: "Sống Tích Cực Mỗi Ngày",
      desc: "Những thói quen nhỏ giúp bạn duy trì tinh thần tích cực và hạnh phúc.",
      price: 115000,
      image: "https://salt.tikicdn.com/cache/w300/ts/product/be/46/15/62501554e1b89e9bdef52ac24c0adfa9.jpg"
    },
    {
      name: "Lập Trình Python Cơ Bản",
      desc: "Hướng dẫn học lập trình Python cho người mới bắt đầu.",
      price: 189000,
      image: "https://sachhoc.com/image/cache/catalog/Tinhoc/laptrinh/EF79F3EB-1AB9-4093-8181-042C5082D4C7-500x554.jpeg"
    },
    {
      name: "Nhà Giả Kim",
      desc: "Tác phẩm kinh điển của Paulo Coelho.",
      price: 98000,
      image: "https://upload.wikimedia.org/wikipedia/vi/9/9c/Nh%C3%A0_gi%E1%BA%A3_kim_%28s%C3%A1ch%29.jpg"
    },
    {
      name: "Đắc Nhân Tâm",
      desc: "Cuốn sách kinh điển về nghệ thuật ứng xử.",
      price: 120000,
      image: "https://nhasachmienphi.com/wp-content/uploads/dac-nhan-tam.jpg"
    },
    {
      name: "Tâm Lý Học Về Tiền",
      desc: "Phân tích cách con người suy nghĩ về tiền bạc.",
      price: 145000,
      image: "https://nxbhcm.com.vn/Image/Biasach/tamlyhocvetien.jpg"
    }
  ];
  localStorage.setItem('products', JSON.stringify(defaults));
  return defaults;
}

let products = getProducts();

// ===== HIỂN THỊ SẢN PHẨM =====
function renderProducts(data = products) {
  const container = productList;
  container.querySelectorAll('.product-item').forEach(e => e.remove());
  data.forEach((p, i) => {
    const item = document.createElement('article');
    item.className = 'product-item';
    item.innerHTML = `
      <h3>${p.name}</h3>
      <img src="${p.image}" alt="${p.name}">
      <p>${p.desc}</p>
      <p class="price"><strong>Giá:</strong> ${p.price.toLocaleString()}đ</p>
      <div class="btn-row">
        <button class="btn-view">👁 Chi tiết</button>
        <button class="btn-edit">✏️ Sửa</button>
        <button class="btn-delete">🗑 Xóa</button>
      </div>`;
    item.querySelector('.btn-view').addEventListener('click', () => openPopup(p));
    item.querySelector('.btn-delete').addEventListener('click', () => deleteProduct(i));
    item.querySelector('.btn-edit').addEventListener('click', () => openEdit(i));
    container.appendChild(item);
  });
}
renderProducts();

// ===== TÌM KIẾM & LỌC =====
function searchAndFilter() {
  const key = searchInput.value.toLowerCase();
  const range = filterPrice.value;
  let result = products.filter(p => p.name.toLowerCase().includes(key));

  if (range === "low") result = result.filter(p => p.price < 100000);
  else if (range === "mid") result = result.filter(p => p.price >= 100000 && p.price <= 200000);
  else if (range === "high") result = result.filter(p => p.price > 200000);

  renderProducts(result);
}
searchBtn.addEventListener('click', searchAndFilter);
searchInput.addEventListener('keyup', searchAndFilter);
filterPrice.addEventListener('change', searchAndFilter);

// ===== SẮP XẾP =====
sortSelect.addEventListener('change', () => {
  let sorted = [...products];
  if (sortSelect.value === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
  if (sortSelect.value === "price") sorted.sort((a, b) => a.price - b.price);
  renderProducts(sorted);
});

// ===== ẨN/HIỆN FORM MƯỢT MÀ =====
addBtn.addEventListener('click', () => {
  if (addForm.classList.contains('show')) {
    addForm.style.maxHeight = "0";
    addForm.style.opacity = "0";
    setTimeout(() => addForm.classList.remove('show'), 500);
  } else {
    addForm.classList.add('show');
    addForm.style.maxHeight = addForm.scrollHeight + "px";
    addForm.style.opacity = "1";
  }
});
cancelBtn.addEventListener('click', () => {
  addForm.classList.remove('show');
  addForm.style.maxHeight = "0";
});

// ===== THÊM SẢN PHẨM =====
addForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('newName').value.trim();
  const desc = document.getElementById('newDesc').value.trim();
  const price = Number(document.getElementById('newPrice').value.trim());
  if (!name || desc.length < 5 || isNaN(price) || price <= 0) {
    errorMsg.textContent = "⚠️ Vui lòng nhập thông tin hợp lệ!";
    return;
  }
  const newP = {
    name, desc, price,
    image: `https://picsum.photos/200/280?random=${Math.random()}`
  };
  products.unshift(newP);
  localStorage.setItem('products', JSON.stringify(products));
  addForm.reset();
  addForm.classList.remove('show');
  renderProducts();
});

// ===== POPUP =====
function openPopup(p) {
  popup.classList.remove('hidden');
  popupTitle.textContent = p.name;
  popupImage.src = p.image;
  popupDesc.textContent = p.desc;
  popupPrice.textContent = "Giá: " + p.price.toLocaleString() + "đ";
  editForm.classList.add('hidden');
}
closePopup.addEventListener('click', () => popup.classList.add('hidden'));
window.addEventListener('click', e => {
  if (e.target === popup) popup.classList.add('hidden');
});

// ===== SỬA =====
function openEdit(i) {
  const p = products[i];
  currentEditIndex = i;
  popup.classList.remove('hidden');
  popupTitle.textContent = "Sửa sản phẩm";
  popupImage.src = p.image;
  popupDesc.textContent = "";
  popupPrice.textContent = "";
  editName.value = p.name;
  editPrice.value = p.price;
  editDesc.value = p.desc;
  editForm.classList.remove('hidden');
}
editForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = editName.value.trim();
  const desc = editDesc.value.trim();
  const price = Number(editPrice.value);
  if (!name || desc.length < 5 || price <= 0) return alert("Thông tin không hợp lệ!");
  products[currentEditIndex] = { ...products[currentEditIndex], name, desc, price };
  localStorage.setItem('products', JSON.stringify(products));
  renderProducts();
  popup.classList.add('hidden');
});

// ===== XÓA =====
function deleteProduct(i) {
  if (confirm("Xóa sản phẩm này?")) {
    products.splice(i, 1);
    localStorage.setItem('products', JSON.stringify(products));
    renderProducts();
  }
}
