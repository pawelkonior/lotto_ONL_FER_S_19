const btnPlayRef = document.querySelector('#playBtn');
const inputRefs = [...document.querySelectorAll('input[id^="digit"]')];
const resultsRef = document.querySelector('.result');


const isAllNotEmpty = (nodes) => nodes.every((node) => node.value.trim() !== '');
const isIntegers = (nodes) => nodes.every((node) => Number.isInteger(Number(node.value)));
const convertToIntegers = (nodes) => nodes.map((node) => parseInt(node.value));
const isInRange = (digits) => digits.every((digit) => digit >= 1 && digit <= 49);
const isNotRedundant = (digits) => new Set(digits).size === digits.length;

const drawDigits = () => {
    const numbers = [];

    while (numbers.length < 6) {
        const result = Math.round(Math.random() * 48 + 1);
        if (!numbers.includes(result)) {
            numbers.push(result);
        }
    }

    return numbers;
}

const checkHits = (userDigits, drawnDigits) => {
    const hits = [];

    // userDigits.forEach((digit) => {
    //     if (drawnDigits.includes(digit)) {
    //         hits.push(digit);
    //     }
    // })

    for (const digit of userDigits) {
        if (drawnDigits.includes(digit)) {
            hits.push(digit);
        }
    }

    return hits;
}

const checkHitsPro = (userDigits, drawnDigits) => userDigits.filter((digit) => drawnDigits.includes(digit));

const calculatePrize = (quantity) => {
    switch (quantity) {
        case 3:
            return 24;
        case 4:
            return 170;
        case 5:
            return 3500;
        case 6:
            return 3000000;
        default:
            return 0
    }
};

const showResults = (hits, drawnDigits) => {
    let message = `Wylosowane liczby to: ${drawnDigits.join(', ')}. `;
    if (hits.length > 0) {
        message += `Trafiłeś ${hits.length} razy, twoje liczby to: ${hits.join(', ')}.`
        message += `Hajs: ${calculatePrize(hits.length)}PLN.`
    } else {
        message += 'Nic nie wygrałeś, spróbuj jeszcze raz, a na pewno wygrasz!'
    }

    resultsRef.innerText = message;
}


btnPlayRef.addEventListener('click', function (event) {
    if (isAllNotEmpty(inputRefs)) {
        if (isIntegers(inputRefs)) {
            const userDigits = convertToIntegers(inputRefs);
            if (isInRange(userDigits)) {
                if (isNotRedundant(userDigits)) {
                    const drawnDigits = drawDigits();
                    const hits = checkHits(userDigits, drawnDigits);
                    showResults(hits, drawnDigits);
                } else {
                    console.log('Liczby ci się powtarzają ziomeczku')
                }
            } else {
                console.log('są liczby poza zakresem 1-49')
            }
        } else {
            console.log('liczby nie są liczbami')
        }
    } else {
        console.log('coś jest puste')
    }
})


function becomeMillionaire(money, digits) {
    const games = money / 3;
    let prize = 0;
    const count6 = [];

    for (let i = 0; i < games; i++) {
        let userDigits;
        if (digits === undefined) {
            userDigits = drawDigits();
        } else {
            userDigits = digits;
        }

        const drawnDigits = drawDigits();
        const hits = checkHits(userDigits, drawnDigits);
        prize += calculatePrize(hits.length)

        if (hits.length === 6) {
            count6.push(hits);
        }
    }

    return `Wygrałeś ${prize}PLN, szóstki: ${count6.length}, trafione numery do szóstki: ${count6.join(', ')}`
}