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
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data.message);
                    const para = document.getElementById("result");
                    para.innerHTML = '<p style = "color:green"> User Created Successfully</p>'
                  
                } 
                
            })
            .catch( error => {
                if (error.response.status === 401) {
                    console.log(error);
                    const para = document.getElementById("result");
                    para.innerHTML = ' <p style = "color:orange">UserName Already in use</p>'
                    
                }})


        document.getElementById("uname").value = "";
        document.getElementById("pnumber").value = "";
        document.getElementById("eid").value = "";
        document.getElementById("pswrd").value = "";
    }
    catch (e) {
        console.log(e)
    }
    // Getting the value in string format from the user


};
