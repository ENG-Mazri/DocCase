import { useEffect, useState } from "react"
// import { storage } from "../components/header/firebaseConfig";
import {ref, listAll, getDownloadURL} from "firebase/storage"
import '../App.css'
import { storage } from "../header/firebaseConfig"
import { Link, useNavigate } from "react-router-dom"

const Cards = () => {
    //const {id} = useParams();
    const [ list, setList] = useState([])
    const [ fire, setFire] = useState([])
    const [ imgUrl, setImgUrl] = useState('')
    const [ urls, setUrls] = useState({})
    const [ obj, setObj] = useState({})

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
        const res = await fetch('http://localhost:5000/docs', {Method: 'GET', headers: {token} });
        const docs = await res.json();
        if(docs.isValidToken == false ){
            routeChange()
        }

        // const editedDocs = docs.map(e=>{
        //     e.testKey = "hello from testing key"
        // })

        setList(docs)
    }
    const firebaseData = ()=>{
        return new Promise(async (resolve, reject) => {
            const lst = []
            const objz = {}
            const listRef = ref(storage);
            const all = await listAll(listRef);
            const refs = all.prefixes;
            const folders = refs.map(async(e) => {
                const listRef = ref(storage , e.name + '/file');
                const img = await getDownloadURL(listRef);
                //return e.name
                const dict = {} 
                const name = e.name
                objz[name] = img 
                //objz.push(dict)
                setFire(img)
                lst.push(img)
                return img
            })
            //resolve(lst)
            resolve(objz)
            //const urls = await getDownloadURL(e);
            

        })
    }

    const func = async()=>{
        const res = await firebaseData()
        //console.log("here: ",res)
        setUrls(res)
    }
  

    const getImage = (folders)=>{
        //const url = '5cffdb1e-06b0-4471-9ce2-7b06a7d452b2/file';
        const url = folders.map(async (e)=>{
            const imgUrls = [];
            const listRef = ref(storage , e+'/file');
            const img = await getDownloadURL(listRef)

            return img
        })
        setImgUrl(url)
        // for(let i in folders){
        //     imgUrls.push(folders[i])
        // }
        
    } 
    
    //console.log('************************************************************')
    //console.log(imgUrl)
    //console.log(fire)
    //console.log('working',urls)
    


    return ( 
    <div className="cardContainer">
        { list.map( doc => {
            return  <div className="card" key={doc.doc_id}>
                        {/* <img src={require(`${doc.image}`)} alt="#"></img> */}
                        {/* <p>{doc.description}</p> */}
                        {/* {Object.keys(urls).length == 4 ? <img src={urls[doc.uuid]} alt="#"></img>:<img src={require('./default-image.jpg')} alt="#"></img>} */}
                        <img src={urls[doc.uuid]} alt="#"></img>
                        <Link to={`/Page/${doc.doc_id}`}><h5>{doc.docname}</h5></Link>
                        {/* <p>{urls[doc.uuid]}</p> */}
                        <p>{`Architects: ${doc.author}`}</p>
                    </div>}
        )}
    </div>
     );
}
 
export default Cards;