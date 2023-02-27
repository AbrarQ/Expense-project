async function download(event) {

   try{
    
    const token = localStorage.getItem('token')
    console.log("consolelog wala",token)
    const expense = await axios.get('http://3.215.181.196:4000/premium/download',{ headers: { "Authorization": token } })
    .then(response => { 
      localStorage.setItem("ispremium", response.data.token)
      if (response.status === 200){
         var a = document.createElement("a");
         a.href = response.data.fileurl;
         a.download = 'Myexpenses.csv'
         a.click();

      } else {
         throw new Error (response.data.err)
      }
    })
    

    
   }catch(err){
    console.log(err)
   }
   
}


async function oldfiles(event) {

   try{
      const token = localStorage.getItem('token')
      if(token!=null){  
   
   //  console.log("consolelog wala",token)
    const expense = await axios.get('http://3.215.181.196:4000/premium/downloadlist',{ headers: { "Authorization": token } })
    .then(response => { 
      localStorage.setItem("ispremium", response.data.token);
      return response.data.list
   })
   //  console.log(expense)
   
    document.getElementById("url").innerHTML = "<label style='font-weight: 800;'>Previous Downloads</label>";
 
    for (let i = 0; i < expense.length; i++) {
      document.getElementById("listofurls").innerHTML +=`<li>${expense[i].createdAt} - <a href=${expense[i].url}> <button> Download</button></a></li>`

}
} else {
   console.log("You are not a premium user")
}



   }catch(e){
   console.log(e)
} }
    
   
   
