// * Varibles
const products = document.querySelector(".products")

//* Api 
async function getProducts() {

    try {
        const response = await fetch("https://dummyjson.com/products")
        console.log(response);
        if (!response.ok) {
            throw Error("Status Error")
        }
        const data = await response.json()
        console.log(data);
    } catch (error) {
        console.log();
        alert("Eror In Calling Api ")
    }
}
getProducts()






// * Function



// * Events 