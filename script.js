const produtos = [
            { id: 1, nome: 'iPhone 15 Pro Max', preco: 8999, precoOriginal: 9999, descricao: 'Smartphone premium com câmera profissional', categoria: 'smartphone', marca: 'Apple', rating: 4.8, reviews: 234 },
            { id: 2, nome: 'MacBook Air M2', preco: 7499, precoOriginal: 8299, descricao: 'Laptop ultrabook para trabalho e criatividade', categoria: 'laptop', marca: 'Apple', rating: 4.9, reviews: 456 },
            { id: 3, nome: 'Galaxy S24 Ultra', preco: 6999, precoOriginal: 7499, descricao: 'Flagship Android com S Pen integrada', categoria: 'smartphone', marca: 'Samsung', rating: 4.7, reviews: 189 },
            { id: 4, nome: 'iPad Pro 12.9"', preco: 5999, precoOriginal: null, descricao: 'Tablet profissional para design e produtividade', categoria: 'tablet', marca: 'Apple', rating: 4.8, reviews: 167 },
            { id: 5, nome: 'Dell XPS 13', preco: 4999, precoOriginal: 5499, descricao: 'Ultrabook premium para profissionais', categoria: 'laptop', marca: 'Dell', rating: 4.6, reviews: 298 },
            { id: 6, nome: 'AirPods Pro 2', preco: 1599, precoOriginal: 1899, descricao: 'Fones wireless com cancelamento de ruído', categoria: 'acessorio', marca: 'Apple', rating: 4.7, reviews: 543 },
            { id: 7, nome: 'Xiaomi 14 Ultra', preco: 4299, precoOriginal: 4699, descricao: 'Flagship com câmera Leica profissional', categoria: 'smartphone', marca: 'Xiaomi', rating: 4.5, reviews: 123 },
            { id: 8, nome: 'Galaxy Tab S9', preco: 3999, precoOriginal: null, descricao: 'Tablet Android premium para trabalho', categoria: 'tablet', marca: 'Samsung', rating: 4.4, reviews: 87 },
            { id: 9, nome: 'MacBook Pro 14"', preco: 12999, precoOriginal: null, descricao: 'Laptop profissional para criadores', categoria: 'laptop', marca: 'Apple', rating: 4.9, reviews: 321 },
            { id: 10, nome: 'Galaxy Buds2 Pro', preco: 899, precoOriginal: 1199, descricao: 'Fones true wireless premium', categoria: 'acessorio', marca: 'Samsung', rating: 4.3, reviews: 234 },
            { id: 11, nome: 'iPhone 15', preco: 5999, precoOriginal: 6499, descricao: 'Smartphone moderno com USB-C', categoria: 'smartphone', marca: 'Apple', rating: 4.6, reviews: 412 },
            { id: 12, nome: 'Xiaomi Pad 6', preco: 1899, precoOriginal: 2199, descricao: 'Tablet intermediário com ótimo custo-benefício', categoria: 'tablet', marca: 'Xiaomi', rating: 4.2, reviews: 156 }
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
                <article class="card" data-category="${produto.categoria}" data-brand="${produto.marca}" data-price="${produto.preco}">
                    <div class="thumb">
                        📱 Imagem do produto
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

        // Sidebar toggle
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
            const sortBy = e.target.value;
            let sortedProducts = [...produtos];
            
            switch(sortBy) {
                case 'price-asc':
                    sortedProducts.sort((a, b) => a.preco - b.preco);
                    break;
                case 'price-desc':
                    sortedProducts.sort((a, b) => b.preco - a.preco);
                    break;
                case 'rating':
                    sortedProducts.sort((a, b) => b.rating - a.rating);
                    break;
                case 'newest':
                    sortedProducts.reverse();
                    break;
                default:
                    sortedProducts.sort((a, b) => b.reviews - a.reviews);
            }
            
            renderProducts(sortedProducts);
        });


        priceRange.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            priceValue.textContent = formatPrice(value);
            
            const filteredProducts = produtos.filter(p => p.preco <= value);
            renderProducts(filteredProducts);
        });


        document.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox' || e.target.type === 'radio') {

                console.log('Filter changed:', e.target);
            }
        });


        const searchInput = document.querySelector('input[type="search"]');
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            if (!query) {
                renderProducts();
                return;
            }
            
            const filteredProducts = produtos.filter(p => 
                p.nome.toLowerCase().includes(query) ||
                p.descricao.toLowerCase().includes(query) ||
                p.marca.toLowerCase().includes(query)
            );
            
            renderProducts(filteredProducts);
        });


        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
                e.target.classList.add('active');
                
                const category = e.target.textContent.toLowerCase();
                if (category === 'todos') {
                    renderProducts();
                } else {
                    const filteredProducts = produtos.filter(p => 
                        p.categoria.includes(category) || 
                        category.includes(p.categoria)
                    );
                    renderProducts(filteredProducts);
                }
            });
        });


        window.addEventListener('resize', () => {
            const isMobile = window.innerWidth <= 768;
            
            if (!isMobile) {
                barraLateral.classList.remove('show');
                overlay.classList.remove('show');
            }
        });


        renderProducts();