const express = require('express');

const port = 3000;

const app = express();

app.use(express.static('./dist'));

app.get('/', (req, res) => {
	res.sendFile('./dist/index.html');
});

app.listen(port, 'localhost', () => {
	//eslint-disable-next-line
	console.log(`Server is running on localhost:${port}`);
});
