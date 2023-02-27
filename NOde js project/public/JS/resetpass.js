

async function resetPass(event) {
    event.preventDefault();

    const emailid = document.getElementById("eid").value;

    const resetObj = { emailid }

    await axios.post('http://3.215.181.196:4000/password/forgotpassword', resetObj)
        .then((response) => {
            // setNewPass(response.data.uuid)
            document.getElementById("result").innerHTML = response.data.message;
            return response.data
        })
        .catch(err => document.getElementById("result").innerHTML = err.message)
    document.getElementById("eid").value = "";
};


// async function setNewPass(uuid){
    

//     await axios.get(`http://3.215.181.196:4000/password/forgotpassword/${uuid}`).then(response => console.log(response.data.message))


// }
