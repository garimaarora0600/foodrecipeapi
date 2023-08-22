
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

  // function getfirstLetter(e){
  //   e.preventDefault();
  //   let searchfirst=document.getElementById('search-input').value.trim();
  //   // console.log(searchfirst);
  //   fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchfirst}`)
  //   .then(res => res.json()).then(data=>{
  //     console.log(data);
  //   })
  // }


  async function getfirstLetter(e) {
    // e is the event that triggered the function
    e.preventDefault();
    // it is used to store the trimmed value of search input field
    let searchfirst = document.getElementById('search-input').value.trim();
    // console.log(searchfirst);
    try {
      // The await keyword makes the function wait until the request is complete and the response is returned.
      //  The response object contains information about the request, such as the response status, headers, and data.
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchfirst}`);
    /**await response.json() is a part of the fetch API that handles parsing the response body as JSON data. When making an HTTP request using fetch, the response object contains the raw data from the server, which could be in various formats (e.g., JSON, text, HTML, XML, etc.).
The json() method is a built-in method of the Response object that is returned by the fetch function. It takes the response body and parses it as JSON data. This method returns a promise that resolves to the actual JSON data from the response.
Using await with response.json() allows us to pause the execution of the code until the JSON data has been fully processed. This is beneficial because parsing the response may take some time, especially if the response contains a large amount of data. */
      const dd = await response.json();
    //   console.log(data);
    // } catch (error) {
    //   console.error("Error", error);
    // }
    let html = "";
      if (dd.meals) {
        dd.meals.forEach(meal => {
          html += `
            <div data-id="${meal.idMeal}"> 
              <div class="card meal-item" style="width: 20rem;" data-id="${meal.idMeal}">
                <img src="${meal.strMealThumb}" class="card-img-top imgg" alt="...">
                <div class="card-body">
                  <h5 class="card-title" style="font-weight: 700;">${meal.strMeal}</h5>
                  <a href="#" class="getrecipe-btn">Get Recipe </a>
                </div>
              </div>
            </div>
          `;
        });
  
        mealList.classList.remove('notFound');
      } else {
        html = "Sorry!! We didn't find any meal.";
        mealList.classList.add('notFound');
      }
  /*The innerHTML property of an element is used to get or set the HTML content of the element. When you access mealList.
  innerHTML, it returns a string containing the HTML content of the mealList element. */
      mealList.innerHTML = html;
    } catch (error) {
      console.error("Error", error);
      mealList.innerHTML = "Failed to fetch meal data.";
      mealList.classList.add('notFound');
    }
  }
  
  // get meal list that matched with the ingredients
  // basically this function, user input ingredient, it'll pass into console
  // function getMealList(e){
  //   e.preventDefault();
  //   let searchInputTxt=document.getElementById('search-input').value.trim();
  //   console.log(searchInputTxt);
  //   fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`).then(response => response.json())
  //   .then(data => {
  //     // console.log(data);
  //     let html="";
  //     if(data.meals){
  //       data.meals.forEach(meal =>{
  //         html+=`
  //           <div data-id="${meal.idMeal}"> 
  //           <div class="card meal-item" style="width: 20rem  data-id="${meal.idMeal}">
  //         <img src="${meal.strMealThumb}" class="card-img-top imgg" alt="...">
  //         <div class="card-body">
  //         <h5 class="card-title" style="font-weight: 700;">${meal.strMeal}</h5>
  //           <a href="#" class=" getrecipe-btn">Get Recipe </a>
  //         </div>
  //       </div>
  //       </div>
  //       `;
  //       });
        
  //     mealList.classList.remove('notFound');
  //     }
  //     else
  //     {
  //       html="Sorry!! We didn't find any meal.";
  //       mealList.classList.add('notFound');
  //     }
  //     mealList.innerHTML=html;
  //   });
  // }

  async function getMealList(e) {
    e.preventDefault();
    let searchInputTxt = document.getElementById('search-input').value.trim();
    console.log(searchInputTxt);
    
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`);
      const data = await response.json();
      let html = "";
      if (data.meals) {
        data.meals.forEach(meal => {
          html += `
            <div data-id="${meal.idMeal}"> 
              <div class="card meal-item" style="width: 20rem;" data-id="${meal.idMeal}">
                <img src="${meal.strMealThumb}" class="card-img-top imgg" alt="...">
                <div class="card-body">
                  <h5 class="card-title" style="font-weight: 700;">${meal.strMeal}</h5>
                  <a href="#" class="getrecipe-btn">Get Recipe </a>
                </div>
              </div>
            </div>
          `;
        });
  
        mealList.classList.remove('notFound');
      } else {
        html = "Sorry!! We didn't find any meal.";
        mealList.classList.add('notFound');
      }
  
      mealList.innerHTML = html;
    } catch (error) {
      console.error("Error", error);
      mealList.innerHTML = "Failed to fetch meal data.";
      mealList.classList.add('notFound');
    }
  }
  
  // get meal recipe
  function getMealRecipe(event){
   event.preventDefault();
  //  checks if the clicked element ha a class 'getrecipe-btn'
    if(event.target.classList.contains('getrecipe-btn')){
      // retrives the ancestor elements of the click element until it reaches the element with class 'meal-item'
      let mealItem=event.target.parentElement.parentElement.parentElement;
      console.log(mealItem);
      // fetches the data from API endpoint with the meal ID(stored in 'data-id' attribute of the 'mealItem' element)
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
    // meal argument is array , it extracts the first element
    meal=meal[0];
    console.log(meal);
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

