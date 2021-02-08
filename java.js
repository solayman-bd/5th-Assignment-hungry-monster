const clickResponse = () => {
  const inputText = document.getElementById("input-text").value;
  if (inputText.length > 1 || inputText == "") {
    alert("Input must be a single Character");
    document.getElementById("input-text").value = "";
  } else {
    const foodImage = document.getElementById("food-image");
    foodImage.innerHTML = "";
    const showingIngredients = document.getElementById("showing-ingredients");
    showingIngredients.innerHTML = "";

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputText}`)
      .then((res) => res.json())
      .then((data) => foodFinder(data))
      .catch((error) => errorMessage(error));
  }
};

const foodFinder = (data) => {
  errorMessageClear();
  const imageDiv = document.getElementById("image");
  imageDiv.innerHTML = "";
  const mealsName = data.meals;
  mealsName.forEach((meal) => {
    const imageDetails = document.createElement("div");
    imageDetails.className = "image-div-details";
    const mealId = meal.idMeal;
    imageDetails.setAttribute("onclick", `mealDetails(${mealId})`);
    imageDetails.innerHTML = `
            <img class="image-size p-1" src=${meal.strMealThumb}>
            <h4 class="text-center pt-2">${meal.strMeal}</h4>
            `;
    imageDiv.appendChild(imageDetails);
    document.getElementById("input-text").value = "";
  });
};

const mealDetails = (mealIdValue) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealIdValue}`)
    .then((res) => res.json())
    .then((data) => ingredientHandler(data))
    .catch((error) => errorMessage(error));
};
const ingredientHandler = (data) => {
  const foodImage = document.getElementById("food-image");
  const showingIngredients = document.getElementById("showing-ingredients");
  showingIngredients.innerHTML = "";
  foodImage.innerHTML = "";
  const requiredObject = data.meals[0];
  const heading = document.createElement("h1");
  heading.className = "text-center";
  foodImage.innerHTML = `<img class="img-fluid img-thumbnail mt-3" src="${requiredObject.strMealThumb}"> `;
  heading.innerText = `Ingredients of ${requiredObject.strMeal}`;
  showingIngredients.appendChild(heading);
  const objectKeys = Object.keys(requiredObject);
  const objectKeysLength = objectKeys.length;
  objectKeys.forEach((everyObject) => {
    for (let i = 0; i < objectKeysLength; i++) {
      if (everyObject === `strIngredient${[i]}`) {
        const myObj = `${requiredObject[everyObject]}`;
        if (myObj != "" && myObj != "null") {
          const li = document.createElement("li");
          li.innerText = `${myObj}`;
          showingIngredients.appendChild(li);
        }
      }
    }
  });
};
const errorMessage = (error) => {
  const errorMessageGiver = document.getElementById("error-message-giver");
  const errorMessageContext = document.createElement("H2");
  errorMessageContext.innerText = `Something went wrong. Please try again`;
  errorMessageGiver.appendChild(errorMessageContext);
};
const errorMessageClear = () => {
  const errorMessageGiver = (document.getElementById(
    "error-message-giver"
  ).innerHTML = "");
};
