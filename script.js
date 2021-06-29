const searchBtn = document.getElementById('search-btn');
const ramenList = document.getElementById('ramen');
const ramenDetailsContent = document.querySelector('.ramen-deatils-content');
const closeBtn = document.getElementById('close-btn');

//Event Listeners
searchBtn.addEventListener('click', getRamenList);
ramenList.addEventListener('click', getRamenRecipe);
closeBtn.addEventListener('click', () => {
    ramenDetailsContent.parentElement.classList.remove('showRamen');
});
//Ramen List matches with ingredient

function getRamenList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals) {
            data.meals.forEach(meal => {
                html += `
                <div class="ramen-item" id="${meal.idMeal}">
                    <div class="ramen-img">
                        <img src="${meal.strMealThumb}" alt="">
                    </div>
                    <div class="ramen-name">
                        <h3>${meal.strMeal}</h3>
                        <a href="#" class="ramen-btn">Get Ramen</a>
                    </div>
                </div>
                `;
            });
            ramenList.classList.remove('notFound');
        } else {
            html = "<h3>SOORY, We couldn't find Your Ramen! :(</h3>";
            ramenList.classList.add('notFound');
        }

        ramenList.innerHTML = html;
    });
}

// Ramen Recipe
function getRamenRecipe(e) {
    e.preventDefault();
    if(e.target.classList.contains('ramen-btn')) {
        let ramenItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ramenItem.id}`)
        .then(response => response.json())
        .then(data => ramenRecipeModal(data.meals));
    }
}

//create a modal
function ramenRecipeModal(meal) {
    meal = meal[0];
    ramenDetailsContent.parentElement.classList.add('showRamen');
    let html = `
        <div class="ramen-recipe-img">
            <img src="${meal.strMealThumb}" alt="">
        </div>
        <h2 class="ramen-title">${meal.strMeal}</h2>
        <p class="ramen-category">${meal.strCategory}</p>
        <div class="ramen-instruct">
            <h3>Instructons:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class="ramen-link">
            <a href="${meal.strYoutube}" target="_blank">Watch Your Ramen</a>
        </div>
    `;
    ramenDetailsContent.innerHTML = html;
}