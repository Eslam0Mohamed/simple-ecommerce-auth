// * Varibles
const userName = document.getElementById("user-name")
const userPassword = document.getElementById("user-password")



// * Api
function logIn(){
 try {
    const response = fetch(`https://dummyjson.com/auth/login`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        bode:JSON.stringify({
            userName:"",
            password:
        }),
        credentials:"include"
    })
    if (response.ok) {
        
    }
 } catch (error) {
    
 }
}
// * Function
// * Events