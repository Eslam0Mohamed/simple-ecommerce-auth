// * Varibles
const userName = document.getElementById("user-name")
const userPassword = document.getElementById("user-password")
const 


// * Api
function logIn(){
 try {
    const response = fetch(`https://dummyjson.com/auth/login`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        bode:JSON.stringify({
            username:userName.valu,
            password:userPassword.value
        }),
        credentials:"include"
    })
    if (!response.ok) {
        throw Error("Error From Server")
    }
    const data = response.JSON()
    console.log(data);
    
 } catch (error) {
    console.log(error);
    
    // alert(error) 
 }
}
// * Function
// * Events