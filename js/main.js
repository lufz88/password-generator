const lowerCaseLetters = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',
];
const upperCaseLetters = [
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'C',
	'W',
	'X',
	'Y',
	'Z',
];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const symbols = [
	'!',
	'@',
	'#',
	'$',
	'^',
	'&',
	'(',
	')',
	'_',
	'=',
	'+',
	'-',
	'*',
	'/',
	'%',
	'<',
	'>',
	'?',
	'[',
	']',
	'{',
	'}',
];

const API = 'https://clientes.api.greenborn.com.ar/public-random-word';

const form = document.querySelector('#form');
const lengthInput = document.querySelector('#length');
const lengthSpan = document.querySelector('#show-length');
const passwordSpan = document.querySelector('#password');
const copyButton = document.querySelector('#copy-to-clipboard');
const modal = document.querySelector('#modal');
const modalText = document.querySelector('#modal-text');
const closeModalButton = document.querySelector('#close-modal');

lengthSpan.innerText = lengthInput.value;

function generatePassword(target, length) {
	const passwordLength = length;
	let password = '';
	const charactersIncluded = [];
	target.upLetters.checked && charactersIncluded.push(upperCaseLetters);
	target.lowLetters.checked && charactersIncluded.push(lowerCaseLetters);
	target.numbers.checked && charactersIncluded.push(numbers);
	target.symbols.checked && charactersIncluded.push(symbols);

	if (charactersIncluded.length < 1) {
		alert('Seleccioná algo loco');
		return;
	}

	for (let i = 0; i < passwordLength; i++) {
		const characterArray = charactersIncluded[randomNumber(0, charactersIncluded.length)];
		const character = characterArray[randomNumber(0, characterArray.length)];
		password += character;
	}
	passwordSpan.value = password;
}

function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min));
}

function copyToClipboard(target) {
	const element = document.querySelector(target);
	const value = element.value;
	if (value.length) {
		window.navigator.clipboard.writeText(value);
		modalText.innerText = 'Your password has been copied to the clipboard';
		modal.classList.remove('hidden');
	} else {
		modalText.innerText = 'You need to generate your password';
		modal.classList.remove('hidden');
	}
}

function fetchWords(API, quantity) {
	fetch(`${API}?c=${quantity}`)
		.then(res => res.json())
		.then(data => console.log(data));
}

lengthInput.addEventListener('input', () => (lengthSpan.innerText = lengthInput.value));

form.addEventListener('submit', event => {
	event.preventDefault();
	generatePassword(event.target, event.target.length.value);
});

copyButton.addEventListener('click', () => {
	copyToClipboard('#password');
});

closeModalButton.addEventListener('click', () => modal.classList.add('hidden'));
