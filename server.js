const express = require('express');

const PORT = 3000;

const app = express();

app.use(express.static('./dist'));

app.get('/', (req, res) => {
	res.sendFile('./dist/index.html');
});

app.listen(PORT, 'localhost', () => {
	//eslint-disable-next-line
	console.log(`Server is running on localhost:${PORT}`);
});
