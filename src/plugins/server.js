const express = require('express');
const app = express();

app.post('/api/', (req, res) => {
    const formData = req.body;
    console.log(formData); // log the form data
    res.send('Form submitted successfully');
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});