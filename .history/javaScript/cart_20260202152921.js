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
displayUserNavbar()
// * function
function displayUserNavbar() {
    if (userData) {
        welcomeMessage.textContent = "welcome , " + userData.firstName
    }
}
function displayCartProducts(cartProducts,totalCartPrice){    
    let cartBox = ""    
    for (const element of cartProducts) {
        cartBox+=`
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
     totalPrice.innerHTML ="Total Products Price : $ " + totalCartPrice.toFixed(2) 
}
// * Api
getCartProducts()
async function getCartProducts(){
    const cartId = localStorage.getItem("cartId")
    try {
        // const response = await fetch(`https://dummyjson.com/carts/user/${userData.id}`)
        const response = await fetch(`https://dummyjson.com/carts/${1}`)
        const data = await response.json() 
          displayCartProducts(data.products,data.total) 
    } catch (error) {
        console.log(error);     
        // & message for handle error
    }
}
async function updataCartData(btn,id){
try {
    const cartItem = btn.closest(".cart-products")
    console.log(cartItem);
    let quantity = Number(cartItem.querySelector(".quantity").textContent)
if (btn.classList.contains("plus")) {
    console.log("plus");
    quantity++
}
else{    
    console.log("mince");
    quantity--
}
if (quantity<0) {
  return
}
   var response =await fetch(`https://dummyjson.com/carts/${1}`, {
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
console.log(data.products[0].quantity,data.total);
displayCartProducts(data.products,data.total)
        modelMessage.textContent = "You Have Change The Quantity"
        model.style.transform = "translateX(0)"
        setTimeout(() => {
            model.style.transform = "translateX(120%)"
        }, 2000)
}
    
catch(error) {
    console.log(error);
    // !message for handle error alert(error)    
}
}
async function deleteCart() {
    const response = fetch(`https://dummyjson.com/carts/1`,{method:"DELETE"})
    console.log(response);
    
}
// * events
removeAll.addEventListener("click",()=>{
console.log("Remove Button Clicked");

deleteCart()

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

