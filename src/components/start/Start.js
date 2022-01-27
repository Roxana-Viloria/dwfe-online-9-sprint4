import './start.css';
import '../../App.css';

import { isLogged } from '../../firebase';

// imgs//
import Logging from '../logging/Logging';
import Welcome from '../welcome/Welcome';

function Start() { 
    
  return (
    <>
        <div>
          {isLogged() ? <Welcome/> : <Logging/>}
        </div>
        
    </>
  );
}

export default Start;