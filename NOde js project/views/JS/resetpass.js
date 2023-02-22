
async function resetPass(event) {
    event.preventDefault();
   
    
  
        const emailid = document.getElementById("eid").value;
       

        // console.log(amount);
        // console.log(description);
        // console.log(category);


        const resetObj = {
            emailid
        }

        // const token = localStorage.getItem('token')
        
        const status = await axios.post('http://127.0.0.1:4000/password/forgotpassword',resetObj)
        .then( document.getElementById("result").innerHTML="A link has been sent to the e-mail to reset the password").catch(err=>console.log(err))
        
        
    

        

         

        document.getElementById("eid").value = "";
     

   
};