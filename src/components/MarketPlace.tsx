import random from '../assets/random.png'

export default function MarketPlace() {
    return (
        <>
        <h2 style={{textAlign: "center"}}>Technology Traditional Knowledge Art</h2>
        <input type="text" placeholder='Search' style={{width: "200px"}}/>
        <div style={{display: "flex", justifyContent: "space-evenly", backgroundColor: "teal"}}>
            <div style={{backgroundColor: "gray", height: "300px", borderRadius: "10px"}}><img src={random} alt="random" style={{height: "200px", width: "250px", borderRadius: "10px"}}/>
                <p>Patents</p>
                <p>Price = 10 USDT Total Supply - 10</p>
            </div>
            <div style={{backgroundColor: "red", height: "300px", borderRadius: "10px"}}><img src={random} alt="random" style={{height: "200px", width: "250px", borderRadius: "10px"}}/>
                <p>Copyrights</p>
                <p>Price 20 USDT Total Supply 10</p>
            </div>
            <div style={{backgroundColor: "teal", height: "300px", borderRadius: "10px"}}><img src={random} alt="random" style={{height: "200px", width: "250px",borderRadius: "10px"}}/></div>
            <div style={{backgroundColor: "teal", height: "300px", borderRadius: "10px"}}><img src={random} alt="random" style={{height: "200px", width: "250px",borderRadius: "10px"}}/></div>
        </div>
        <div style={{display: "flex", justifyContent: "space-evenly", marginTop: "50px", backgroundColor: "teal"}}>
            <div style={{backgroundColor: "red", height: "300px", borderRadius: "10px"}}><img src={random} alt="random" style={{height: "200px", width: "250px",borderRadius: "10px"}}/></div>
            <div style={{backgroundColor: "gray", height: "300px", borderRadius: "10px"}}><img src={random} alt="random" style={{height: "200px", width: "250px",borderRadius: "10px"}}/></div>
            <div style={{backgroundColor: "teal", height: "300px", borderRadius: "10px"}}><img src={random} alt="random" style={{height: "200px", width: "250px",borderRadius: "10px"}}/></div>
            <div style={{backgroundColor: "teal", height: "300px", borderRadius: "10px"}}><img src={random} alt="random" style={{height: "200px", width: "250px",borderRadius: "10px"}}/></div>
        </div>
    </>
    )
}