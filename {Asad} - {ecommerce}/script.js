// DOM Elements
const gridLayout = document.querySelector('.grid');
const allListItem = document.getElementById('all');

// Data
let productDisplay = [];
let pageCount = 0;

//Page Load Content
window.onload = function () {
  main('https://dummyjson.com/products?limit=10&skip=0');
};
// Fetch data from the server
const fetchProducts = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  productDisplay = data.products;
};

// Create product cards for the grid
const createProductCard = (thumbnail, title, description, rating, price) => {
  const card = document.createElement('div');
  card.className = 'card';

  const productImage = document.createElement('img');
  productImage.src = thumbnail;

  const productTitle = document.createElement('h4');
  productTitle.textContent = title;

  const productDescription = document.createElement('p');
  productDescription.textContent = shortenDescription(description);

  const ratingPriceContainer = document.createElement('div');
  ratingPriceContainer.className = 'rating-price';

  const productRating = document.createElement('span');
  productRating.textContent = rating;

  const productPrice = document.createElement('span');
  productPrice.textContent = '$' + price;

  ratingPriceContainer.appendChild(productRating);
  ratingPriceContainer.appendChild(productPrice);

  card.appendChild(productImage);
  card.appendChild(productTitle);
  card.appendChild(productDescription);
  card.appendChild(ratingPriceContainer);

  gridLayout.appendChild(card);
};

// Main function
const main = async (url) => {
  await fetchProducts(url);
  productDisplay.forEach((product) => {
    createProductCard(
      product.thumbnail,
      product.title,
      shortenDescription(product.description),
      product.rating,
      product.price
    );
  });
};

// Event listener for category selection
function addCategoryClickListeners() {
  const categoryListItems = document.querySelectorAll('.cat li');
  categoryListItems.forEach((element) => {
    element.addEventListener('click', () => {
      const category = element.textContent;
      handleCategorySelection(category);
    });
  });
}
addCategoryClickListeners();

// Handle category selection
const handleCategorySelection = (category) => {
  if (category === 'All') {
    clearGrid();
    pageCount = 0;
    const skip = getSkip(pageCount);
    main(`https://dummyjson.com/products?limit=10&skip=${skip}`);
  } else {
    const url = `https://dummyjson.com/products/category/${category}`;
    clearGrid();
    main(url);
  }
};

// Event listener for page navigation
function addPageClickListeners() {
  const pageListItems = document.querySelectorAll('.page-ul li');
  pageListItems.forEach((element) => {
    element.addEventListener('click', () => {
      const clickedPage = element.textContent;
      handlePageNavigation(clickedPage);
    });
  });
}
addPageClickListeners();

// Handle page navigation
const handlePageNavigation = (clickedPage) => {
  if (clickedPage === 'Next') {
    clearGrid();
    pageCount++;
    const skip = getSkip(pageCount);
    main(`https://dummyjson.com/products?limit=10&skip=${skip}`);
  } else if (clickedPage === 'Previous') {
    clearGrid();
    pageCount--;
    const skip = getSkip(pageCount);
    main(`https://dummyjson.com/products?limit=10&skip=${skip}`);
  } else {
    const skip = parseInt(clickedPage, 10) - 1;
    pageCount = skip;
    clearGrid();
    main(`https://dummyjson.com/products?limit=10&skip=${skip}`);
  }
};

// Clear the grid
const clearGrid = () => {
  gridLayout.innerHTML = '';
};

// Shorten product description
const shortenDescription = (description) => {
  const words = description.split(' ');
  const first10Words = words.slice(0, 10);
  const result = first10Words.join(' ');
  return result + '...';
};

// Calculate the skip value for pagination
const getSkip = (pageCount) => {
  return pageCount * 10;
};
