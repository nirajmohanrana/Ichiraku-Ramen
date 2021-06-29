const ramenBtn = document.querySelector('.ramen-btn');
const ramenDetailsContent = document.querySelector('.ramen-deatils-content');
const closeBtn = document.getElementById('close-btn');

//Event Listeners
ramenBtn.addEventListener('click', getRamenRecipe);
closeBtn.addEventListener('click', () => {
    ramenDetailsContent.parentElement.classList.remove('showRamen');
});

// Ramen Recipe
function getRamenRecipe(e) {
    e.preventDefault();
        let ramenItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then(response => response.json())
        .then(data => ramenRecipeModal(data.meals));
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