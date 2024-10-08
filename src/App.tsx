import HomePage from "./components/HomePage";
import MarketPlace from "./components/MarketPlace";
import Navigation from "./components/Navigation";

import Card from './components/Card'
import "./styles/Card.css"
import data from "./assets/data"

export default function App() {
  
  const cards = data.map(item => {
    return (
        <Card
            key={item.id}
            {...item}
        />
    )
})  

  return (
    <>
    <Navigation />
    <HomePage />
    <MarketPlace />
    <section className="cards-list">
      {cards}
    </section>
    </>
  )
}


