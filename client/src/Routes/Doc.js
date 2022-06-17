import { Link, useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from 'react';
import { storage } from "../components/header/firebaseConfig";
import {ref, uploadBytes} from "firebase/storage"
import {v4} from "uuid"; 
import "./Routes.css"

const Doc = () => {
    const {id} = useParams();
    const [docName, setDocName] = useState('');
    const [projectName, setProjectName] = useState('');
    const [discipline, setDiscipline] = useState('');
    const [author, setAuthor] = useState('');
    const [status, setStatus] = useState('');
    const [description, setDescription] = useState('');
    // const [imageName, setImageName] = useState('');
    // const [fileName, setFileName] = useState('');
    const [image, setImage] = useState(null)
    const [file, setFile] = useState(null)
    const [uuid, setUuid] = useState(null);

    const generateUuid = ()=>{
        if(!uuid){
            const _uuid = v4();
            setUuid(_uuid)
            return uuid;
        }
    }
    const upLoadToStorage = async (folder, file, fileName)=>{
        const fileRef = ref(storage, `${folder}/${fileName}`);
        await uploadBytes(fileRef, file).catch(err=> console.log(err.message))
    }

    const changedDoc = (event)=>{
        setDocName(event.target.value)  
    } 
    const changedProject = (event)=>{
        setProjectName(event.target.value)
    }
    const changedDiscipline = (event)=>{
        setDiscipline(event.target.value)
    }
    const changedAuthor = (event)=>{
        setAuthor(event.target.value)
    }
    const changedStatus = (event)=>{
        setStatus(event.target.value)
    }
    const changedDescription = (event)=>{
        setDescription(event.target.value)
    }
    const changedImage = (event)=>{
        if(!uuid){
            const _uuid = v4();
            setUuid(_uuid)
        }
        const _file = event.target.files[0];
        // const fileUuid = _file.name + uuid;
        // setImageName(fileUuid)
        setImage(_file)
    }
    const changedFile = (event)=>{
        if(!uuid){
            const _uuid = v4();
            setUuid(_uuid)
        }
        const _file = event.target.files[0];
        // const fileUuid = _file.name + uuid;
        // setFileName(fileUuid)
        setFile(_file)
    }
    


    const data = {
        "docName": docName,
        "projectName": projectName,
        "discipline": discipline,
        "author": author,
        "status": status,
        "description": description,
        "uuid": uuid
    }

    const addNewDoc = async ()=>{
        const res = await fetch('http://localhost:5000/docs', {method: 'POST', 
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify(data)
        });
        await upLoadToStorage(uuid, file, 'img')
        await upLoadToStorage(uuid, image, 'file')
        alert('Document added!');
        routeChange()
        console.log(uuid)
    }
      
    // Redirection
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = `/Projects`; 
      navigate(path);
    }



    return ( 
        <div className="docContainer">
            <h1>Add new Document</h1>
            <label htmlFor="exampleFormControlInput1" className="form-label">Document's name</label>
            <input id="exampleFormControlInput1" className="form-control" type="text" onChange={changedDoc} value={docName} placeholder="Default input" aria-label="default input example"></input>
            <label htmlFor="exampleFormControlInput2" className="form-label">Project's name</label>
            <input id="exampleFormControlInput2" className="form-control" type="text" onChange={changedProject} value={projectName} placeholder="Default input" aria-label="default input example"></input>
            <label htmlFor="exampleFormControlInput3" className="form-label">Discipline</label>
            <input id="exampleFormControlInput3" className="form-control" type="text" onChange={changedDiscipline} value={discipline} placeholder="Default input" aria-label="default input example"></input>
            <label htmlFor="exampleFormControlInput4" className="form-label">Author</label>
            <input id="exampleFormControlInput4" className="form-control" type="text" onChange={changedAuthor} value={author} placeholder="Default input" aria-label="default input example"></input>
            <label htmlFor="exampleFormControlInput5" className="form-label">Status</label>
            <input id="exampleFormControlInput5" className="form-control" type="text" onChange={changedStatus} value={status} placeholder="Default input" aria-label="default input example"></input>
            <label htmlFor="exampleFormControlInput4" className="form-label">Image</label>
            <input id="exampleFormControlInput4" className="form-control" type="file" onChange={changedImage} aria-label="default input example"></input>
            <label htmlFor="exampleFormControlInput4" className="form-label">File</label>
            <input id="exampleFormControlInput4" className="form-control" type="file" onChange={changedFile} aria-label="default input example"></input>
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" onChange={changedDescription} value={description} rows="3"></textarea>
            <button type="button" onClick={()=>{addNewDoc()}}className="mt-4 btn btn-light">Add Document</button>
        </div>
    );
}
 
export default Doc;