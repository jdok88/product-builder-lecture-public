const recommendBtn = document.getElementById('recommend-btn');
const menuImage = document.getElementById('menu-image');
const menuName = document.getElementById('menu-name');
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

const dinnerMenus = [
    { name: "치킨", imageUrl: "https://placehold.co/400x300?text=치킨" },
    { name: "피자", imageUrl: "https://placehold.co/400x300?text=피자" },
    { name: "햄버거", imageUrl: "https://placehold.co/400x300?text=햄버거" },
    { name: "떡볶이", imageUrl: "https://placehold.co/400x300?text=떡볶이" },
    { name: "라면", imageUrl: "https://placehold.co/400x300?text=라면" },
    { name: "김치찌개", imageUrl: "https://placehold.co/400x300?text=김치찌개" },
    { name: "된장찌개", imageUrl: "https://placehold.co/400x300?text=된장찌개" },
    { name: "삼겹살", imageUrl: "https://placehold.co/400x300?text=삼겹살" },
    { name: "초밥", imageUrl: "https://placehold.co/400x300?text=초밥" },
    { name: "파스타", imageUrl: "https://placehold.co/400x300?text=파스타" }
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
    menuImage.src = recommendedMenu.imageUrl;
    menuName.textContent = recommendedMenu.name;
}

recommendBtn.addEventListener('click', recommendDinner);

// Initial recommendation
recommendDinner();
