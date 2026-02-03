// * Varibles
const products = document.querySelector(".products")

//* Api 
async function getProducts() {

    try {
        const response = await fetch("https://dummyjson.com/products")
        console.log(response); // display response
        if (!response.ok) {
            throw Error("Error From Server")
        }
        const {products} = await response.json()
        console.log(products);// display products
        displaydProducts(products)
    } catch (error) {
        console.log(error);// display error
        // alert("Eror In Calling Api ")
    }
}
getProducts()


function displaydProducts(products){
    let productsContainer = ""
    for (var product of products) {
        
    }

}



// * Function



// * Events 