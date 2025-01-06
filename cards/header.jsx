import './header.css'
import {menu} from "../data/header_data"
const Header = ()=>{
   
   
    return (
        <>
        <div className="header" >
            <img src="../images/Art.jpeg" alt="image not found" id='img' />
                <div className="nav">
                    <ul>
                        <>
                            {/* <li>HOme</li>
                            <li>ABout</li>
                            <li>Services</li>
                            <li>Contact</li>
                            <li>login</li> */}
                            {menu.map((element, index) => (
                                    <li key={index}><a href={element.path}>{element.menuItem}</a></li>
                            ))}
                        </>
                        
                    </ul>
                </div>
            
        </div>
        </>
    )
}
export default Header;






