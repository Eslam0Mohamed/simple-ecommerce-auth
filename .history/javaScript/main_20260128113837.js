// * Varibles
const products = document.querySelector(".products")
const previous = document.querySelector(".previous")
const next = document.querySelector(".next")
const userData = JSON.parse(localStorage.getItem("userData"))


//* Api 
async function getProducts() {

    try {
        const response = await fetch("https://dummyjson.com/products?limit="+12+"&skip="+0)
        //console.log(response);                   // display response
        if (!response.ok) {
            throw Error("Error From Server")
        }
        const { products } = await response.json()
       // console.log(products);                   // display products
        displaydProducts(products)
    } catch (error) {
        console.log(error);                       // display errors
        // alert("Eror In Calling Api ")
    }
}
getProducts()

// * Function
function displaydProducts(productsData) {
    let productsContainer = ""
    for (var product of productsData) {
        productsContainer += `
                            <div class="product-box">
                            <img src="${product.images[0]}" alt="product image" class="product-image">
                        <div class="text-container">
                            <h3 class="proudct-name">${product.title}</h3>
                            <span class="product-price">${product.price}</span>
                            <button class="add-to-cart-button">Add To Cart</button>
                        </div>
                    </div>
        
        `
    }
    // console.log(productsContainer);
    
  products.innerHTML = productsContainer
  
}

function 

// * Events 

let limit = 12 
let skip = 0

next.addEventListener("click",async()=>{
    skip = skip + limit
    try {
        const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
        if (!response.ok) {
            throw Error("Error From Server")
        }
        const {products} =  await response.json()
        console.log(skip);
        
        displaydProducts(products)
        
    } catch (error) {
        console.log(error);
        // alert(error)
    }

})

previous.addEventListener("click",async()=>{
    if (skip <= 0) {
        skip = 0
        console.log("No Products Found")
        console.log(skip);
        return 0
    }
    else{
        skip = skip - limit
        try {
            const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
            if (!response.ok) {
                throw Error("Error From Server")
            }
            const {products} =  await response.json()
            console.log(skip);
            
            displaydProducts(products)
            
        } catch (error) {
            console.log(error);
            // alert(error)
        }
    }

})