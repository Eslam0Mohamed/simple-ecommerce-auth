//  * variables
const homeLink = document.querySelector(".home-item")
const cartLink = document.querySelector(".cart-item")
const logOutLink = document.querySelector(".logout-item")

const userData = JSON.parse(localStorage.getItem("userData"))
displayUserNavbar()
// * function
function displayUserNavbar() {
    if (userData) {
        welcomeMessage.textContent = "welcome , " + userData.firstName
    }
}


// * Api



// * events