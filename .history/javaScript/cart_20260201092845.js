//  * variables
const homeLink = document.querySelector(".home-item")
const totalPrice = document.querySelector(".total-price")
const removeAll = document.querySelector(".remove-all")
const cartLink = document.querySelector(".cart-item")
const logOutLink = document.querySelector(".logout-item")
const cartContainer = document.querySelector(".cart-products-container")
const welcomeMessage = document.querySelector(".welcome-message")
const userData = JSON.parse(localStorage.getItem("userData"))
console.log(cartContainer);
displayUserNavbar()
// * function
function displayUserNavbar() {
    if (userData) {
        welcomeMessage.textContent = "welcome , " + userData.firstName
    }
}
// * Api
getCartProducts()
async function getCartProducts(){
    const cartId = localStorage.getItem("cartId")
    console.log(userData.id);
    try {
        // const response = await fetch(`https://dummyjson.com/carts/user/${userData.id}`)
        const response = await fetch(`https://dummyjson.com/carts/${1}`)
        const data = await response.json()
        console.log(data);  
          displayCartProducts(data.products,data.total) 
    } catch (error) {
        console.log(error);     
        // & message for handle error
    }
}


function displayCartProducts(cartProducts,totalCartPrice){
    console.log(totalPrice);
    
    let cartBox = ""
    for (const element of cartProducts) {
        console.log(element);
        cartBox+=`
        <div class="cart-products">
        <div class="product-details">
                    <img src="${element.thumbnail}" alt="">
                    <div class="product-details-text">
                        <h3>${element.title}</h3>
                        <span> $${element.price}</span>
                        <span><b>Total Price</b> $${element.total}</span>
                    </div>
                </div>
                <div class="products-controls">
                    <button class="mince">- </button>
                    <button class="quantity">${element.quantity}</button>
                    <button class="plus">+</button>
                    <button class="remove">Remove</button>
                </div>
        </div>
                `
     }
     
     
     cartContainer.innerHTML += cartBox
     totalPrice.innerHTML += totalCartPrice 
}
// * events

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

