const recommendBtn = document.getElementById('recommend-btn');
const menuImage = document.getElementById('menu-image');
const menuName = document.getElementById('menu-name');
const menuRecipe = document.getElementById('menu-recipe');
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

const dinnerMenus = [
    { name: "치킨", apiEndpoint: "https://foodish-api.com/api/images/chicken", recipe: "1. 닭을 깨끗이 씻어 물기를 뺍니다. 2. 튀김가루와 물을 섞어 튀김옷을 만듭니다. 3. 닭에 튀김옷을 입혀 180도 기름에서 10-15분간 튀깁니다." },
    { name: "피자", apiEndpoint: "https://foodish-api.com/api/images/pizza", recipe: "1. 피자 도우에 토마토 소스를 바릅니다. 2. 모짜렐라 치즈와 원하는 토핑을 올립니다. 3. 200도로 예열된 오븐에서 15-20분간 굽습니다." },
    { name: "햄버거", apiEndpoint: "https://foodish-api.com/api/images/burger", recipe: "1. 햄버거 빵을 반으로 자릅니다. 2. 패티를 굽고, 빵 위에 올립니다. 3. 양상추, 토마토, 치즈 등 원하는 재료를 추가합니다." },
    { name: "떡볶이", imageUrl: "https://source.unsplash.com/random/400x300?tteokbokki", recipe: "1. 떡을 물에 불립니다. 2. 냄비에 물, 고추장, 설탕, 간장을 넣고 끓입니다. 3. 떡과 어묵을 넣고 끓여줍니다." },
    { name: "라면", apiEndpoint: "https://foodish-api.com/api/images/ramen", recipe: "1. 냄비에 물 550ml를 끓입니다. 2. 면과 스프를 넣고 4분 30초간 끓입니다. 3. 계란이나 파를 추가하면 더 맛있습니다." },
    { name: "김치찌개", imageUrl: "https://source.unsplash.com/random/400x300?kimchi,jjigae", recipe: "1. 냄비에 김치와 돼지고기를 넣고 볶습니다. 2. 물을 붓고 끓입니다. 3. 두부, 파 등을 넣고 한소끔 더 끓입니다." },
    { name: "된장찌개", imageUrl: "https://source.unsplash.com/random/400x300?doenjang,jjigae", recipe: "1. 냄비에 멸치 육수를 냅니다. 2. 된장을 풀고 애호박, 두부, 버섯 등을 넣고 끓입니다. 3. 마지막에 파와 고추를 넣습니다." },
    { name: "삼겹살", apiEndpoint: "https://foodish-api.com/api/images/samgyeopsal", recipe: "1. 달군 팬에 삼겹살을 올립니다. 2. 앞뒤로 노릇하게 굽습니다. 3. 상추, 깻잎, 김치 등과 함께 즐깁니다." },
    { name: "초밥", imageUrl: "https://source.unsplash.com/random/400x300?sushi", recipe: "1. 밥에 식초, 설탕, 소금을 섞어 초밥용 밥을 만듭니다. 2. 신선한 회를 준비합니다. 3. 밥 위에 회를 얹어 만듭니다." },
    { name: "파스타", apiEndpoint: "https://foodish-api.com/api/images/pasta", recipe: "1. 끓는 물에 소금을 넣고 파스타 면을 삶습니다. 2. 팬에 올리브 오일을 두르고 마늘, 원하는 재료를 볶습니다. 3. 면과 소스를 넣고 함께 볶아줍니다." }
];

// Image error handling
menuImage.onerror = function() {
    this.src = 'https://via.placeholder.com/400x300.png?text=Image+Not+Found';
};

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

async function recommendDinner() {
    const randomIndex = Math.floor(Math.random() * dinnerMenus.length);
    const recommendedMenu = dinnerMenus[randomIndex];
    
    menuName.textContent = recommendedMenu.name;
    menuRecipe.textContent = recommendedMenu.recipe;
    menuImage.src = 'https://via.placeholder.com/400x300.png?text=Loading...'; // Placeholder

    try {
        let externalImageUrl;
        if (recommendedMenu.imageUrl) {
            // Use the static URL directly
            externalImageUrl = recommendedMenu.imageUrl;
        } else if (recommendedMenu.apiEndpoint) {
            // Fetch the external image URL from the Foodish API
            const apiResponse = await fetch(recommendedMenu.apiEndpoint);
            if (!apiResponse.ok) {
                throw new Error(`Foodish API error! status: ${apiResponse.status}`);
            }
            const apiData = await apiResponse.json();
            externalImageUrl = apiData.image;
        } else {
            throw new Error('No image source found for this menu item.');
        }

        // Set the image src to our proxy, which will fetch the actual image data
        menuImage.src = `/image?url=${encodeURIComponent(externalImageUrl)}`;

    } catch (error) {
        console.error('Error fetching image:', error);
        menuImage.src = 'https://via.placeholder.com/400x300.png?text=Image+Load+Failed'; // Error placeholder
    }
}

recommendBtn.addEventListener('click', recommendDinner);

// Initial recommendation
recommendDinner();
