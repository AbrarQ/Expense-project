

async function leaderboard(event) {
    
    
const token = localStorage.getItem('token')
document.getElementById("listoftop").innerHTML=""
    if(token!=null){
        document.getElementById("puser").innerHTML = ""
        document.getElementById("ldr").innerHTML = "<label style='font-weight: 800;'>Leader Board</label>";

    const leaderArray = await axios.get('http://127.0.0.1:4000/premium/leaderboard',{ headers: { "Authorization": token } }).then(response => {  localStorage.setItem("ispremium", response.data.token); return response.data;});
  
    if(leaderArray!=null){

    for (let i = 0; i < leaderArray.length; i++) {
        const parEle = document.getElementById("listoftop");
        

        const chilEle = document.createElement("li");

        chilEle.innerText = 'Name : ' + `${leaderArray[i].name}` +' - '+ ' Total Expenses : ' + `${leaderArray[i].totalexp}`;

        parEle.appendChild(chilEle);
}
    }} else {
        document.getElementById("puser").innerHTML = "You are not a premium user"

     }}

async function premiumcheck(){
    const premiumcheck = localStorage.getItem('token')

    await axios.get()

}