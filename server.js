const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Handle Form Submission
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    // Handle form data, store in a database, or send an email.
    console.log(Received message from ${name}, Email: ${email}, Message: ${message});
    res.status(200).send('Form submission successful!');
});

app.listen(PORT, () => {
    console.log(Server running on port ${PORT});
});
const stripe = require('stripe')('your-stripe-secret-key-here'); // Replace with your real key

app.post('/payment', async (req, res) => {
    try {
        const { amount, token } = req.body;
        const charge = await stripe.charges.create({
            amount: amount * 100, // Stripe works in cents
            currency: 'inr',
            source: token.id,
            description: 'Aeroclub Purchase',
        });
        res.status(200).send('Payment successful!');
    } catch (error) {
        res.status(500).send('Payment failed.');
    }
});