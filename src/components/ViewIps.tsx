import random from '../assets/random.png'

export default function ViewIps(){
    return (
        <>
                <>
        <h2 style={{textAlign: "center"}}>My Intellectual Properties</h2>
        <div style={{display: "flex", justifyContent: "space-evenly", backgroundColor: "teal"}}>
            <div style={{backgroundColor: "black"}}><img src={random} alt="random" style={{height: "250px", width: "250px"}}/></div>
            <div style={{backgroundColor: "red"}}><img src={random} alt="random" style={{height: "250px", width: "250px"}}/></div>
            <div style={{backgroundColor: "teal"}}><img src={random} alt="random" style={{height: "250px", width: "250px"}}/></div>
            <div style={{backgroundColor: "teal"}}><img src={random} alt="random" style={{height: "250px", width: "250px"}}/></div>
        </div>
        <div style={{display: "flex", justifyContent: "space-evenly", marginTop: "50px", backgroundColor: "teal"}}>
            <div style={{backgroundColor: "teal"}}><img src={random} alt="random" style={{height: "250px", width: "250px"}}/></div>
            <div style={{backgroundColor: "teal"}}><img src={random} alt="random" style={{height: "250px", width: "250px"}}/></div>
            <div style={{backgroundColor: "teal"}}><img src={random} alt="random" style={{height: "250px", width: "250px"}}/></div>
            <div style={{backgroundColor: "teal"}}><img src={random} alt="random" style={{height: "250px", width: "250px"}}/></div>
        </div>
    </>
        </>
    )
}