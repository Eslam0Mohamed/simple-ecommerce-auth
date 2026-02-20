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
const menuBar = document.querySelector(".menu")
const mobileMenu = document.querySelector(".mobile-menu")
const errorHandling = document.querySelector(".error-handling ")
const tryAgain = document.querySelector(".try-again")
const errorHandlingMsg = document.querySelector(".error-handling-msg")
const loadingEffect = document.querySelector(".loading-effect")
const remove = document.querySelector(".remove")
let productId
let productDeleted = 0
let selectedProduct
let totalProductPrice




displayUserNavbar()
// * function
function displayUserNavbar() {
    if (userData) {
        welcomeMessage.textContent = "welcome , " + userData.firstName
    }
}
function displayCartProducts(cartProducts, totalCartPrice) {
    if (cartProducts.length == 0) {
        totalPrice.innerHTML = "Your Cart is empty"
        return
    }
    let cartBox = ""
    for (const element of cartProducts) {
        cartBox += `
        <div class="cart-products">
        <div class="product-details">
                    <img src="${element.thumbnail}" alt="">
                    <div class="product-details-text">
                        <h3>${element.title}</h3>
                        <span> $${element.price.toFixed(0)}</span>
                        <span class="total-product-price" data-price="${element.total.toFixed(0)}"><b>Total Price</b> $${element.total.toFixed(0)}</span>
                    </div>
                </div>
                <div class="products-controls">
                    <button class="mince" onclick="updataCartData(this,${element.id},${element.quantity})"">- </button>
                    <button class="quantity">${element.quantity}</button>
                    <button class="plus" onclick="updataCartData(this,${element.id},${element.quantity})">+</button>
                    <button class="remove" id="${element.id}">Remove</button>
                </div>
        </div>
                `
    }


    cartContainer.innerHTML = cartBox
    totalPrice.innerHTML = "Total Products Price : $ " + totalCartPrice.toFixed(0)
}
function showPopUpMessage(message) {
    errorHandling.style.display = "flex";
    errorHandlingMsg.innerHTML = message;
}
function closePopUpMessage() {
    errorHandling.style.display = "none";
}
// * Api
getCartProducts()
async function getCartProducts() {
    loadingEffect.style.display = "flex"
    const cartId = localStorage.getItem("cartId")
    try {
        // const response = await fetch(`https://dummyjson.com/carts/user/${userData.id}`)
        const response = await fetch(`https://dummyjson.com/carts/${1}`)
        const data = await response.json()
        displayCartProducts(data.products, data.total)
    } catch (error) {
        console.log(error);
        showPopUpMessage(error)
        cartContainer.innerHTML = `<div style="color:red;font-size:22px;text-align:center">Error in Cart Page</div>`
        removeAll.style.display = "none"
        modelMessage.textContent = "We can't Fetch Product From Server"
        model.style.transform = "translateX(0)"
        setTimeout(() => {
            model.style.transform = "translateX(120%)"
        }, 2000)
    }
    loadingEffect.style.display = "none"
}
async function updataCartData(btn, id) {
    try {
        const cartItem = btn.closest(".cart-products")
        console.log(cartItem);
        let quantity = Number(cartItem.querySelector(".quantity").textContent)
        if (btn.classList.contains("plus")) {
            console.log("plus");
            quantity++
        }
        else {
            console.log("mince");
            quantity--
        }
        if (quantity < 0) {
            return
        }
        var response = await fetch(`https://dummyjson.com/carts/${1}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                merge: true,
                products: [
                    {
                        id: id,
                        quantity: quantity,
                    },
                ]
            })
        })
        const data = await response.json()
        displayCartProducts(data.products, data.total)
        modelMessage.textContent = "You Have Change The Quantity"
        model.style.transform = "translateX(0)"
        setTimeout(() => {
            model.style.transform = "translateX(120%)"
        }, 2000)
    }

    catch (error) {
        console.log(error);
        showPopUpMessage(error)
        modelMessage.textContent = "Error From Server We Can't Change Quantity"
        model.style.transform = "translateX(0)"
        setTimeout(() => {
            model.style.transform = "translateX(120%)"
        }, 2000)
    }
}
async function deleteCart() {
    try {
        const response = await fetch(`https://dummyjson.com/carts/${1}`,
            { method: "DELETE" })
        const data = await response.json()
        if (data.isDeleted) {
            cartContainer.innerHTML = ""
            totalPrice.innerHTML = "Total Products Price : $ 0 | Your Cart Is Empty"
            modelMessage.textContent = "The Products Have been Deleted"
            model.style.transform = "translateX(0)"
            setTimeout(() => {
                model.style.transform = "translateX(120%)"
            }, 2000)
            deletelModelContainer.style.display = "none"
        }
    } catch (error) {
        console.log(error);
        modelMessage.textContent = "Error From Server we can't Delete Cart"
        model.style.transform = "translateX(0)"
        showPopUpMessage(error)
        setTimeout(() => {
            model.style.transform = "translateX(120%)"
        }, 3000)
    }
}

async function deleteProduct(id) {
    loadingEffect.style.display = "flex"
    try {
        const response = await fetch(`https://dummyjson.com/products/${id}`, {
            method: 'DELETE',
        })
        console.log(response);
        if (!response.ok) {
            throw Error("Error from server")
        }
        const data = await response.json()
        console.log(data);

        if (data.isDeleted) {
            selectedProduct.remove()
            productDeleted++
        }
        if (productDeleted == 4) {
            cartContainer.innerHTML = "<div style='text-align:center;color:blueviolet;margin-top:25px;font-size:25px'>All Product Deleted</div>"
            totalPrice.remove()
            removeAll.remove()
        }
        for (let i = 1; i <= productDeleted; i++) {
            console.log("product deleted from loop");
            if (i == productDeleted) {
                console.log("product deleted if" ); 
                    totalPrice.innerHTML = "Total Products Price : $ " + (parseInt(totalPrice.textContent.match(/[0-9]{1,}/)) - totalProductPrice)
            }
        }
    }
    catch (error) {
        showPopUpMessage(error)
    }
    loadingEffect.style.display = "none"
}


// * events
removeAll.addEventListener("click", (e) => {
    deletelModelContainer.style.display = "flex"
})
deletelModel.addEventListener("click", function (e) {
    if (e.target.innerHTML == "Yes") {
        deleteCart()
    }
    else if (e.target.innerHTML == "No" || e.target.innerHTML == "No leave it in cart") {
        deletelModelContainer.style.display = "none"
    }
    else if (e.target.innerHTML == "Yes Delete It") {
        deletelModelContainer.style.display = "none"
        deleteProduct(productId)

    }
})
cartContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove")) {
        productId = e.target.id
        selectedProduct = e.target.closest(".cart-products")
        totalProductPrice = parseInt(e.target.closest(".cart-products").querySelector(".total-product-price").dataset.price)
        deletelModelContainer.style.display = "flex"
        deleteModelMessage.innerHTML = "Are You want to delete this product from your cart"
        const yes = deletelModel.firstElementChild.lastElementChild.firstElementChild.innerHTML = "Yes Delete It"
        const no = deletelModel.firstElementChild.lastElementChild.lastElementChild.innerHTML = "No leave it in cart"
    }
    else {
        deletelModelContainer.style.display = "none"

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
let isOpened = false
menuBar.addEventListener("click", function () {
    if (isOpened == false) {
        mobileMenu.style.transform = "translateX(0)"
        isOpened = true
    }
    else {
        mobileMenu.style.transform = "translateX(-100%)"
        isOpened = false
    }
})
tryAgain.addEventListener("click", function () {
    closePopUpMessage()
})


