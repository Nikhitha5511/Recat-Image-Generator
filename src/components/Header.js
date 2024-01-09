import react from 'react';
import logo from './logo.png';
const Header=()=>{
    return(
        <div className='Header'>
            <img src={logo} alt='logo'></img>
            <div className='text'>
            <p>Home</p>
            <p>Text to Image</p>
            </div>
        </div>
    )
}

export default Header;