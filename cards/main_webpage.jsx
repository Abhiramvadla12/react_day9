import {cards} from "../data/main_data"
import './main_webpage.css'
const Main = ()=>{
   
   
    return (
        <>
        <div className="main" >
                {cards.map((element, index) => (
                    <>
                        <div className="anime_cards" key={index}>
                            <img src={element.image} alt="image not found" />
                            <p>Name: {element.name}</p>
                            <p>My rating: {element.myRating}</p>
                            <p>Genre: {element.genre}</p>
                            <p>Suggestion: {element.suggest} </p>
                        </div>
                    </>
                    
                ))}
        </div>
        </>
    )
}
export default Main;