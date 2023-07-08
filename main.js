
// import bootstrap from 'bootstrap'

document.addEventListener('DOMContentLoaded',()=>{
  const searchBtn=document.getElementById('search-btn');
  const mealList=document.getElementById('meal');
  const mealDeatilsContent= document.querySelector('.meal-details-content');
  const recipeCloseBtn= document.getElementById('recipe-close-btn');
  const searchFirst=document.getElementById('search-btn');
  // event listeners
  searchBtn.addEventListener('click',getMealList);
  searchFirst.addEventListener('click',getfirstLetter);
  mealList.addEventListener('click',getMealRecipe);
  recipeCloseBtn.addEventListener('click',()=>{
    mealDeatilsContent.parentElement.classList.remove('showRecipe')
  })

  function getfirstLetter(e){
    e.preventDefault();
    let searchfirst=document.getElementById('search-input').value.trim();
    // console.log(searchfirst);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchfirst}`)
    .then(res => res.json()).then(data=>{
      console.log(data);
    })
  }
  // get meal list that matched with the ingredients
  // basically this function, user input ingredient, it'll pass into console
  function getMealList(e){
    e.preventDefault();
    let searchInputTxt=document.getElementById('search-input').value.trim();
    console.log(searchInputTxt);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`).then(response => response.json())
    .then(data => {
      // console.log(data);
      let html="";
      if(data.meals){
        data.meals.forEach(meal =>{
          html+=`
            <div data-id="${meal.idMeal}"> 
            <div class="card meal-item" style="width: 20rem  data-id="${meal.idMeal}">
          <img src="${meal.strMealThumb}" class="card-img-top imgg" alt="...">
          <div class="card-body">
          <h5 class="card-title" style="font-weight: 700;">${meal.strMeal}</h5>
            <a href="#" class=" getrecipe-btn">Get Recipe </a>
          </div>
        </div>
        </div>
        `;
        });
        
      mealList.classList.remove('notFound');
      }
      else
      {
        html="Sorry!! We didn't find any meal.";
        mealList.classList.add('notFound');
      }
      mealList.innerHTML=html;
    });
  }


  // get meal recipe
  function getMealRecipe(event){
   event.preventDefault();
    if(event.target.classList.contains('getrecipe-btn')){
      let mealItem=event.target.parentElement.parentElement.parentElement;
      console.log(mealItem);
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`).then(response=> response.json()).then(data =>
      // {
        // console.log(data);
        mealRecipeModal(data.meals));
      // }
      
    }
  }

  // creating a modal
  function mealRecipeModal(meal)
  {  console.log(meal);
    meal=meal[0];
    let html=`<h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-instructions">
      <h3>Instructions:</h3>
      <p>${meal.strInstructions}</p>
      </div>
    <div class="recipe-meal-img">
      <img src="${meal.strMealThumb}" alt="">
    </div>
    <div class="recipe-link">
      <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
    </div>`;
    mealDeatilsContent.innerHTML=html;
    mealDeatilsContent.parentElement.classList.add('showRecipe');
  }
 })

