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
displayCartProducts()
async function displayCartProducts(){
    const cartId = localStorages
    try {
        const response = await fetch(`https://dummyjson.com/carts/user/${userData.id}`)
        const data = await response.json()
        console.log(data);
        
    } catch (error) {
        console.log(error);
        
    }

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