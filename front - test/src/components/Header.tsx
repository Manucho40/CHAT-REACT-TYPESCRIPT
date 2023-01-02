import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUser } from 'react-icons/fa';

const Header = () => {
 
  return (
    <div className='container'>
            <header className='header'>
      <div className='logo'>
        <Link to='/'>KaeChat</Link>
      </div>
      <ul className='menu'>
          
            <li className='login'>
              <Link to='/connexion'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li className='register'>
              <Link to='/'>
                <FaUser /> Register
              </Link>
            </li>
      </ul>
    </header>
    </div>
  )
}

export default Header;
