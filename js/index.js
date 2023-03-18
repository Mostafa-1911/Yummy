$(document).ready(() => {
  searchByName("").then(() => {
    $(".loading-screen").fadeOut(500);
    $("body").css("overflow", "auto");
  });
});

function openSideNav() {
  $(".side-nav").animate(
    {
      left: 0,
    },
    500
  );

  $(".open-close-icon").removeClass("fa-align-justify");
  $(".open-close-icon").addClass("fa-x");
}

function closeSideNav() {
  let X = $(".side-nav .nav-tab").outerWidth();
  $(".side-nav").animate(
    {
      left: -X,
    },
    500
  );

  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");
}

$(".side-nav i.open-close-icon").click(() => {
  console.log("hi");
  if ($(".side-nav").css("left") == "0px") {
    closeSideNav();
  } else {
    openSideNav();
  }
});

// function getMeals() {
//     fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`).then((res)=>{
//        return res.json()
//     }).then((finalres)=>{
//         displayMeals(finalres)
//     }).catch((X)=>{
//         console.log(`7amada`)
//     })
// }

let mealsData = document.getElementById("mealsData");
let categories = document.getElementById("categories");
let search = document.getElementById("search");
let searchName = document.getElementById("searchName");
let searchFLetter = document.getElementById("searchFLetter");
let area = document.getElementById("area");
let ingredients = document.getElementById("ingredients");
let contact = document.getElementById("contact");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;

search.addEventListener("click", function () {
  closeSideNav();
  showSearchInputs();
});
categories.addEventListener("click", function () {
  closeSideNav();
  getCategories();
});
area.addEventListener("click", function () {
  closeSideNav();
  getArea();
});
ingredients.addEventListener("click", function () {
  closeSideNav();
  getIngredients();
});
contact.addEventListener("click", function () {
  closeSideNav();
  showContacts();
});

async function getIngredients() {
  mealsData.innerHTML = "";
  $(".loading-screen").fadeIn(300);

  searchContainer.innerHTML = "";

  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  respone = await respone.json();
  console.log(respone);

  displayIngredients(respone);
  $(".loading-screen").fadeOut(300);
}

function displayIngredients(response) {
  let cartoona = "";

  for (let i = 0; i < response.meals.length; i++) {
    cartoona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${response.meals[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${response.meals[i].strIngredient}</h3>
                        <p>${response.meals[i].strDescription}</p>
                </div>
        </div>
        `;
  }

  mealsData.innerHTML = cartoona;
}

async function getIngredientsMeals(ingredients) {
  mealsData.innerHTML = "";
  $(".loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
  );
  response = await response.json();
  console.log(response);

  displayMeals(response);
  $(".loading-screen").fadeOut(300);
}

async function getArea() {
  mealsData.innerHTML = "";
  $(".loading-screen").fadeIn(300);

  searchContainer.innerHTML = "";

  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  respone = await respone.json();
  console.log(respone);

  displayArea(respone);
  $(".loading-screen").fadeOut(300);
}

function displayArea(respone) {
  let cartoona = "";

  for (let i = 0; i < respone.meals.length; i++) {
    cartoona += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${respone.meals[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${respone.meals[i].strArea}</h3>
                </div>
        </div>
        `;
  }

  mealsData.innerHTML = cartoona;
}

async function getAreaMeals(area) {
  mealsData.innerHTML = "";
  $(".loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();

  displayMeals(response);
  $(".loading-screen").fadeOut(300);
}

function showSearchInputs() {
  searchContainer.innerHTML = `
    <div class="row py-4 ">
            <div class="col-md-6 ">
                <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name" id="searchName">
            </div>
            <div class="col-md-6">
                <input onkeyup="searchByFLetter(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter" id="searchFLetter">
            </div>
        </div>`;

  mealsData.innerHTML = "";
}

async function searchByName(term) {
  closeSideNav();
  mealsData.innerHTML = "";
  $(".loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  response = await response.json();
  displayMeals(response);
  $(".loading-screen").fadeOut(300);
}

async function searchByFLetter(term) {
  closeSideNav();
  mealsData.innerHTML = "";
  $(".loading-screen").fadeIn(300);

  term == "" ? (term = "a") : "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  response = await response.json();
  displayMeals(response);
  $(".loading-screen").fadeOut(300);
}

async function getCategories() {
  mealsData.innerHTML = "";
  $(".loading-screen").fadeIn(300);
  searchContainer.innerHTML = "";

  let response = await fetch(
    `https:www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();
  console.log(response);
  displayCategories(response);
}

function displayCategories(response) {
  let cartona = "";

  for (let i = 0; i < response.categories.length; i++) {
    cartona += `<div class="col-md-3">
        <div class="meal position-relative overflow-hidden rounded-2 ">
        <img  src="${response.categories[i].strCategoryThumb}" alt="" class="w-100">
        <div class="meal-layer position-absolute text-center text-black p-2">
             <h3>${response.categories[i].strCategory}</h3>
             <p>${response.categories[i].strCategoryDescription}</p>
        </div>
    </div>
</div>`;
  }

  mealsData.innerHTML = cartona;
}

async function getMeals() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );
  response = await response.json();

  displayMeals(response);
}

getMeals();

function displayMeals(response) {
  let cartona = "";

  for (let i = 0; i < response.meals.length; i++) {
    cartona += `<div class="col-md-3">
        <div onclick="getMealDetails('${response.meals[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 ">
        <img  src="${response.meals[i].strMealThumb}" alt="" class="w-100">
        <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
             <h3>${response.meals[i].strMeal}</h3>
        </div>
    </div>
</div>`;
  }

  mealsData.innerHTML = cartona;
}

async function getMealDetails(mealID) {
  mealsData.innerHTML = "";
  $(".loading-screen").fadeIn(300);

  searchContainer.innerHTML = "";
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  respone = await respone.json();

  displayMealDetails(respone.meals[0]);
  $(".loading-screen").fadeOut(300);
}

function displayMealDetails(meal) {
  searchContainer.innerHTML = "";

  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");

  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  let cartoona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`;

  mealsData.innerHTML = cartoona;
}

// start validation section

function showContacts() {
  mealsData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `;
  submitBtn = document.getElementById("submitBtn");

  document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true;
  });

  document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true;
  });

  document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true;
  });

  document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true;
  });

  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true;
  });

  document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true;
  });
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (emailInputTouched) {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (phoneInputTouched) {
    if (phoneValidation()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (ageInputTouched) {
    if (ageValidation()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (passwordInputTouched) {
    if (passwordValidation()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (repasswordInputTouched) {
    if (repasswordValidation()) {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}

function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInput").value
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneInput").value
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageInput").value
  );
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}

function repasswordValidation() {
  return (
    document.getElementById("repasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}

// end validation section
