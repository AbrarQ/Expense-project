async function saveuser(event) {
    event.preventDefault();
    //using try and catch block to catch the errors
    try {
        const userdata = document.getElementById("uname").value;
        const pnumberdata = document.getElementById("pnumber").value;
        const emaildata = document.getElementById("eid").value;
        const passwordData = document.getElementById("pswrd").value;
        //Storing them into a object format
        const obj = {
            userdata,
            pnumberdata,
            emaildata,
            passwordData
        }
        console.log(obj);
       
        // sending a post request and passing object to the server
       await axios.post("http://127.0.0.1:4000/save-users", obj)
            .then( (response) => {
                // Display text if the user is created Succesfully
                document.getElementById("result").innerHTML =  response.data.message;
                document.getElementById("uname").value = ""; 
                document.getElementById("pnumber").value = "";
                document.getElementById("eid").value = "";
                document.getElementById("pswrd").value = "";
            })
            .catch(  (error) => {
                // Display error if the user is not created with the cause
                document.getElementById("result").innerHTML=  error.message })


       
    }
    catch (e) {
        console.log(e)
    }
   


};
