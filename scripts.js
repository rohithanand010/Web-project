const recipes = [
  {
    name: "Chicken Curry",
    image: "images/Chicken Curry.jpg",
    ingredient: "chicken",
    category: "non-veg",
    instructions: "1. Heat oil in a pan. 2. Fry onions, ginger, garlic. 3. Add spices and chicken. 4. Add water and cook until tender."
  },
  {
    name: "Tomato Pasta",
    image: "images/Tomato Pasta.jpg",
    ingredient: "tomato pasta",
    category: "veg",
    instructions: "1. Boil pasta. 2. Make tomato sauce with garlic, onion, and herbs. 3. Mix pasta with sauce and serve hot."
  },
  {
    name: "Paneer Butter Masala",
    image: "images/panner buttermasala.jpg",
    ingredient: "paneer",
    category: "veg",
    instructions: "1. Fry onions and tomatoes with spices. 2. Blend to make a paste. 3. Add cream and paneer cubes. 4. Simmer and serve."
  },
  {
    name: "Vegetable Pulao",
    image: "images/veg-pulao.jpg",
    ingredient: "rice",
    category: "veg",
    instructions: "1. Wash and soak rice. 2. Fry spices with onion, tomato, and vegetables. 3. Add rice and water. 4. Cook until fluffy."
  },
  {
    name: "Egg Omelette",
    image: "images/Egg Omelette.jpg",
    ingredient: "egg",
    category: "non-veg",
    instructions: "1. Beat eggs with salt and pepper. 2. Heat pan with oil/butter. 3. Pour mixture and cook on medium. 4. Fold and serve hot."
  },
  {
    name: "Fish Fry",
    image: "images/Fish Fry.jpg",
    ingredient: "fish",
    category: "non-veg",
    instructions: "1. Marinate fish with turmeric, chili powder, and salt. 2. Heat oil in a pan. 3. Fry fish until golden brown on both sides."
  },
  {
    name: "Masala Dosa",
    image: "images/masala dosa.jpg",
    ingredient: "dosa",
    category: "veg",
    instructions: "1. Prepare dosa batter and spread on a hot pan. 2. Fill with potato masala. 3. Fold and serve with chutney and sambar."
  },
  {
    name: "Idli Sambhar",
    image: "images/idli samber.jpg",
    ingredient: "idli",
    category: "veg",
    instructions: "1. Steam idlis in an idli stand. 2. Cook sambhar with lentils, tamarind, and spices. 3. Serve hot idlis with sambhar."
  },
  {
    name: "Mutton Biryani",
    image: "images/Mutton Biryani.jpg",
    ingredient: "mutton biryani",
    category: "non-veg",
    instructions: "1. Marinate mutton with yogurt and spices. 2. Cook with rice, saffron, and fried onions. 3. Dum cook until aromatic."
  },
  {
    name: "Palak Paneer",
    image: "images/Palak Paneer.jpg",
    ingredient: "palak",
    category: "veg",
    instructions: "1. Blanch spinach and blend into a paste. 2. Fry onion, garlic, and spices. 3. Add spinach puree and paneer cubes. 4. Simmer and serve."
  }
];

let currentFilter = "all";
let favorites = JSON.parse(localStorage.getItem("favorites")) || {};
let ratings = JSON.parse(localStorage.getItem("ratings")) || {};

// 🔍 Search
function searchRecipes() {
  const ingredient = document.getElementById("ingredient").value.toLowerCase();
  showRecipes(ingredient, currentFilter);
}

// 📌 Show recipes
function showRecipes(ingredient = "", filter = "all") {
  const recipeList = document.getElementById("recipeList");
  recipeList.innerHTML = "";

  const search = ingredient.toLowerCase();
  const filtered = recipes.filter(r =>
    (filter === "all" || r.category === filter) &&
    (r.ingredient.toLowerCase().includes(search) || r.name.toLowerCase().includes(search))
  );

  if (filtered.length === 0) {
    recipeList.innerHTML = "<p>No recipes found!</p>";
    return;
  }

  filtered.forEach(recipe => {
    const card = document.createElement("div");
    card.classList.add("recipe-card");

    let favText = favorites[recipe.name] ? "★ Favorited" : "☆ Favorite";

    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.name}">
      <h2>${recipe.name}</h2>
      <p class="badge ${recipe.category}">${recipe.category.toUpperCase()}</p>
      <button class="favorite-btn" onclick="toggleFavorite('${recipe.name}')">${favText}</button>
      <div class="rating">${renderStars(recipe.name)}</div>
    `;

    // 🛑 Prevent modal if clicking star or favorite
    card.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("favorite-btn") ||
        e.target.classList.contains("star")
      ) {
        e.stopPropagation();
        return;
      }
      openModal(recipe);
    });

    recipeList.appendChild(card);
  });
}

// 🍴 Category filter
function filterCategory(category) {
  currentFilter = category;
  showRecipes(document.getElementById("ingredient").value, currentFilter);
}

// ⭐ Favorites
function toggleFavorite(name) {
  favorites[name] = !favorites[name];
  localStorage.setItem("favorites", JSON.stringify(favorites));
  showRecipes(document.getElementById("ingredient").value, currentFilter);
}

// ⭐ Ratings
function setRating(recipeName, rating) {
  ratings[recipeName] = rating;
  localStorage.setItem("ratings", JSON.stringify(ratings));
  showRecipes(document.getElementById("ingredient").value, currentFilter);
}

function renderStars(recipeName) {
  let stars = "";
  let current = ratings[recipeName] || 0;
  for (let i = 1; i <= 5; i++) {
    stars += `<span class="star ${i <= current ? "active" : ""}" onclick="setRating('${recipeName}', ${i})">&#9733;</span>`;
  }
  return stars;
}

// 📌 Modal
function openModal(recipe) {
  const modal = document.getElementById("recipeModal");
  const modalBody = document.getElementById("modalBody");

  modalBody.innerHTML = `
    <h2>${recipe.name}</h2>
    <img src="${recipe.image}" alt="${recipe.name}">
    <p>${recipe.instructions}</p>
  `;

  modal.style.display = "flex";
}

function closeModal() {
  document.getElementById("recipeModal").style.display = "none";
}
// Dark mode toggle
function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
}

// 🟢 Restore theme on load
window.onload = () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
  showRecipes();
};
// Init
window.onload = () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
  showRecipes();
}