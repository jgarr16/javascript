// First pass at building a JavaScript app to check crypto prices and calculate the value of a small portfolio. I've got it where I can pass the 
// coin type (e.g., ETH, BTC, etc.) and the coin action (e.g., buy, sell, spot) by using arguments; just need to figure out how to call them remotely.

```
/**
 * getPrices takes an argument that reflects the crypto coin you want a price for (e.g., ETH, BTC, AVAX, etc.).
 * getPrices returns a JSON file with the requested coin's price data.
 * 'https://api.coinbase.com/v2/prices/AVAX-USD/sell?currency=USD'
 */

function getPrices (coin,action) {
    const https = require('https');
    const callCoin = `/v2/prices/${coin}-USD/${action}?currency=USD`
    const options = {
        hostname: 'api.coinbase.com',
        port: 443,
        path: callCoin,
        method: 'GET'
    }
    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
        res.on('data', d => {
            process.stdout.write(d)
        })
    })
    req.on('error', error => {
        console.error(error)
    })
    req.end()

}

module.exports = getPrices("ETH","sell");
```
