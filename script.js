const produtos = [
    { id: 1, nome: 'iPhone 15 Pro Max', preco: 8999, precoOriginal: 9999, descricao: 'Smartphone premium com câmera profissional', categoria: 'smartphone', tipo: 'Eletrônicos', marca: 'Apple', rating: 4.8, reviews: 234, path: 'img/iphone15promax.webp' },
    { id: 2, nome: 'MacBook Air M2', preco: 7499, precoOriginal: 8299, descricao: 'Laptop ultrabook para trabalho e criatividade', categoria: 'laptop', tipo: 'Informática', marca: 'Apple', rating: 4.9, reviews: 456, path: 'img/macbookairm2.jpg' },
    { id: 3, nome: 'Galaxy S24 Ultra', preco: 6999, precoOriginal: 7499, descricao: 'Flagship Android com S Pen integrada', categoria: 'smartphone', tipo: 'Eletrônicos', marca: 'Samsung', rating: 4.7, reviews: 189, path: 'img/galaxys24ultra.webp' },
    { id: 4, nome: 'iPad Pro 12.9"', preco: 5999, precoOriginal: null, descricao: 'Tablet profissional para design e produtividade', categoria: 'tablet', tipo: 'Eletrônicos', marca: 'Apple', rating: 4.8, reviews: 167, path: 'img/ipadpro12.9.webp' },
    { id: 5, nome: 'Dell XPS 13', preco: 4999, precoOriginal: 5499, descricao: 'Ultrabook premium para profissionais', categoria: 'laptop', tipo: 'Informática', marca: 'Dell', rating: 4.6, reviews: 298, path: 'img/dellxps13.jpg' },
    { id: 6, nome: 'AirPods Pro 2', preco: 1599, precoOriginal: 1899, descricao: 'Fones wireless com cancelamento de ruído', categoria: 'acessorio', tipo: 'Áudio', marca: 'Apple', rating: 4.7, reviews: 543, path: 'img/airpods pro 12.webp' },
    { id: 7, nome: 'Xiaomi 14 Ultra', preco: 4299, precoOriginal: 4699, descricao: 'Flagship com câmera Leica profissional', categoria: 'smartphone', tipo: 'Eletrônicos', marca: 'Xiaomi', rating: 4.5, reviews: 123, path: 'img/xiaomi14ultra.webp' },
    { id: 8, nome: 'Galaxy Tab S9', preco: 3999, precoOriginal: null, descricao: 'Tablet Android premium para trabalho', categoria: 'tablet', tipo: 'Eletrônicos', marca: 'Samsung', rating: 4.4, reviews: 87, path: 'img/galaxys9.webp' },
    { id: 9, nome: 'MacBook Pro 14"', preco: 12999, precoOriginal: null, descricao: 'Laptop profissional para criadores', categoria: 'laptop', tipo: 'Informática', marca: 'Apple', rating: 4.9, reviews: 321, path: 'img/macbookpro14.webp' },
    { id: 10, nome: 'Galaxy Buds2 Pro', preco: 899, precoOriginal: 1199, descricao: 'Fones true wireless premium', categoria: 'acessorio', tipo: 'Áudio', marca: 'Samsung', rating: 4.3, reviews: 234, path: 'img/galaxybuds2pro.jpg' },
    { id: 11, nome: 'iPhone 15', preco: 5999, precoOriginal: 6499, descricao: 'Smartphone moderno com USB-C', categoria: 'smartphone', tipo: 'Eletrônicos', marca: 'Apple', rating: 4.6, reviews: 412, path: 'img/iphone15.jpg' },
    { id: 12, nome: 'Xiaomi Pad 6', preco: 1899, precoOriginal: 2199, descricao: 'Tablet intermediário com ótimo custo-benefício', categoria: 'tablet', tipo: 'Eletrônicos', marca: 'Xiaomi', rating: 4.2, reviews: 156, path: 'img/xiaomipad6.webp' }
];


const barraLateral = document.getElementById('barra-lateral');
const toggle = document.getElementById('togglebarra-lateral');
const overlay = document.getElementById('overlay');
const productGrid = document.getElementById('productGrid');
const loading = document.getElementById('loading');
const sortSelect = document.getElementById('sortSelect');
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');


function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price);
}

function calculateDiscount(original, current) {
    if (!original) return 0;
    return Math.round(((original - current) / original) * 100);
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '⭐'.repeat(fullStars);
    if (hasHalfStar) stars += '⭐';
    return stars;
}


function renderProduct(produto) {
    const discount = calculateDiscount(produto.precoOriginal, produto.preco);

    return `
        <article class="card" data-id="${produto.id}" data-category="${produto.categoria}" data-brand="${produto.marca}" data-price="${produto.preco}">
            <div class="thumb">
                <img src="${produto.path}" alt="${produto.nome}" class="product-img">
            </div>
            <div class="card-nome">${produto.nome}</div>
            <div class="avaliacao">
                <span class="estrelas">${generateStars(produto.rating)}</span>
                <span class="avaliacoes-count">(${produto.reviews})</span>
            </div>
            <div class="card-descricao">${produto.descricao}</div>
            <div class="preco-container">
                <span class="preco">${formatPrice(produto.preco)}</span>
                ${produto.precoOriginal ? `
                    <span class="preco-original">${formatPrice(produto.precoOriginal)}</span>
                    <span class="desconto">-${discount}%</span>
                ` : ''}
            </div>
            <button class="btn btn-primary btn-comprar">🛒 Adicionar ao Carrinho</button>
        </article>
    `;
}

