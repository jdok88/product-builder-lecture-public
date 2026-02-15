const recommendBtn = document.getElementById('recommend-btn');
const menuDisplay = document.getElementById('menu-display');
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

const dinnerMenus = [
    "치킨",
    "피자",
    "햄버거",
    "떡볶이",
    "라면",
    "김치찌개",
    "된장찌개",
    "삼겹살",
    "초밥",
    "파스타"
];

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

function recommendDinner() {
    const randomIndex = Math.floor(Math.random() * dinnerMenus.length);
    const recommendedMenu = dinnerMenus[randomIndex];
    menuDisplay.textContent = recommendedMenu;
}

recommendBtn.addEventListener('click', recommendDinner);

// Initial recommendation
recommendDinner();
