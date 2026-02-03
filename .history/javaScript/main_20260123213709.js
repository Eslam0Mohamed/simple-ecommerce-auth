// * Varibles
const products = document.querySelector(".products")

//* Api 
async function getProducts() {

    try {
        const response = await fetch("https://dummyjson.com/products")
        //console.log(response);                   // display response
        if (!response.ok) {
            throw Error("Error From Server")
        }
        const { products } = await response.json()
        console.log(products);                   // display products
        displaydProducts(products)
    } catch (error) {
        console.log(error);                       // display errors
        // alert("Eror In Calling Api ")
    }
}
getProducts()


function displaydProducts(products) {
    let productsContainer = ""
    for (var product of products) {
        productsContainer = `
                            <div class="product-box">
                            <img src="${product}" alt="product image" class="product-image">
                        <div class="text-container">
                            <h3 class="proudct-name">${product.title}</h3>
                            <span class="product-price">${product.price}</span>
                            <button class="add-to-cart-button">Add To Cart</button>
                        </div>
                    </div>
        
        `

    }
}


// * Function



// * Events 