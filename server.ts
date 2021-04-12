const express = require('express');
const fs = require('fs');

const port = 3000;

const app = express();

app.use(express.static('./dist'));

app.get('/:page', (req, res) => {
	res.sendFile('./dist/index.html', { root: __dirname });
});

app.use((req, res, next) => {
	if (req.originalUrl.endsWith('.svg')) {
		fs.readdir('./dist', (err, files) => {
			const urlParts = req.originalUrl.split('/');
			const match = urlParts[urlParts.length - 1].match(/(.*?)(\.svg)/);

			if (match) {
				const regexp = new RegExp(`${match[1]}\\..*${match[2]}`);

				const file = files.find((fileName) => regexp.test(fileName));

				if (file) {
					res.sendFile(`./dist/${file}`, { root: __dirname });
				} else {
					next();
				}
			} else {
				next();
			}
		});
	} else {
		next();
	}
});

app.listen(port, 'localhost', () => {
	//eslint-disable-next-line
	console.log(`Server is running on localhost:${port}`);
});
