//  * variables
const homeLink = document.querySelector(".home-item")
const cartLink = document.querySelector(".cart-item")
const logOutLink = document.querySelector(".logout-item")
const cartContainer = document.querySelector(".cart-products")
const welcomeMessage = document.querySelector(".welcome-message")

const userData = JSON.parse(localStorage.getItem("userData"))
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
          displayCartProducts(data.products) 
    } catch (error) {
        console.log(error);     
        // & message for handle error
    }
}


function displayCartProducts(cartProducts){
    let cartBox = ""
    for (const element of cartProducts) {
        console.log(element);
        cartBox+=`
                    <div class="cart-products">
                <div class="product-details">
                    <img src="./images/product.jpg" alt="">
                    <div class="product-details-text">
                        <h3>Lenovo Ideabad</h3>
                        <span>$300</span>
                    </div>
                </div>
                <div class="products-controls">
                    <button class="mince">- </button>
                    <button class="quantity">1</button>
                    <button class="plus">+</button>
                    <button class="remove">Remove</button>
                </div>
            </div>
        `
     }
     console.log(cart);
     
     cartContainer.innerHTML = cartBox
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