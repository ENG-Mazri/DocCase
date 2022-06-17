import { Button,Container, Form, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../App.css'
import Modal from 'react-bootstrap/Modal';
import Register from '../Auth/Register';
import LogIn from '../Auth/LogIn';

const Header = ()=>{
  /*Modal states*/
  const [loggedIn, setLoggedIn] = useState(false)
  const [show, setShow] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formBtn, setFormBtn] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /*Authentication*/
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = {email,password}
  const register = async()=>{
    Register('http://localhost:5000/register', user, setLoggedIn)
  }
  const logIn = async()=>{
    LogIn('http://localhost:5000/login', user, setLoggedIn)
  }
  const signOut = async()=>{
    localStorage.removeItem('token');
    setLoggedIn(false)
  }
  // Redirection
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/`; 
    navigate(path);
  }

  useEffect(()=>{
    checkAuth()
  },[])

  const checkAuth = async ()=>{
    const token = localStorage.getItem('token')
    const res = await fetch('http://localhost:5000/headerAuth', { method: "POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify({token})
    })
      const resJson = await res.json()
      if(resJson.decoded){
        setLoggedIn(true)
      }
      console.log("Header client : ", resJson)
  }


  return (
    <div>
      <Navbar bg="light" expand="lg" className='navbar'>
        <Container fluid>
        <Link to='/'><Navbar.Brand href="#" className='ms-4'>DocCase</Navbar.Brand></Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Link to='/'><Nav.Link href="#action1" className='headerItem' >Home</Nav.Link></Link>
              
              {loggedIn 
              ? <div><Link to='/Projects'><Nav.Link href="/Projects" className='headerItem'>Projects</Nav.Link></Link></div>
              :''}
              <Link to='/aboutus'><Nav.Link href="/Projects" className='headerItem'>About us</Nav.Link></Link>
              {/* <NavDropdown title="Refrences" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">API</NavDropdown.Item>
                <NavDropdown.Divider />
                <Link to='/aboutus'><NavDropdown.Item href="/aboutus">About this app</NavDropdown.Item></Link>
              </NavDropdown> */}
              <Link to='/contacts'><Nav.Link href="/contacts" className='headerItem'>Contacts</Nav.Link></Link>
            </Nav>
            <Form className="d-flex">
              {/* <FormControl
                type="search"
                placeholder="Document's name..."
                className="me-2 searchBar"
                aria-label="Search"
                
              /> */}
              {/* <input type='text' onChange={changed} value={newValue}></input>
              <div className='searchResults'>{filteredList.map(doc=> {
                      return <p key={doc.doc_id}>{doc.file_name}</p>
                      })}</div> */}
              
              {!loggedIn 
              ? <div>
                <Button variant="outline-dark" className='ms-2 signIn' onClick={()=>{handleShow() ; setFormTitle('Sign in'); setFormBtn('Register')}}>Sign In</Button>
                <Button variant="outline-dark" className='ms-2 signUp' onClick={()=>{handleShow() ; setFormTitle('Sign Up'); setFormBtn('Log in')}}>Sign Up</Button></div>
              : <div>
                
                <Link to='/addDocument' ><Button variant="outline-success" className='ms-2'>Add page</Button></Link>
                <Button variant="outline-dark" className='ms-2' onClick={()=>{signOut() ; routeChange()}}>Sign Out</Button>
              </div>}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal */}
  

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{formTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="snail@kale.com"
                autoFocus
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Enter more than 6 characters'/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=> {formTitle === 'Sign in'? register():logIn(); handleClose()}}>
            {formBtn}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Header;