const recommendBtn = document.getElementById('recommend-btn');
const menuImage = document.getElementById('menu-image');
const menuName = document.getElementById('menu-name');
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

const dinnerMenus = [
    { name: "치킨", imageUrl: "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "피자", imageUrl: "https://source.unsplash.com/400x300/?pizza" },
    { name: "햄버거", imageUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "떡볶이", imageUrl: "https://source.unsplash.com/400x300/?tteokbokki" },
    { name: "라면", imageUrl: "https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "김치찌개", imageUrl: "https://plus.unsplash.com/premium_photo-1669687759596-8d6d8836f480?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8a2ltY2hpJTIwamppZ2FlfGVufDB8fHx8MTc3MTEyOTc1N3ww&ixlib=rb-4.1.0&q=85" },
    { name: "된장찌개", imageUrl: "https://plus.unsplash.com/premium_photo-1705406169429-df5950bc2995?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8amppZ2FlfGVufDB8fHx8MTc3MTIyODY4Nnww&ixlib=rb-4.1.0" },
    { name: "삼겹살", imageUrl: "https://source.unsplash.com/400x300/?samgyeopsal" },
    { name: "초밥", imageUrl: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=1948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "파스타", imageUrl: "https://images.unsplash.com/photo-1579684947550-22e945225d9a?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
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
