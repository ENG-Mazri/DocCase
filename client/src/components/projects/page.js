import { useEffect, useState } from "react"
import {ref, listAll, getDownloadURL} from "firebase/storage"
import '../App.css'
import { storage } from "../header/firebaseConfig"
import { useNavigate, useParams } from "react-router-dom"


const Page = () => {
    const {id} = useParams();

    const [ list, setList] = useState([])
    const [ fire, setFire] = useState([])
    const [ urls, setUrls] = useState({})


    let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = `/`; 
      navigate(path);
    }


    useEffect(()=>{
        postgresData()
        firebaseData()
            .then((res)=>{
                setUrls(res)
            })
    },[])

    const postgresData = async()=>{
        const token = localStorage.getItem('token')
        const res = await fetch(`http://localhost:5000/docs/${id}`, {Method: 'GET', headers: {token} });
        const docs = await res.json();
        if(docs.isValidToken == false ){
            routeChange()
        }
        setList(docs)
    }
    const firebaseData = ()=>{
        return new Promise(async (resolve, reject) => {
            const objz = {}
            const listRef = ref(storage);
            const all = await listAll(listRef);
            const refs = all.prefixes;
            refs.map(async(e) => {
                const listRef = ref(storage , e.name + '/file');
                const img = await getDownloadURL(listRef);
                const name = e.name
                objz[name] = img 
                setFire(img)
                return img
            })
            resolve(objz)

        })
    }

    //console.log(urls)
    return ( 
        <div className="page">  
            <div key={list.doc_id}>
                <h1>{list.docname}</h1>
                <img src={urls[list.uuid]} alt="#"></img>
                <ul>
                    <li>{`Architects: ${list.author}`}</li>
                    <li>{`Status: ${list.status}`}</li>
                </ul>
                <p><i>{list.description}</i></p>
            </div>
        </div>
    );
}
 
export default Page;