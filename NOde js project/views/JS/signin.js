async function loguser(event) {
    event.preventDefault();
    //using try and catch block to catch the errors
    try {
        const userName = document.getElementById("uname").value;
        // const pnumberdata1 = document.getElementById("pnumber").value;
        // const emaildata1 = document.getElementById("eid").value;
        const passwrd = document.getElementById("pswrd").value;
        //Storing them into a object format
        const obj = {
            userName,
            passwrd
        }
        console.log(obj);

        // sending a post request and passing object to the server

        const allData = await axios.get(`http://127.0.0.1:4000/login/${obj.userName}/${obj.passwrd}`)
            .then(res => {


                if (res.status === 200) {
                    console.log(res.data.token);
                  
                    alert(res.data.message)

                    localStorage.setItem('token', res.data.token)
                    // console.log(200);
                    // const para = document.getElementById("result");
                    // para.innerHTML = ' <p style = "color:green">Authentication Successful</p>'

                        window.location.href = "./expenseHome.html"
                }
                
                return res.data

            }).catch(error => {
                if (error.response.status === 401) {
                    console.log(error);
                    const para = document.getElementById("result");
                    para.innerHTML = ' <p style = "color:red">Error :- Wrong Password</p>'

                } else if (error.response.status === 404) {
                    console.log(error);
                    const para = document.getElementById("result");
                    para.innerHTML = ' <p style = "color:red">Error :- User not found</p>'

                }
            })



            

    } catch (e) {

        console.log(e);
    }
}

