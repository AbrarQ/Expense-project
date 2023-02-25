

document.getElementById("premium").onclick = async function (e) {
    // So inorder to know which user is creating we use token saved
    const token = localStorage.getItem('token')
    console.log(token)
    const response = await axios.get('http://127.0.0.1:4000/login/premium', { headers: { "Authorization": token } })
    console.log(response)

    var options = {
        
        "key": response.data.key_id,
        "order_id": response.data.orderid.id,
        "handler": async function (response) {
            console.log(response.razorpay_payment_id)
            console.log("before axios")
            await axios.post('http://127.0.0.1:4000/login/updatetransactionstatus', {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
                status : "Success"
            }, { headers: { "Authorization": token } }).then(res => {
                if (res.status === 201) {

                    alert(res.data.message)

                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("premium", "yes");
                    
                }
            })

            document.getElementById("premium").remove();
            document.getElementById("puser").innerHTML = "You are a premium user now"

            


        }
    }
    const rzrpay = new Razorpay(options);
    rzrpay.open();
    e.preventDefault;

    rzrpay.on('payment.failed',async  (response) => {
        const reason = response.error.reason

        const errobj={ reason}

        await axios.post('http://127.0.0.1:4000/login/updatetransactionstatus',{ status : "Failed"}, { headers: { "Authorization": token } }).then(res => {
                if (res.status === 402) {

                    alert(res.data.message)

                    localStorage.setItem("ispremium", res.data.token)
                    localStorage.setItem("premium", "No");
                    
                }
            })
        alert("Something went wrong")
    })
}
