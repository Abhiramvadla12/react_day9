import './footer.css'
import footer from "../data/footer.js"
const Footer = ()=>{
   
   
    return (
        <>
        <div className="footer" >
            <p> {footer.copyrght}</p>
            <p>{footer.privacy}</p>
            <p>{footer.terms}</p>
            <p>{footer.Contact}</p>
            <p>{footer.phone}</p>
            
        </div>
        </>
    )
}
export default Footer;