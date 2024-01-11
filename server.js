const express = require('express');

const app = express();

const port = process.env.port || 4000;

app.listen(port, () => {
           console.log(`App is running on port ${port}`);
})