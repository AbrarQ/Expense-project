


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

    const status = await axios.post('http://3.215.181.196:4000/login/add-expense', expObj, { headers: { "Authorization": token } })
        .then((response) => {  }).catch(err => console.log(err))




    // document.getElementById("listoftop").innerHTML = "";


  
    

    if(document.getElementById("listoftop").innerHTML!=null){
            leaderboard();
    }

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
                // console.log(id)
                // console.log(token)
                const user = await axios.delete(`http://3.215.181.196:4000/login/delete-expense/${obj.id}`, { headers: { "Authorization": token } })
                    .then((response) => { parentElement.removeChild(childElement); document.getElementById("puser").innerHTML += response.data.message + "<br>" })
                    .catch(err => document.getElementById("puser").innerHTML += err.message + "<br>");
                document.getElementById("listoftop").innerHTML = "";

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


        if (token!=null){
    
                    document.getElementById("premium").remove();
                    document.getElementById("puser").innerHTML = "You are a premium user"
               
        }

        const page = 1;
        getExpense(page);
        

    }
    catch (e) {
        console.log(e);
    }

})

async function getExpense(page) {

  
    const COUNT =localStorage.getItem("count")
    const PAGE = page;
  
   document.getElementById("listofexpenses").innerHTML="";
 
    const token = localStorage.getItem('token')
    const dbData = await axios.get(`http://3.215.181.196:4000/login/get-expense?page=${page}&count=${COUNT}`, { headers: { "Authorization": token } })
        .then(response => { sendToUi(response.data.rows); showPagination(response.data);console.log(response.data)  })
        .catch(err => console.log(err))

    return dbData;
}

async function sendToUi(obj) {
    
    if (obj.length == 0) {
        document.getElementById("puser").innerHTML += "No Transactions to show"
    }

    for (let i = 0; i < obj.length; i++) {
         returnItToUi(obj[i]);
        // console.log(dbData[i]);

    }

}



async function showPagination({
    currentpage,
    nextpage,
    previouspage,
    hasnextpage,
    haspreviouspage,
    lastpage
}) {
    const pagination = document.getElementById("pagination")
    
    pagination.innerHTML = ""
   
    if (haspreviouspage) {
      
        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = previouspage;
        prevBtn.addEventListener('click', async() =>{ await getExpense(previouspage)})
        pagination.appendChild(prevBtn)
        pagination.append(" ")
    }
    
    const currbtn = document.createElement('button');
    currbtn.innerHTML = `<h3>${currentpage}</h3>`
    currbtn.addEventListener('click', () =>{
        if(currentpage==lastpage){
            getExpense(1) }} )
    pagination.appendChild(currbtn)
    pagination.append(" ")
    

    if (hasnextpage) {
       
        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = nextpage;
        nextBtn.addEventListener('click', async () => { await getExpense(nextpage)})
        pagination.appendChild(nextBtn)

    }


}

function getter(){
    localStorage.setItem("count",document.getElementById("NumberofRecords").value)
    location.reload();
}