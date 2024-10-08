import "../styles/Card.css"

interface CardProps {
    id: number,
    title: string,
    description: string,
    price: number,
    coverImg: string
  }
  
export default function Card(props: CardProps) {
    return (
        <div className="card">
            <img src={props.coverImg} className="card--image" />
            {/* <div className="card--stats">
                <span>{}</span>
                <span className="gray">({}) • </span>
                <span className="gray">{}</span>
            </div> */}
            <p className="card--title">{props.title}</p>
            <p className="card--price"><span className="bold">Price ${props.price}</span></p>
        </div>
        
    )
}