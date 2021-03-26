window.submitLoginForm = (form) => {
	//eslint-disable-next-line
	console.log(getData(form));
};
window.submitSigninForm = (form) => {
	//eslint-disable-next-line
	console.log(getData(form));
};
window.saveChanges = (form) => {
	//eslint-disable-next-line
	console.log(getData(form));
};
window.savePassword = (form) => {
	//eslint-disable-next-line
	console.log(getData(form));
};

function getData(form) {
	const data = {};

	if (form && form.hasChildNodes()) {
		form.childNodes.forEach((node) => {
			if (node.hasChildNodes()) {
				Object.assign(data, getData(node));
			} else if (node.nodeName === 'INPUT') {
				data[node.name] = node.value;
			}
		});
	}

	return data;
}

window.goBack = () => {
	window.history.back();
};
