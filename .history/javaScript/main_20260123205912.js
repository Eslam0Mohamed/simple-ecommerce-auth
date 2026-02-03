// * Varibles
const products = document.querySelector(".products")

//* Api 
function getProducts(){

    try {
        const response = fetch("https://dummyjson.com/products")
        const data = response.json()   
        console.log(data);
    } catch (error) {
        console.log(error);
        alert("Eror In Calling Api ")
        
    }
 
}







// * Function 



// * Events 