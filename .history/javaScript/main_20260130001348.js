// * Varibles
const products = document.querySelector(".products")
const previous = document.querySelector(".previous")
const next = document.querySelector(".next")
const homeLink = document.querySelector(".home-item")
const cartLink = document.querySelector(".cart-item")
const logInLink = document.querySelector(".login-item")
const logOutLink = document.querySelector(".logout-item")
const welcomeMessage = document.querySelector(".welcome-message")
const userData = JSON.parse(localStorage.getItem("userData"))
const model = document.querySelector(".model")
const modelMessage = document.querySelector(".model-message")
let productsData
displayUserNavbar()

//* Api 
async function getProducts() {

    try {
        const response = await fetch("https://dummyjson.com/products?limit=" + 12 + "&skip=" + 0)
        //console.log(response);                   // display response
        if (!response.ok) {
            throw Error("Error From Server")
        }
         productsData = await response.json()
        // console.log(products);                   // display products
        displaydProducts(productsData.products)
    } catch (error) {
        console.log(error);                       // display errors
        // & alert("Eror In Calling Api ") handle error message
    }
}

function addToCart(index){

try

}
getProducts()

// * Function
function displaydProducts(productsData) {
    let productsContainer = ""
    for (var product in productsData) {
        productsContainer += `
                            <div class="product-box">
                            <img src="${productsData[product].images[0]}" alt="product image" class="product-image">
                        <div class="text-container">
                            <h3 class="proudct-name">${productsData[product].title}</h3>
                            <span class="product-price">${productsData[product].price}</span>
                            <button class="add-to-cart-button" onclick="addToCart(${product})">Add To Cart</button>
                        </div>
                    </div>
        
        `
    }
    // console.log(productsContainer);

    products.innerHTML = productsContainer

}

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

// * Events 

let limit = 12
let skip = 0

next.addEventListener("click", async () => {
    skip = skip + limit
    try {
        const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
        if (!response.ok) {
            throw Error("Error From Server")
        }
        const { products } = await response.json()
        console.log(skip);

        displaydProducts(products)

    } catch (error) {
        console.log(error);
        // alert(error)
    }

})

previous.addEventListener("click", async () => {
    if (skip <= 0) {
        skip = 0
        console.log("No Products Found")
        console.log(skip);
        return 0
    }
    else {
        skip = skip - limit
        try {
            const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
            if (!response.ok) {
                throw Error("Error From Server")
            }
            const { products } = await response.json()
            console.log(skip);

            displaydProducts(products)

        } catch (error) {
            console.log(error);
            // alert(error)
        }
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