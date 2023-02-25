
async function saveExpense(event) {
    event.preventDefault();
   
    
        const amount = document.getElementById("expenseamount").value;
        const description = document.getElementById("expdescp").value;
        const category = document.getElementById("category").value;

        // console.log(amount);
        // console.log(description);
        // console.log(category);


        const expObj = {
            amount,
            description,
            category
        }

        const token = localStorage.getItem('token')
        
        const status = await axios.post('http://127.0.0.1:4000/login/add-expense', expObj, { headers: { "Authorization": token }})
        .then((response) => { returnItToUi(response.data)}).catch(err=>console.log(err))
        
        
    

        document.getElementById("listoftop").innerHTML="";

         leaderboard();

        document.getElementById("expenseamount").value = "";
        document.getElementById("expdescp").value = "";
        document.getElementById("category").value = "Select";


   
};








function returnItToUi(obj) {
    // console.log(obj)

    try {
        // getting the id of ul tag to create ne li tags under it
        const parentElement = document.getElementById("listofexpenses");
        // creatting a new li tag to store our data from obj
        const childElement = document.createElement("li");
        // using text content to display the data passed on from the obj
        childElement.textContent = obj.amount + ' - ' + obj.description + ' - ' + obj.category + ' - ';


        // giving attibutes to DELETE button
        const delbtn = document.createElement("input");
        delbtn.type = "button";
        delbtn.value = "Delete";
        delbtn.style = "margin-bottom: 5px;"



        // appending should be done the order we want them to be dispalyed 

        childElement.append('    -    ');
        childElement.append(delbtn);
        parentElement.appendChild(childElement);
        //  When clicked removes the data from local storage
        delbtn.onclick = async () => {


            try { //DELETES THE OBJ, WHERE ID IS GIVEN
                var id = `${obj.amount}`

                console.log(id);

                const token = localStorage.getItem('token')
                console.log(id)
                console.log(token)
                const user = await axios.delete(`http://127.0.0.1:4000/login/delete-expense/${obj.id}`, { headers: { "Authorization": token } })
                    .then((response)=>{parentElement.removeChild(childElement); document.getElementById("puser").innerHTML += response.data.message + "<br>"} )
                    .catch(err => document.getElementById("puser").innerHTML += err.message + "<br>");
                    document.getElementById("listoftop").innerHTML="";

                   await leaderboard();

            } catch (e) {
                console.log(e)
            }

        }

    } catch (e) {
        console.log(e);
    }





}



// // This Event listener helps us to load the data, we can even use 
// //Location.reload(), but DOM Content loaded happens prior to reload.




window.addEventListener("DOMContentLoaded", async () => {

    try {
          
        const token = localStorage.getItem('token')
        console.log(token)

        if (token != null) {
            const PremiumCheck = await axios.get('http://127.0.0.1:4000/login/check',  { headers: { "Authorization": token } })
                .then(response => {
                    if (response.status === 200) {
                        document.getElementById("premium").remove();
                        document.getElementById("puser").innerHTML += response.data.message + "<br>"
                    }
                })
        }



        const dbData = await axios.get('http://127.0.0.1:4000/login/get-expense', { headers: { "Authorization": token } })
        .then(response => { return (response.data) })
        .catch(err=> console.log(err))
        // console.log(dbData[0]);
        // console.log(dbData)
        if (dbData.length == 0) {
            document.getElementById("puser").innerHTML += "No Transactions to show"
        }

        for (let i = 0; i < dbData.length; i++) {
            returnItToUi(dbData[i]);
            // console.log(dbData[i]);

        }




    }
    catch (e) {
        console.log(e);
    }

})







