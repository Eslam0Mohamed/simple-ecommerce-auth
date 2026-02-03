//  * variables
const homeLink = document.querySelector(".home-item")
const cartLink = document.querySelector(".cart-item")
const logInLink = document.querySelector(".login-item")
const logOutLink = document.querySelector(".logout-item")

const userData = JSON.parse(localStorage.getItem("userData"))
displayUserNavbar()
// * 
function displayUserNavbar() {
    if (userData) {
        console.log(userData);
        logInLink.style.display = "none";
        welcomeMessage.textContent = "welcome , " + userData.firstName
    }
    else {
        logOutLink.style.display = "none";
        cartLink.style.display = "none";
    }
}
