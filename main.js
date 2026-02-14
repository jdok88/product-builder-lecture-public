const generateBtn = document.getElementById('generate-btn');
const numberDivs = document.querySelectorAll('.number');
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Theme switching
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
}

themeToggleBtn.addEventListener('click', () => {
    let currentTheme = body.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        body.removeAttribute('data-theme');
        localStorage.removeItem('theme');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});


function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers);
}

function displayNumbers(numbers) {
    numberDivs.forEach((div, index) => {
        div.textContent = numbers[index];
    });
}

function generateAndDisplayNumbers() {
    const lottoNumbers = generateLottoNumbers();
    displayNumbers(lottoNumbers);
}

generateBtn.addEventListener('click', generateAndDisplayNumbers);

// Initial generation
generateAndDisplayNumbers();
