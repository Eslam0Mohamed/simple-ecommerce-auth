// * Varibles
const userName = document.getElementById("user-name")
const userPassword = document.getElementById("user-password")



// * Api
function logIn(){
 try {
    const response = fetch(`https://dummyjson.com/auth/login`,{
        method:"POST",
        headers:{"content-type"}
    })
 } catch (error) {
    
 }
}
// * Function
// * Events