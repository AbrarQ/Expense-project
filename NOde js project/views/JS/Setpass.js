// import { post } from 'axios';


async function submitPass(event) {
   event.preventDefault();
//    const abc = require('axios');

// const axios = abc.create({
//    baseURL: 'http://127.0.0.1:4000'
//  });
   

 try{

    const newpass = document.getElementById("pass").value;
    console.log(newpass)
 
    

    const path = window.location.pathname;
    const fileName = path.split('/').pop();
    console.log(fileName)

    const passObj = {  newpass, fileName }
    console.log(passObj)



    await axios.post(`http://127.0.0.1:4000/password/resetpassword/${fileName}`, passObj).then(response =>document.getElementById("result").innerHTML = response.data.message ).catch(err => console.log(err))


 } catch(err){console.log(err)}




}