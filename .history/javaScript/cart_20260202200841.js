//  * variables
const homeLink = document.querySelector(".home-item")
const totalPrice = document.querySelector(".total-price")
const removeAll = document.querySelector(".remove-all")
const cartLink = document.querySelector(".cart-item")
const logOutLink = document.querySelector(".logout-item")
const cartContainer = document.querySelector(".cart-products-container")
const welcomeMessage = document.querySelector(".welcome-message")
const userData = JSON.parse(localStorage.getItem("userData"))
const mince = document.querySelector(".mince")
const plus = document.querySelector(".plus")
const model = document.querySelector(".model")
const modelMessage = document.querySelector(".model-message")
const deleteModelMessage = document.querySelector(".delete-model-message")
const deletelModel = document.querySelector(".delete-model")
const deletelModelContainer = document.querySelector(".delete-model-container")
displayUserNavbar()
// * function
function displayUserNavbar() {
    if (userData) {
        welcomeMessage.textContent = "welcome , " + userData.firstName
    }
}
function displayCartProducts(cartProducts, totalCartPrice) {
    let cartBox = ""
    for (const element of cartProducts) {
        cartBox += `
        <div class="cart-products">
        <div class="product-details">
                    <img src="${element.thumbnail}" alt="">
                    <div class="product-details-text">
                        <h3>${element.title}</h3>
                        <span> $${element.price.toFixed(0)}</span>
                        <span><b>Total Price</b> $${element.total.toFixed(0)}</span>
                    </div>
                </div>
                <div class="products-controls">
                    <button class="mince" onclick="updataCartData(this,${element.id},${element.quantity})"">- </button>
                    <button class="quantity">${element.quantity}</button>
                    <button class="plus" onclick="updataCartData(this,${element.id},${element.quantity})">+</button>
                    <button class="remove">Remove</button>
                </div>
        </div>
                `
    }


    cartContainer.innerHTML = cartBox
    totalPrice.innerHTML = "Total Products Price : $ " + totalCartPrice.toFixed(2)
}
// * Api
// Reusable API helper and improved API functions
const API_BASE = "https://dummyjson.com"

async function apiRequest(path, { method = "GET", body = null, headers = {}, retries = 1, timeout = 8000 } = {}) {
    const url = API_BASE + path
    for (let attempt = 0; attempt <= retries; attempt++) {
        const controller = new AbortController()
        const id = setTimeout(() => controller.abort(), timeout)
        try {
            const opts = {
                method,
                headers: { ...headers },
                signal: controller.signal,
            }
            if (body != null) {
                opts.headers["Content-Type"] = opts.headers["Content-Type"] || "application/json"
                opts.body = typeof body === "string" ? body : JSON.stringify(body)
            }
            const res = await fetch(url, opts)
            clearTimeout(id)
            if (!res.ok) {
                const text = await res.text().catch(() => "")
                throw new Error(`${res.status} ${res.statusText} ${text}`)
            }
            return await res.json()
        } catch (err) {
            clearTimeout(id)
            if (attempt === retries) throw err
            await new Promise(r => setTimeout(r, 300 * (attempt + 1)))
        }
    }
}

getCartProducts()
async function getCartProducts() {
    const cartId = localStorage.getItem("cartId") || 1
    try {
        const data = await apiRequest(`/carts/${cartId}`, { retries: 2 })
        if (!data || !data.products || data.products.length === 0) {
            cartContainer.innerHTML = ""
            totalPrice.innerHTML = "Total Products Price : $ 0 | Your Cart Is Empty"
            return
        }
        displayCartProducts(data.products, data.total)
    } catch (error) {
        console.error("getCartProducts error:", error)
        modelMessage.textContent = "Failed to load cart. Try again later."
        model.style.transform = "translateX(0)"
        setTimeout(() => model.style.transform = "translateX(120%)", 2000)
    }
}

async function updataCartData(btn, id) {
    const cartItem = btn.closest(".cart-products")
    const qtyEl = cartItem ? cartItem.querySelector(".quantity") : null
    if (!qtyEl) return
    let quantity = Number(qtyEl.textContent)
    const isPlus = btn.classList.contains("plus")
    const newQuantity = isPlus ? quantity + 1 : quantity - 1
    if (newQuantity < 0) return

    // Optimistic UI update
    qtyEl.textContent = newQuantity
    try {
        const cartId = localStorage.getItem("cartId") || 1
        const body = { merge: true, products: [{ id: id, quantity: newQuantity }] }
        const data = await apiRequest(`/carts/${cartId}`, { method: "PUT", body, retries: 1 })
        displayCartProducts(data.products, data.total)
        showModel("Quantity updated")
    } catch (error) {
        // rollback optimistic update
        qtyEl.textContent = quantity
        console.error("updataCartData error:", error)
        showModel("Failed to update quantity")
    }
}

async function deleteCart() {
    try {
        const cartId = localStorage.getItem("cartId") || 1
        const data = await apiRequest(`/carts/${cartId}`, { method: "DELETE", retries: 1 })
        // dummyjson returns an object indicating deletion; be defensive
        if (data && (data.isDeleted || data.deleted || data.length === 0)) {
            cartContainer.innerHTML = ""
            totalPrice.innerHTML = "Total Products Price : $ 0 | Your Cart Is Empty"
            localStorage.removeItem("cartId")
            showModel("Cart cleared")
            deletelModelContainer.style.display = "none"
        } else {
            // Some APIs return the deleted resource; still clear UI
            cartContainer.innerHTML = ""
            totalPrice.innerHTML = "Total Products Price : $ 0 | Your Cart Is Empty"
            localStorage.removeItem("cartId")
            showModel("Cart cleared")
            deletelModelContainer.style.display = "none"
        }
    } catch (error) {
        console.error("deleteCart error:", error)
        showModel("Failed to delete cart")
    }
}

function showModel(msg) {
    modelMessage.textContent = msg
    model.style.transform = "translateX(0)"
    setTimeout(() => model.style.transform = "translateX(120%)", 2000)
}
// * events


//  !!!!!!! Complete Here 
removeAll.addEventListener("click", (e) => {
    deletelModelContainer.style.display = "flex"
})
deletelModel.addEventListener("click", function (e) {
    if (e.target.innerHTML == "Yes") {
        deleteCart()
    }
    else if (e.target.innerHTML == "No") {
        deletelModelContainer.style.display = "none"
    }
    else {

    }
})


logOutLink.addEventListener("click", (e) => {
    e.preventDefault()
    modelMessage.textContent = "Now You Are Logged Out"
    model.style.transform = "translateX(0)"
    setTimeout(() => {
        model.style.transform = "translateX(120%)"
        location.href = "../login.html"
    }, 2000)
    localStorage.removeItem("userData")
})

