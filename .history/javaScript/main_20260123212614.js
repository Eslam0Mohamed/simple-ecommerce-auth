// * Varibles
const products = document.querySelector(".products")

//* Api 
async function getProducts() {

    try {
        const response = await fetch("https://dummyjson.com/proucts")
        console.log(response);
        if (!response.ok) {
            throw Error("Error From Server")
        }
        const data = await response.json()
        console.log(data);
    } catch (error) {
        console.log(error);
        // alert("Eror In Calling Api ")
    }
}
getProducts()


function displayProducts(products){
    let productsContainer = ""
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        
    }

}



// * Function



// * Events 