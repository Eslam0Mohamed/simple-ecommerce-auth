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
const menuBar = document.querySelector(".menu")
const mobileMenu = document.querySelector(".mobile-menu")
const loadingEffect = document.querySelector(".loading-effect")
const errorHandling = document.querySelector(".error-handling ")
const tryAgain = document.querySelector(".try-again")
const errorHandlingMsg = document.querySelector(".error-handling-msg")
let isOpened = false
let productsData
// let productsList = []
// let productAddedToCart = JSON.parse(localStorage.getItem("productsList")) || []
// console.log(productAddedToCart);



displayUserNavbar()
//* Api 
async function getProducts() {
    loadingEffect.style.display = "flex"

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
        showPopUpMessage(error)
    }
    loadingEffect.style.display = "none"
}
async function addToCart(index) {
    let cartId = JSON.parse(localStorage.getItem("cartId"))
    let productList = JSON.parse(localStorage.getItem("cart")) || []
    let productAdded = productsData.products[index]
    let productIsFound = productList.find((product) => product.id == productAdded.id)
    if (productIsFound) {
        productIsFound.quantity++
    }
    else {
        productList.push({ id: productAdded.id, quantity: 1 })
    }
    if (!cartId) {
        console.log("case  we have not cart id");
        try {
            const response = await fetch('https://dummyjson.com/carts/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: userData.id,
                    products: productList
                })
            })
            console.log(response);
            let data = await response.json()
            console.log(data.products);

            localStorage.setItem("cart", JSON.stringify(data.products))
            localStorage.setItem("cartId", JSON.stringify(data.id))
            modelMessage.textContent = "Your Product Added To Cart"
            model.style.transform = "translateX(0)"
            setTimeout(() => {
                model.style.transform = "translateX(130%)"
            }, 2000)

        } catch (error) {
            console.log(error);
            // alert("error from server")
            showPopUpMessage(error)
        }
    }
    else {
        console.log("case 2 we have cart id");
        try {
            const response = await fetch(`https://dummyjson.com/carts/${1}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    // userId:userData.id,
                    merge: true,
                    products: productList
                })
            })
            console.log(response);
            let data = await response.json()
            console.log(data);
            localStorage.setItem("cart", JSON.stringify(data.products))
            modelMessage.textContent = "Your Product Added To Cart"
            model.style.transform = "translateX(0)"
            setTimeout(() => {
                model.style.transform = "translateX(120%)"
            }, 2000)

        }
        catch (error) {
            showPopUpMessage("error from server")
        }
    }
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

// & Complete From Here
function showPopUpMessage(message) {
    errorHandling.style.display = "flex";
    errorHandlingMsg.innerHTML = message;
}
function closePopUpMessage() {
    errorHandling.style.display = "none";
}
// * Events 

let limit = 12
let skip = 0

next.addEventListener("click", async () => {
    previous.style.backgroundColor = "#fff"
    previous.style.opacity = "1"
    if (skip == 192) {
        next.style.backgroundColor = "#ddd"
        next.style.opacity = "0.8"
        showPopUpMessage("Products Not Found Click Previous To see Products")
        return 0
    }

    else {
        next.style.backgroundColor = "#fff"
        next.style.opacity = "1"
        loadingEffect.style.display = "flex"
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
            showPopUpMessage(error)
        }
        loadingEffect.style.display = "none"
    }
})


 previous.addEventListener("click", async () => {
    if (skip <= 0) {
        skip = 0
        previous.style.backgroundColor = "#ddd"
        previous.style.opacity = "0.8"
        showPopUpMessage("Products Not Found , Click Next to To see Products ")
        return 0
    }
    else {
        next.style.backgroundColor = "#fff"
        next.style.opacity = "1"
        loadingEffect.style.display = "flex"
        skip = skip - limit
        try {
            const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
            if (!response.ok) {
                throw Error("Error From Server")
            }
            const { products } = await response.json()
            displaydProducts(products)
        } catch (error) {
            console.log(error);
            showPopUpMessage(error)
        }
        loadingEffect.style.display = "none"
    
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