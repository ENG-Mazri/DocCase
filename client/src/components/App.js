import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUs from '../Routes/AboutUs';
import AddDoc from '../Routes/AddDoc';
import Contacts from '../Routes/Contacts';
import Doc from '../Routes/Doc';
import EditDoc from '../Routes/EditDoc';
import Home from '../Routes/Home';
import './App.css';
import Header from './header/Header';
import Tables from './table/Table';
import Cards from './projects/Cards';
import Page from './projects/page';
import Bg from './projects/bg';


const App = ()=>{

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<div><Header/><Bg/> <Home/></div>}/>
                <Route path='/projects' element = {<div><Header/> <Cards/></div>}/>
                <Route path='/page/:id' element = {<div><Header/><Page/></div>}/> 
                <Route path='/doc/:id' element = {<div><Header/> <Doc/></div>}/>
                <Route path='/addDocument' element= {<div><Header/> <AddDoc/></div>}/>
                {/* <Route path='/editDocument/:id' element= {<div><Header/> <EditDoc/></div>}/> */}
                <Route path='/contacts' element= {<div><Header/><Bg/> <Contacts/></div>}/>
                <Route path='/aboutus' element= {<div><Header/><Bg/> <AboutUs/></div>}/>
            </Routes>
            
        </Router>
    )
}

export default App;