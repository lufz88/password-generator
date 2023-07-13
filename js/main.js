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

const API = 'https://random-word-api.herokuapp.com/word';

const form = document.querySelector('#form');

const lowLettersCheckbox = document.querySelector('#low-letters');
const upLettersCheckbox = document.querySelector('#up-letters');
const numbersCheckbox = document.querySelector('#numbers');
const symbolsCheckbox = document.querySelector('#symbols');
const wordsCheckbox = document.querySelector('#words');

const lengthInput = document.querySelector('#length');
const lengthSpan = document.querySelector('#show-length');
const wordsQuantityInput = document.querySelector('#words-quantity');
const wordsQuantity = document.querySelector('#show-words-quantity');
const passwordSpan = document.querySelector('#password');
const copyButton = document.querySelector('#copy-to-clipboard');
const modal = document.querySelector('#modal');
const modalText = document.querySelector('#modal-text');
const closeModalButton = document.querySelector('#close-modal');

lengthSpan.innerText = lengthInput.value;
wordsQuantity.innerText = wordsQuantityInput.value;

let words;

function generatePassword(target, charLength, wordsLength) {
	let passwordLength;
	let password = '';
	const charactersIncluded = [];

	if (!wordsCheckbox.checked) {
		passwordLength = charLength;
		target.upLetters.checked && charactersIncluded.push(upperCaseLetters);
		target.lowLetters.checked && charactersIncluded.push(lowerCaseLetters);
		target.numbers.checked && charactersIncluded.push(numbers);
		target.symbols.checked && charactersIncluded.push(symbols);

		if (charactersIncluded.length < 1) {
			modalText.innerText = 'You must select at least one option';
			modal.classList.remove('hidden');
			return;
		}
		for (let i = 0; i < passwordLength; i++) {
			const characterArray = charactersIncluded[randomNumber(0, charactersIncluded.length)];
			const character = characterArray[randomNumber(0, characterArray.length)];
			password += character;
		}
	} else {
		passwordLength = wordsLength;
		for (let i = 0; i < passwordLength; i++) {
			charactersIncluded.push(words[randomNumber(0, words.length)]);
		}
		password = charactersIncluded.join('.');
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
	fetch(`${API}?number=${quantity}`)
		.then(res => res.json())
		.then(data => {
			words = data;
		});
}

fetchWords(API, 100);

wordsCheckbox.addEventListener('click', () => {
	lowLettersCheckbox.checked = false;
	upLettersCheckbox.checked = false;
	numbersCheckbox.checked = false;
	symbolsCheckbox.checked = false;
});
lowLettersCheckbox.addEventListener('click', () => {
	wordsCheckbox.checked = false;
});
upLettersCheckbox.addEventListener('click', () => {
	wordsCheckbox.checked = false;
});
numbersCheckbox.addEventListener('click', () => {
	wordsCheckbox.checked = false;
});
symbolsCheckbox.addEventListener('click', () => {
	wordsCheckbox.checked = false;
});

lengthInput.addEventListener('input', () => (lengthSpan.innerText = lengthInput.value));
wordsQuantityInput.addEventListener(
	'input',
	() => (wordsQuantity.innerText = wordsQuantityInput.value)
);

form.addEventListener('submit', event => {
	event.preventDefault();
	generatePassword(event.target, event.target.length.value, event.target.wordsQuantity.value);
});

copyButton.addEventListener('click', () => {
	copyToClipboard('#password');
});

closeModalButton.addEventListener('click', () => modal.classList.add('hidden'));
