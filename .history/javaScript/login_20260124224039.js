// * Varibles
const userName = document.getElementById("user-name")
const userPassword = document.getElementById("user-password")
const loginButton = document.querySelector(".login-button")


// * Api
async function logIn(){
 try {
    const response = await fetch(`https://dummyjson.com/auth/login`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            username:userName.value,
            password:userPassword.value
        }),
        // credentials:"include"
    })
    console.log(response);
    
    if (!response.ok) {
        throw Error("Error From Server")
    }
    const data =await response.json()
    console.log(data);
    
 } catch (error) {
    console.log(error);
    
    // alert(error) 
 }
}
// * Function
// * Events

loginButton.addEventListener("click",function(event){
event.preventDefault()
console.log("login clicked");
logIn()

})
