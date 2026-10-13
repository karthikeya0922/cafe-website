// ============================================
// Catalogue data
// ============================================
const products = [
    { id: 1, name: "Espresso", category: "Coffee", price: 120, rating: 4.6, icon: "☕", description: "A bold, concentrated shot of our house blend." },
    { id: 2, name: "Cappuccino", category: "Coffee", price: 150, rating: 4.8, icon: "☕", description: "Espresso topped with steamed milk and thick foam." },
    { id: 3, name: "Hazelnut Latte", category: "Coffee", price: 160, rating: 4.7, icon: "🥛", description: "Smooth latte with a sweet roasted hazelnut twist." },
    { id: 4, name: "Cold Brew", category: "Coffee", price: 170, rating: 4.5, icon: "🧊", description: "Steeped for 18 hours, served over ice." },
    { id: 5, name: "Masala Chai", category: "Tea", price: 90, rating: 4.9, icon: "🍵", description: "Strong tea simmered with ginger, cardamom and spices." },
    { id: 6, name: "Green Tea", category: "Tea", price: 100, rating: 4.2, icon: "🍃", description: "Light and refreshing, rich in antioxidants." },
    { id: 7, name: "Oreo Shake", category: "Shakes", price: 190, rating: 4.8, icon: "🥤", description: "Thick vanilla shake blended with Oreo cookies." },
    { id: 8, name: "Mango Smoothie", category: "Shakes", price: 180, rating: 4.4, icon: "🥭", description: "Fresh Alphonso mango blended with yogurt." },
    { id: 9, name: "Butter Croissant", category: "Bakery", price: 110, rating: 4.5, icon: "🥐", description: "Flaky, buttery and baked fresh every morning." },
    { id: 10, name: "Blueberry Muffin", category: "Bakery", price: 130, rating: 4.3, icon: "🧁", description: "Soft muffin loaded with juicy blueberries." },
    { id: 11, name: "Chocolate Brownie", category: "Bakery", price: 140, rating: 4.9, icon: "🍫", description: "Fudgy brownie with a crackly top." },
    { id: 12, name: "Cheese Sandwich", category: "Snacks", price: 180, rating: 4.1, icon: "🥪", description: "Grilled sandwich with melted cheddar and veggies." },
    { id: 13, name: "Peri Peri Fries", category: "Snacks", price: 150, rating: 4.6, icon: "🍟", description: "Crispy fries tossed in spicy peri peri seasoning." }
];

// ============================================
// Page state
// ============================================
const state = {
    category: "All",
    search: "",
    sort: "default",
    cart: {} // product id -> quantity
};

const $ = id => document.getElementById(id);

// ============================================
// Filters and product list
// ============================================
function renderFilters() {
    const categories = ["All", ...new Set(products.map(p => p.category))];
    $("filters").innerHTML = categories
        .map(c => `<button data-category="${c}" class="${c === state.category ? "active" : ""}">${c}</button>`)
        .join("");
}

function getVisibleProducts() {
    const term = state.search.toLowerCase();
    const list = products.filter(p =>
        (state.category === "All" || p.category === state.category) &&
        (p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term))
    );

    switch (state.sort) {
        case "price-asc": return list.sort((a, b) => a.price - b.price);
        case "price-desc": return list.sort((a, b) => b.price - a.price);
        case "name": return list.sort((a, b) => a.name.localeCompare(b.name));
        case "rating": return list.sort((a, b) => b.rating - a.rating);
        default: return list;
    }
}

function renderProducts() {
    const list = getVisibleProducts();
    $("resultCount").textContent = `Showing ${list.length} of ${products.length} items`;

    if (list.length === 0) {
        $("productGrid").innerHTML = `<p class="no-results">No items match your search.</p>`;
        return;
    }

    $("productGrid").innerHTML = list.map(p => `
        <div class="product-card">
            <div class="product-icon">${p.icon}</div>
            <h3>${p.name}</h3>
            <div class="product-meta">${p.category} · ★ ${p.rating}</div>
            <p>${p.description}</p>
            <div class="product-footer">
                <span class="product-price">Rs. ${p.price}</span>
                <button data-add="${p.id}">Add +</button>
            </div>
        </div>`).join("");
}

// ============================================
// Cart
// ============================================
function addToCart(id) {
    state.cart[id] = (state.cart[id] || 0) + 1;
    renderCart();
}

function changeQuantity(id, delta) {
    state.cart[id] += delta;
    if (state.cart[id] <= 0) delete state.cart[id];
    renderCart();
}

function renderCart() {
    const entries = Object.entries(state.cart).map(([id, qty]) => ({
        product: products.find(p => p.id === Number(id)),
        qty
    }));

    $("cartItems").innerHTML = entries.map(({ product, qty }) => `
        <li>
            <span>${product.name}<br><small>Rs. ${product.price * qty}</small></span>
            <span class="qty-controls">
                <button data-qty="${product.id}" data-delta="-1">−</button>
                <span>${qty}</span>
                <button data-qty="${product.id}" data-delta="1">+</button>
            </span>
        </li>`).join("");

    const count = entries.reduce((sum, e) => sum + e.qty, 0);
    const total = entries.reduce((sum, e) => sum + e.product.price * e.qty, 0);

    $("cartCount").textContent = count;
    $("cartTotal").textContent = `Rs. ${total}`;
    $("cartEmpty").style.display = count === 0 ? "block" : "none";
    $("checkoutBtn").disabled = count === 0;
}

// ============================================
// Event handlers
// ============================================
$("search").addEventListener("input", e => {
    state.search = e.target.value.trim();
    renderProducts();
});

$("sort").addEventListener("change", e => {
    state.sort = e.target.value;
    renderProducts();
});

$("filters").addEventListener("click", e => {
    const category = e.target.dataset.category;
    if (!category) return;
    state.category = category;
    renderFilters();
    renderProducts();
});

$("productGrid").addEventListener("click", e => {
    const id = e.target.dataset.add;
    if (id) addToCart(Number(id));
});

$("cartItems").addEventListener("click", e => {
    const id = e.target.dataset.qty;
    if (id) changeQuantity(Number(id), Number(e.target.dataset.delta));
});

$("clearBtn").addEventListener("click", () => {
    state.cart = {};
    renderCart();
});

$("checkoutBtn").addEventListener("click", () => {
    alert(`Order placed! Your total is ${$("cartTotal").textContent}. Thank you for choosing Fire Pot.`);
    state.cart = {};
    renderCart();
});

renderFilters();
renderProducts();
renderCart();