function renderProducts(products = produtos) {
    loading.style.display = 'flex';

    setTimeout(() => {
        productGrid.innerHTML = products.map(renderProduct).join('');
        loading.style.display = 'none';
    }, 300);
}


function getActiveFilters() {
    const searchQuery = (document.querySelector('input[type="search"]').value || '').toLowerCase();

    const categoryChecks = Array.from(document.querySelectorAll('.barra-lateral input[type="checkbox"][value]'))
        .filter(cb => cb.checked && cb.closest('.filtro-grupo') && cb.closest('.filtro-grupo').querySelector('.filtro-titulo').textContent.trim() === 'Categoria')
        .map(cb => cb.value);

    const brandChecks = Array.from(document.querySelectorAll('.barra-lateral input[type="checkbox"][value]'))
        .filter(cb => cb.checked && cb.closest('.filtro-grupo') && cb.closest('.filtro-grupo').querySelector('.filtro-titulo').textContent.trim() === 'Marca')
        .map(cb => cb.value);

    const ratingRadio = document.querySelector('.barra-lateral input[type="radio"][name="rating"]:checked');
    const minRating = ratingRadio ? parseInt(ratingRadio.value, 10) : 0;

    const maxPrice = priceRange ? parseInt(priceRange.value, 10) : Infinity;


    const navActive = document.querySelector('.nav-item.active');
    const navCategory = navActive ? navActive.textContent.toLowerCase() : 'todos';

    return { searchQuery, categoryChecks, brandChecks, minRating, maxPrice, navCategory };
}

function applyFiltersAndRender() {
    const { searchQuery, categoryChecks, brandChecks, minRating, maxPrice, navCategory } = getActiveFilters();

    let filtered = produtos.filter(p => {

        if (p.preco > maxPrice) return false;


        if (minRating && Math.floor(p.rating) < minRating) return false;


        if (categoryChecks.length > 0 && !categoryChecks.includes(p.categoria)) return false;


        if (brandChecks.length > 0 && !brandChecks.includes(p.marca)) return false;


        if (navCategory && navCategory !== 'todos') {
            const cat = navCategory;
            if (!(p.categoria.includes(cat) || cat.includes(p.categoria))) return false;
        }


        if (searchQuery) {
            const hay = (p.nome + ' ' + p.descricao + ' ' + p.marca).toLowerCase();
            if (!hay.includes(searchQuery)) return false;
        }

        return true;
    });


    const sortBy = sortSelect ? sortSelect.value : 'popular';
    switch (sortBy) {
        case 'price-asc':
            filtered.sort((a, b) => a.preco - b.preco);
            break;
        case 'price-desc':
            filtered.sort((a, b) => b.preco - a.preco);
            break;
        case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            filtered = filtered.slice().reverse();
            break;
        default:
            filtered.sort((a, b) => b.reviews - a.reviews);
    }

    renderProducts(filtered);
}


function toggleSidebar() {
    const isHidden = barraLateral.classList.contains('hidden');
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        barraLateral.classList.toggle('show');
        overlay.classList.toggle('show');
    } else {
        barraLateral.classList.toggle('hidden');
    }

    toggle.setAttribute('aria-pressed', String(isHidden));
}


toggle.addEventListener('click', toggleSidebar);
overlay.addEventListener('click', toggleSidebar);


document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'f' &&
        document.activeElement.tagName.toLowerCase() !== 'input' &&
        document.activeElement.tagName.toLowerCase() !== 'select') {
        e.preventDefault();
        toggleSidebar();
    }

    if (e.key === 'Escape') {
        if (window.innerWidth <= 768) {
            barraLateral.classList.remove('show');
            overlay.classList.remove('show');
        }
    }
});


sortSelect.addEventListener('change', (e) => {
    applyFiltersAndRender();
});



priceRange.addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    priceValue.textContent = formatPrice(value);
    applyFiltersAndRender();
});


(function initPrice() {
    if (priceRange && priceValue) {
        const initial = parseInt(priceRange.value);
        priceValue.textContent = formatPrice(initial);
    }
})();



document.querySelectorAll('.barra-lateral input[type="checkbox"], .barra-lateral input[type="radio"]').forEach(el => {
    el.addEventListener('change', () => applyFiltersAndRender());
});


const searchInput = document.querySelector('input[type="search"]');
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    if (!query) {
        applyFiltersAndRender();
        return;
    }
    applyFiltersAndRender();
});


// Nav items: agora são <li> dentro de .nav-list (lista semântica). Adaptamos o seletor.
document.querySelectorAll('.nav-list .nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        document.querySelectorAll('.nav-list .nav-item').forEach(i => i.classList.remove('active'));
        e.currentTarget.classList.add('active');

        applyFiltersAndRender();
    });
});


