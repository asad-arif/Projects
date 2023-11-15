//DOM Elements
const gridLayout = document.querySelector('.grid');
const allListItem = document.getElementById('all');

// Data
let fetchedProductArr = [];
let pageCount = 1;
const limit = 10;

//Page Load Content
window.onload = async function () {
  await fetchProducts('https://dummyjson.com/products?limit=0&skip=0');
  createPageNumbers(fetchedProductArr);
};
// Fetch data from the server
const fetchProducts = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  fetchedProductArr = data.products;
  let productDisplay = fetchedProductArr.slice(0, 10);
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

const createPageNumbers = (fetchedProductArr) => {
  let pageNumberContainer = document.getElementById('page-ul');
  if (fetchedProductArr.length < 10) {
    pageNumberContainer.innerHTML = ''; // Clear the container
  } else {
    let pageToBeCreated = Math.ceil(fetchedProductArr.length / limit);
    pageNumberContainer.innerHTML = ''; // Clear the container

    let previousLi = document.createElement('li');
    previousLi.textContent = 'Previous';
    pageNumberContainer.appendChild(previousLi);

    for (let i = 1; i <= pageToBeCreated; i++) {
      let pageLi = document.createElement('li');
      pageLi.textContent = i;
      pageNumberContainer.appendChild(pageLi);
    }

    let nextLi = document.createElement('li');
    nextLi.textContent = 'Next';
    pageNumberContainer.appendChild(nextLi);
  }
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

const clearGrid = () => {
  gridLayout.innerHTML = '';
};

const shortenDescription = (description) => {
  const words = description.split(' ');
  const first10Words = words.slice(0, 9);
  const result = first10Words.join(' ');
  return result + '..';
};
const getSkip = (pageNumber) => {
  return pageNumber * 10;
};

// Event listener for page navigation
function addPageClickListeners() {
  const pageListItems = document.querySelectorAll('#page-ul li');
  pageListItems.forEach((element) => {
    element.addEventListener('click', () => {
      const clickedPage = element.textContent;
      if (clickedPage === 'Next') {
        clearGrid();
        pageCount++;
        const skip = getSkip(pageCount);
        fetchProducts(`https://dummyjson.com/products?limit=10&skip=${skip}`);
      } else if (clickedPage === 'Previous') {
        clearGrid();
        pageCount--;
        const skip = getSkip(pageCount);
        fetchProducts(`https://dummyjson.com/products?limit=10&skip=${skip}`);
      } else {
        pageCount = parseInt(clickedPage, 10) - 1;
        const skip = getSkip(pageCount);
        clearGrid();
        fetchProducts(`https://dummyjson.com/products?limit=10&skip=${skip}`);
      }
    });
  });
}

window.setTimeout(() => {
  addPageClickListeners();
  categoryWisefetchedProductArr();
}, 1000);

async function productCategories() {
  let categoriesContainer = document.getElementById('categories');
  const response = await fetch('https://dummyjson.com/products/categories');
  const fetchedCategories = await response.json();
  for (let i = 0; i < fetchedCategories.length; i++) {
    let pageLi = document.createElement('li');
    pageLi.textContent = fetchedCategories[i];
    categoriesContainer.appendChild(pageLi);
  }
}

productCategories();

// Event listener for category selection
function categoryWisefetchedProductArr() {
  const allCategoriesList = document.querySelectorAll('.categories li');
  console.log(allCategoriesList);
  allCategoriesList.forEach((element) => {
    element.addEventListener('click', () => {
      const category = element.textContent;
      if (category === 'All') {
        clearGrid();
        pageCount = 0;
        const skip = getSkip(pageCount);
        fetchProducts(`https://dummyjson.com/products?limit=0&skip=0`);
        createPageNumbers(fetchedProductArr);
      } else {
        const url = `https://dummyjson.com/products/category/${category}`;
        clearGrid();
        fetchProducts(url);
        createPageNumbers(fetchedProductArr);
      }
    });
  });
}
