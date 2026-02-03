// * Varibles
const products = document.querySelector(".products")
const previous = document.querySelector(".previous")
const next = document.querySelector(".next")


//* Api 
async function getProducts() {

    try {
        const response = await fetch("https://dummyjson.com/products?limit="+10+"&skip="+0)
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

// * Events 

let limit = 10 
let skip = 0

next.addEventListener("click",()=>{

})