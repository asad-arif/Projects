// Event listener for page navigation
function addPageClickListeners() {
  const pageListItems = document.querySelectorAll('.page-ul li');
  pageListItems.forEach((element) => {
    element.addEventListener('click', () => {
      const clickedPage = element.textContent;
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
    });
  });
}
addPageClickListeners();
