// import { post } from 'axios';


async function submitPass(event) {
   event.preventDefault();
   //    const abc = require('axios');

   // const axios = abc.create({
   //    baseURL: 'http://3.215.181.196:4000'
   //  });


   try {

      const newpass = document.getElementById("pass").value;
      // console.log(newpass)



      const path = window.location.pathname;
      const fileName = path.split('/').pop();
      // console.log(fileName)

      const passObj = { newpass, fileName }
      // console.log(passObj)



      await axios.post(`http://3.215.181.196:4000/password/resetpassword/${fileName}`, passObj)
         .then(response => {
            document.getElementById("result").innerHTML = response.data.message;
            document.getElementById("pass").value;
         })
         .catch(err => document.getElementById("result").innerHTML = err.message)


   } catch (err) { console.log(err) }


}