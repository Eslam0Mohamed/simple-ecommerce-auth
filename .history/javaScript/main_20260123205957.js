// * Varibles
const products = document.querySelector(".products")

//* Api 
async function getProducts() {

    try {
        const response = await fetch("https://dummyjson.com/products")
        const data = await response.json()
        console.log(data);
    } catch (error) {
        console.log(error);
        alert("Eror In Calling Api ")
    }
}
getProducts()






// * Function



// * Events 