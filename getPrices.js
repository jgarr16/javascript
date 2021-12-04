// First pass at building a JavaScript app to check crypto prices and calculate the value of a small portfolio. It's only working for a single coin at a time right now.

```
/**
 * getPrices takes an argument that reflects the crypto coin you want a price for (e.g., ETH, BTC, AVAX, etc.).
 * getPrices returns a JSON file with the requested coin's price data.
 */

function getPrices () {
    const https = require('https');
    const options = {
        hostname: 'api.coinbase.com',
        port: 443,
        path: '/v2/prices/ETH-USD/sell?currency=USD',
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
// 'https://api.coinbase.com/v2/prices/AVAX-USD/sell?currency=USD'
}


module.exports = getPrices();

```
