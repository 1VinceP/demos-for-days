require('dotenv').config();

const express = require('express')
    , bodyParser = require('body-parser')
    , passport = require('passport')
    , stripe = require('stripe')(process.env.STRIPE_SECRET_KEY) // You get this secret key from Stripe's website
    , chalk = require('chalk')

let app = express()

app.use( bodyParser.json() )

///////////////////////////////////////////////////////////////// STRIPE
app.post('/api/payment', function (req, res, next) {
    // convert amount to pennies
    const amountArray = req.body.amount.toString().split('');
    const pennies = [];
    for (var i = 0; i < amountArray.length; i++) {
        if (amountArray[i] === ".") {
            if (typeof amountArray[i + 1] === "string") {
                pennies.push(amountArray[i + 1]);
            } else {
                pennies.push("0");
            }
            if (typeof amountArray[i + 2] === "string") {
                pennies.push(amountArray[i + 2]);
            } else {
                pennies.push("0");
            }
            break;
        } else {
            pennies.push(amountArray[i])
        }
    }
    const convertedAmt = parseInt(pennies.join(''));

    const charge = stripe.charges.create({
        amount: convertedAmt, // amount in cents, again
        currency: 'usd',
        source: req.body.token.id,
        description: 'Test charge from react app'
    }, function (err, charge) {

        if (err) return res.sendStatus(500)

        if (err && err.type === 'StripeCardError') {
            return alert('The card has been declined')
        }
    return res.sendStatus(200);
    });
});
///////////////////////////////////////////////////////////////// END STRIPE



let port = 3003
const portChalk = chalk.cyan.underline
app.listen( port, () => {
    console.log( portChalk(`listening on port ${port}`) )
})