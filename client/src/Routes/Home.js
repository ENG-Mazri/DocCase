import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxesPacking } from '@fortawesome/free-solid-svg-icons'
import "./Routes.css"
function Home() {
   
    return (<>
      <div className="main">
          <FontAwesomeIcon className='icon' icon={faBoxesPacking} size="6x"/>
          <h1>Welcome to DocCase</h1>
          <p>Share your projects</p>
      </div>
    </>
    );
}

export default Home;