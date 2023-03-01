/**
 * Functions:( Passwords resetting)
 * submitPass - submits new pass  
 * resetPass - makes a request to change the password
 */ 


async function submitPass(event) {
   event.preventDefault();
   //    const abc = require('axios');

   // const axios = abc.create({
   //    baseURL: 'http://54.90.2.175:4000'
   //  });


   try {

      const newpass = document.getElementById("pass").value;
      console.log(newpass)



      const path = window.location.pathname;
      const fileName = path.split('/').pop();
      console.log(fileName)

      const passObj = { newpass, fileName }
      console.log(passObj)



      await axios.get(`http://54.90.2.175:4000/password/updatepassword/${fileName}`, passObj)

         .then(response => {
            document.getElementById("result").innerHTML = response.data.message;
            document.getElementById("pass").value;
         })
         .catch(err => document.getElementById("result").innerHTML = err.message)


   } catch (err) { console.log(err) }

}

async function resetPass(event) {
   event.preventDefault();

   const emailid = document.getElementById("eid").value;

   const resetObj = { emailid }

   await axios.post('http://54.90.2.175:4000/password/forgotpassword', resetObj)
       .then((response) => {
           // setNewPass(response.data.uuid)
           document.getElementById("result").innerHTML = response.data.message;
           return response.data
       })
       .catch(err => document.getElementById("result").innerHTML = err.message)
   document.getElementById("eid").value = "";
};