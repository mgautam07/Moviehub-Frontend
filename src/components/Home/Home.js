import {React} from 'react'
import '../all.css'
import './home.css'
import nowshowing from'../../photos/nowshowing.jpg'
import netflix from'../../photos/netflix.jpg'
import CardType2 from '../cards/CardController'



export default function Home() {
  return (<>
    <section>
      <div className="container">
        <div className="intro-container">
          <div className="intro-text">
            WELCOME TO THE <span>MOVIE HUB</span> Your one stop destination for all movies / TV shows information
          </div>
          <img className="now-showing" src={nowshowing} alt="" />
        </div>
        <div className="netflix" >
          <img src={netflix} alt="netflix" />
        </div>
      </div>
    </section>
    <CardType2 />
  </>
  );
}
