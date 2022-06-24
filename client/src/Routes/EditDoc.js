import { useParams} from "react-router-dom";
import { useEffect, useState } from 'react';
import "./Routes.css"

const EditDoc = () => {
    const {id} = useParams();
    const [fileName, setFileName] = useState('');
    const [projectName, setProjectName] = useState('');
    const [discipline, setDiscipline] = useState('');
    const [author, setAuthor] = useState('');
    const [status, setStatus] = useState('');
    const [comment, setComment] = useState('');

    const changedFile = (event)=>{
        setFileName(event.target.value)  
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
    const changedComment = (event)=>{
        setComment(event.target.value)
    }



    const data = {
        "file_name": fileName,
        "project_name": projectName,
        "discipline": discipline,
        "author": author,
        "status": status,
        "comment": comment,
    }
    console.log(data)
    const EditDoc = async ()=>{
        const res = await fetch(`/docs/${id}`, {method: 'PUT', 
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify(data)
        });
    }



    return ( 
        <div className="docContainer">
            <h1>Add new Document</h1>
            <label for="exampleFormControlInput1" class="form-label">Document's name</label>
            <input id="exampleFormControlInput1" className="form-control" type="text" onChange={changedFile} value={fileName} placeholder="Default input" aria-label="default input example"></input>
            <label for="exampleFormControlInput2" class="form-label">Project's name</label>
            <input id="exampleFormControlInput2" className="form-control" type="text" onChange={changedProject} value={projectName} placeholder="Default input" aria-label="default input example"></input>
            <label for="exampleFormControlInput3" class="form-label">Discipline</label>
            <input id="exampleFormControlInput3" className="form-control" type="text" onChange={changedDiscipline} value={discipline} placeholder="Default input" aria-label="default input example"></input>
            <label for="exampleFormControlInput4" class="form-label">Author</label>
            <input id="exampleFormControlInput4" className="form-control" type="text" onChange={changedAuthor} value={author} placeholder="Default input" aria-label="default input example"></input>
            <label for="exampleFormControlInput5" class="form-label">Status</label>
            <input id="exampleFormControlInput5" className="form-control" type="text" onChange={changedStatus} value={status} placeholder="Default input" aria-label="default input example"></input>
            <label for="exampleFormControlTextarea1" class="form-label">Comment</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" onChange={changedComment} value={comment} rows="3"></textarea>
            <button type="button" onClick={EditDoc}class="mt-4 btn btn-light">Add Document</button>
        </div>
    );
}
 
export default EditDoc;