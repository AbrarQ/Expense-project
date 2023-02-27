// async function download(event){

//     event.preventDefault();

//     const token = localStorage.getItem('token')

//     if(token!=null){
//         document.getElementById("puser").innerHTML = ""
//         document.getElementById("ldr").innerHTML = "<label style='font-weight: 800;'>Leader Board</label>";

//     const leaderArray = await axios.get('http://3.215.181.196:4000/premium/leaderboard').then(response => response.data);
    
    
//     for (let i = 0; i < leaderArray.length; i++) {


    
//         const parEle = document.getElementById("listoftop");

//         const chilEle = document.createElement("li");

//         chilEle.innerText = 'Name : ' + `${leaderArray[i].name}` +' - '+ ' Total Expenses : ' + `${leaderArray[i].totalexp}`;

//         parEle.appendChild(chilEle);
// }
    
//      } else {
//         document.getElementById("puser").innerHTML = "You are not a premium user"

//      }

// }

