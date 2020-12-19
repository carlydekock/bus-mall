'use strict';

//global variables
var allProducts = [];
var maxClicksAllowed = 25;
var actualClicks = 0;
var productsToDisplay = [];
var namesArray = [];
var votesArray = [];
var viewsArray = [];

//get some IDs from the DOM
var myContainer = document.getElementById('container');
var imageOneElement = document.getElementById('image-one');
var imageTwoElement = document.getElementById('image-two');
var imageThreeElement = document.getElementById('image-three');
var resultsList = document.getElementById('results');
var myButton = document.getElementById('button');
var hiddenList = document.getElementById('hidden-results');

//product constructor
//propertes = src name/alt/title views clicks
function Product(name, src = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${src}`;
  this.views = 0;
  this.votes = 0;
  allProducts.push(this);
}
//get from local storage, verification if already there, if not - instantiate products
var retrievedProducts = localStorage.getItem('products');
if (retrievedProducts) {
  allProducts = JSON.parse(retrievedProducts);
} else {
  //instantiations of products
  new Product('bag');
  new Product('banana');
  new Product('bathroom');
  new Product('boots');
  new Product('breakfast');
  new Product('bubblegum');
  new Product('chair');
  new Product('cthulhu');
  new Product('dog-duck');
  new Product('dragon');
  new Product('pen');
  new Product('pet-sweep');
  new Product('scissors');
  new Product('shark');
  new Product('sweep', 'png');
  new Product('tauntaun');
  new Product('unicorn');
  new Product('usb', 'gif');
  new Product('water-can');
  new Product('wine-glass');
}

//determine which product gets viewed
//get random index number of product to display - use getRandomInt
function getRandomIndex(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//Create function to assign product info and log the view
function renderProductImage (imageElement, productIndex){
  imageElement.src = allProducts[productIndex].src;
  imageElement.alt = allProducts[productIndex].name;
  imageElement.title = allProducts[productIndex].name;
  allProducts[productIndex].views++;
}

//with three images - need validation whether unique
//assign src, alt, title to image
function renderProducts() {
  while (productsToDisplay.length < 6) {
    var tempIndex = getRandomIndex(allProducts.length);
    while (productsToDisplay.includes(tempIndex)) {
      tempIndex = getRandomIndex(allProducts.length);
    }
    productsToDisplay.unshift(tempIndex);
  }

  var productOneIndex = productsToDisplay.pop();
  var productTwoIndex = productsToDisplay.pop();
  var productThreeIndex = productsToDisplay.pop();

  // get first index and assign info/views - product one
  renderProductImage(imageOneElement, productOneIndex);

  // get first index and assign info/views - product two
  renderProductImage(imageTwoElement, productTwoIndex);

  // get first index and assign info/views - product three
  renderProductImage(imageThreeElement, productThreeIndex);
}

//event handler
function handleClick(event) {
  if (event.target === myContainer) {
    alert('Click on an image, please!');
  } else {
    actualClicks++;
  }
  var clickedProduct = event.target.title;
  //keep track of which image and number of clicks, increment the correct clicks/votes property
  for (var i = 0; i < allProducts.length; i++) {
    if (clickedProduct === allProducts[i].name) {
      allProducts[i].votes++;
    }
  }
  //reassign image source properties and call function again
  renderProducts();

  //validation for when hit max clicks
  if (actualClicks === maxClicksAllowed) {
    //when we hit max clicks
    //remove event listener
    myContainer.removeEventListener('click', handleClick);
    //Render chart now that max clicks have been reached
    renderChart();
    //save to local storage to persist completed datasets
    var stringifiedProducts = JSON.stringify(allProducts);
    localStorage.setItem('products', stringifiedProducts);
  }
}

//callback function for button click
function buttonClick() {
  if (actualClicks === maxClicksAllowed) {
    hiddenList.style.display = 'block';

    for (var j = 0; j < allProducts.length; j++) {
      //create element
      var liElement = document.createElement('li');
      //give it content
      liElement.textContent = `${allProducts[j].name} was viewed ${allProducts[j].views} times and clicked ${allProducts[j].votes} times`;
      //append it to the DOM
      resultsList.appendChild(liElement);
    }
  } else {
    alert('Click on the products 25 times first, thank you!');
  }
  myButton.removeEventListener('click', buttonClick);
}

//executable code
//call a function that assigns the img srcs
renderProducts();

//Render arrays of product names, views, and clicks
function renderArrays() {
  for (var i = 0; i < allProducts.length; i++){
    namesArray.push(allProducts[i].name);
    votesArray.push(allProducts[i].votes);
    viewsArray.push(allProducts[i].views);
  }
}

//renderChart function - to render the chart once done clicking
function renderChart(){
  //chart code from chart.js documentation
  var ctx = document.getElementById('myChart').getContext('2d');
  renderArrays();
  var myChart = new Chart(ctx, { //eslint-disable-line
    type: 'bar',
    data: {
      labels: namesArray,
      datasets: [{
        label: '# of Votes',
        data: votesArray,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 3
      },
      {
        label: '# of Views',
        data: viewsArray,
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 3
      }]
    },
    options: {
      responsive: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

//event listener attached to the container
myContainer.addEventListener('click', handleClick);
//event listener attached to the button to display results
myButton.addEventListener('click', buttonClick);
