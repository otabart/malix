import { Link } from "react-router-dom";

export default function HomePage () {
  return (
        <>
            <h1 style={{textAlign: "center", fontSize: "4em"}}>
              MaliX
            </h1>
            <p style={{textAlign: "center", fontSize: "1.2em"}}>Empowering Creators and Communities Through Tokenized Intellectual Properties
              <br />
              A blockchain platform for monetizing and protecting intellectual property globally
            </p>
            <Link to="/tokenize">
              <button style={{width: "150px", backgroundColor: "black", color: "white", marginLeft: "40%", marginRight: "50px", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer"}}>Tokenize IP</button>
            </Link>
            <button style={{width: "150px", backgroundColor: "black", color: "white", padding: "10px", border: "none", borderRadius: "5px"}}>MarketPlace</button>
        </>
  )
}