window.addEventListener('resize', () => {
    const isMobile = window.innerWidth <= 768;

    if (!isMobile) {
        barraLateral.classList.remove('show');
        overlay.classList.remove('show');
    }
});



applyFiltersAndRender();


const cartKey = 'mini_shop_cart_v1';
let cart = [];
const cartButton = document.getElementById('cartButton');
const cartCountEl = document.getElementById('cartCount');
const cartDrawer = document.getElementById('cartDrawer');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const clearCartBtn = document.getElementById('clearCart');
const checkoutBtn = document.getElementById('checkout');

function loadCart() {
    try {
        const raw = localStorage.getItem(cartKey);
        cart = raw ? JSON.parse(raw) : [];
    } catch (err) {
        cart = [];
    }
    updateCartUI();
}

function saveCart() {
    localStorage.setItem(cartKey, JSON.stringify(cart));
    updateCartUI();
}

function addToCart(productId) {
    const prod = produtos.find(p => p.id === productId);
    if (!prod) return;
    const existing = cart.find(i => i.id === productId);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ id: prod.id, nome: prod.nome, preco: prod.preco, qty: 1 });
    }
    saveCart();
}

function removeFromCart(productId) {
    cart = cart.filter(i => i.id !== productId);
    saveCart();
}

function changeQty(productId, qty) {
    const it = cart.find(i => i.id === productId);
    if (!it) return;
    it.qty = Math.max(1, qty);
    saveCart();
}

function updateCartUI() {
    const totalCount = cart.reduce((s, i) => s + i.qty, 0);
    cartCountEl.textContent = totalCount;

    const total = cart.reduce((s, i) => s + i.preco * i.qty, 0);
    cartTotalEl.textContent = formatPrice(total);


    if (cartDrawer && cartDrawer.style.display !== 'none') renderCartItems();
}

function renderCartItems() {
    cartItemsEl.innerHTML = '';
    if (cart.length === 0) {
        cartItemsEl.innerHTML = '<div>Seu carrinho está vazio.</div>';
        return;
    }

    cart.forEach(item => {
        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.justifyContent = 'space-between';
        div.style.alignItems = 'center';
        div.style.gap = '8px';
        div.innerHTML = `
                    <div style="flex:1">
                        <div style="font-weight:600">${item.nome}</div>
                        <div style="color:#64748b;font-size:13px">${formatPrice(item.preco)}</div>
                    </div>
                    <div style="display:flex;align-items:center;gap:6px">
                        <button data-id="${item.id}" class="qty-decr btn btn-secondary">-</button>
                        <div>${item.qty}</div>
                        <button data-id="${item.id}" class="qty-incr btn btn-secondary">+</button>
                        <button data-id="${item.id}" class="remove-item btn btn-secondary">Remover</button>
                    </div>
                `;
        cartItemsEl.appendChild(div);
    });


    cartItemsEl.querySelectorAll('.qty-incr').forEach(b => b.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'), 10);
        changeQty(id, (cart.find(i => i.id === id).qty || 0) + 1);
        renderCartItems();
    }));

    cartItemsEl.querySelectorAll('.qty-decr').forEach(b => b.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'), 10);
        const it = cart.find(i => i.id === id);
        if (!it) return;
        changeQty(id, Math.max(1, it.qty - 1));
        renderCartItems();
    }));

    cartItemsEl.querySelectorAll('.remove-item').forEach(b => b.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'), 10);
        removeFromCart(id);
        renderCartItems();
    }));
}


cartButton.addEventListener('click', () => {
    if (cartDrawer.style.display === 'none' || !cartDrawer.style.display) {
        cartDrawer.style.display = 'block';
        renderCartItems();
    } else {
        cartDrawer.style.display = 'none';
    }
});

clearCartBtn.addEventListener('click', () => {
    cart = [];
    saveCart();
    renderCartItems();
});

checkoutBtn.addEventListener('click', () => {
    alert('Checkout demo: total ' + cartTotalEl.textContent);
});


productGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-comprar');
    if (!btn) return;
    const article = btn.closest('.card');
    if (!article) return;
    const id = parseInt(article.dataset.id, 10);
    if (!isNaN(id)) addToCart(id);
});


loadCart();


const openLogin = document.getElementById('openLogin');
const loginTela = document.getElementById('loginTela');
const closeLogin = document.getElementById('closeLogin');

function toggleSenha() {
    let campo = document.getElementById("senha");
    campo.type = campo.type === "password" ? "text" : "password";
}

function limparCamposLogin() {
    const campos = loginTela.querySelectorAll('input');
    campos.forEach(campo => campo.value = '');
}

openLogin.addEventListener('click', () => {
    loginTela.classList.add('active');
});
closeLogin.addEventListener('click', () => {
    loginTela.classList.remove('active');
    limparCamposLogin();
});
loginTela.addEventListener('click', e => {
    if (e.target === loginTela) {
        loginTela.classList.remove('active');
        limparCamposLogin();
    }
});
