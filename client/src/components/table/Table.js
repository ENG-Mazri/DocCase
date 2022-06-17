import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import useFetch from '../../CustomHooks/useFetch';
import { useState, useEffect } from 'react';


const Tables = ()=>{
    // const {list} = useFetch('http://localhost:5000/docs');

    
    // console.log(list)
    
    const [ list, setList] = useState([]) 
    useEffect( ()=>{
        fetch('http://localhost:5000/docs')
        .then(res=>res.json())
        .then(json=> {
            const items = json.map(item =>{
                return item
                
            })
            setList(items)
        })
    },[])
    // DELETE DOC
    const deleteDoc = async (id)=>{
        try {
            const deleteDoc = await fetch(`http://localhost:5000/docs/${id}`,
            {method: "DELETE"}
            )
            setList(list.filter(doc=>doc.doc_id !==id))
            alert('Document deleted!')
        } catch (err) {
            console.error(err.message);
        }
    }
    
        
 
     

    return (
        <div className='tableContainer'>
            <Table >
                <thead className='table-dark'>
                    <tr>
                        <th>Doc ID</th>
                        <th>File's Name</th>
                        <th>Project's Name</th>
                        <th>Discipline</th>
                        <th>Author</th>
                        <th>Status</th>
                        <th>Comment</th>
                        <th>Added On</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    { list.map(doc=> {
                        return <tr>
                            <td>{doc.doc_id}</td>
                            {/* <Link to={`/doc/${doc.doc_id}`}><td>{doc.file_name}</td></Link> */}
                            <td>{doc.file_name}</td>
                            <td>{doc.project_name}</td>
                            <td>{doc.discipline}</td>
                            <td>{doc.author}</td>
                            <td>{doc.status}</td>
                            <td>{doc.comment}</td>
                            <td>{doc.addedon}</td>
                            <span><Link to={`/editDocument/${doc.doc_id}`}><button type="button" className="btn btn-warning btn-sm mt-1" >Edit</button></Link></span>
                            <span><button type="button" onClick={()=>deleteDoc(doc.doc_id)} className="btn btn-danger btn-sm mt-1">Delete</button></span>
                        </tr>
                        })
                    }
                </tbody>
            </Table>
        </div>
        
    )
}
export default Tables;