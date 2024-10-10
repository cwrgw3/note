const DEFAULT_HEIGHT = 16;

const $textarea = document.querySelector('#textarea');

$textarea.oninput = (event) => {
const $target = event.target;

$target.style.height = 0;
$target.style.height = DEFAULT_HEIGHT + $target.scrollHeight + 'px';
};