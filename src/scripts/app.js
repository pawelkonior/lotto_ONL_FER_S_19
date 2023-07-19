const btnPlayRef = document.querySelector('#playBtn');
const inputRefs = [...document.querySelectorAll('input[id^="digit"]')];


const isAllNotEmpty = (nodes) => nodes.every((node) => node.value.trim() !== '');
const isIntegers = (nodes) => nodes.every((node) => Number.isInteger(Number(node.value)));

btnPlayRef.addEventListener('click', function (event) {
    if (isAllNotEmpty(inputRefs)) {
        console.log('ok')
    } else {
        console.log('coś jest puste')
    }
})