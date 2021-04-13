import { goBack } from './common';

const backButton = document.getElementById('back-button');

if (backButton) {
	backButton.onclick = goBack;
}
