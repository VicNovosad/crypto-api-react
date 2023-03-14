import { useState, useEffect } from "react";
import TableRow from "./modules/TableRow";
import "./styles.css";

const COIN_NAMES = {
    BTCUSDT : "Bitcoin",
    ETHUSDT : "Ethereum",
    SOLUSDT : "Solana",
    ADAUSDT : "Cardano",
    DOGEUSDT : "DogeCoin",
    BNBBTC : "Binance Coin"
};

const allCryptoKeys = Object.keys(COIN_NAMES);
// COIN_NAMES.map(obj => Object.keys(obj)[0]);
// const allCryptoNames = COIN_NAMES.map(obj => Object.values(obj)[0]);

export default function App() {

    const [cryptoData, setCryptoData] = useState();
    
    useEffect(() => {
        fetch("https://binance.us/api/v3/ticker/24hr")
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    // const filteredData = {};
                    // COIN_NAMES.forEach(symbol => {
                    //     const cryptoSymbol = Object.keys(symbol)[0];
                    //     const cryptoSymbolData = data.find(data => data.symbol === cryptoSymbol);
                    //     filteredData[cryptoSymbol] = cryptoSymbolData;
                    //     filteredData[cryptoSymbol].name = Object.values(symbol)[0];
                    // });
                    const filteredData = data.filter((ticker) => {
                        if (allCryptoKeys.includes(ticker.symbol)) {
                            return true;
                        }
                    });
                    setCryptoData(filteredData);
                }
            });
    }, []);

    return (
        <div className="App">
            <nav>
                <img
                    alt="logo"
                    src="/assets/crypto-logo-secondary.webp"
                />
                <input type="text" placeholder="Search" />
            </nav>
            <div className="main-content">
                <h2>Today's cryptocurrency prices</h2>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>24h %</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Up? Green + ▲ */}
                        {/* Down? Red + ▼ */}
                        
                        {/* <tr>
                            <td>1</td>
                            <td>Bitcoin</td>
                            <td>$40,000</td>
                            <td style={{ color: "green" }}>▲1.02%</td>
                        </tr> */}
                        {cryptoData && cryptoData.map((coin, index) => {
                                return (
                                    <TableRow key={index}
                                        number={index + 1} 
                                        name={COIN_NAMES[coin.symbol]} 
                                        price={Number(coin.lastPrice).toLocaleString()} 
                                        growIndex={Number(coin.priceChangePercent).toFixed(2)}
                                    />
                                )
                            })
                        }
                    </tbody>
                </table>
                <div className="bottom-logo-ctr">
                    <img
                        className="bottom-logo"
                        alt="logo"
                        src="/assets/crypto-logo-primary.png"
                    />
                </div>
            </div>
        </div>
    );
}
