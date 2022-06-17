const Register = async (url, data, setLoggedIn)=>{

    try {
        const res = await fetch(url, {
          method: "POST",
          headers:{"Content-Type": "application/json"},
          body: JSON.stringify(data)
        })
        const jsonRes = await res.json();
        console.log(jsonRes.token)
        if(jsonRes.token){
          localStorage.setItem('token', jsonRes.token)
          setLoggedIn(true);
        }else{
          console.log('no Access token')
        }

      } catch (error) {
        console.log(error.message)
        alert(error.message)
    }

}
export default Register;