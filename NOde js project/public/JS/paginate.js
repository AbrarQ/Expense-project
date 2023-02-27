async function paginate(event) {
    
    let page = 1;
    const token = localStorage.getItem('token')

    const result = await axios.get(`http://3.215.181.196:4000/expense?page=${page}`, { headers: { "Authorization": token } })
    .then((response)=>response.data)
}