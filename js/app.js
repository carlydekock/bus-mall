'use strict';

//global variables
//all products array
var allProducts = [];
//set variable so can easily adjust max when/if needed
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

//instantiations of products
new Product('bag', 'jpg');
new Product('banana', 'jpg');
new Product('bathroom', 'jpg');
new Product('boots', 'jpg');
new Product('breakfast', 'jpg');
new Product('bubblegum', 'jpg');
new Product('chair', 'jpg');
new Product('cthulhu', 'jpg');
new Product('dog-duck', 'jpg');
new Product('dragon', 'jpg');
new Product('pen', 'jpg');
new Product('pet-sweep', 'jpg');
new Product('scissors', 'jpg');
new Product('shark', 'jpg');
new Product('sweep', 'png');
new Product('tauntaun', 'jpg');
new Product('unicorn', 'jpg');
new Product('usb', 'gif');
new Product('water-can', 'jpg');
new Product('wine-glass', 'jpg');


//determine which product gets viewed
//get random index number of product to display - use getRandomInt
function getRandomIndex(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//with three images - need validation
//are each of the three products unique?
//assign src, alt, title to image
function renderProducts() {
  while (productsToDisplay.length < 6) {
    var tempIndex = getRandomIndex(allProducts.length);
    while (productsToDisplay.includes(tempIndex)) {
      tempIndex = getRandomIndex(allProducts.length);
    }
    productsToDisplay.unshift(tempIndex);
    // console.log(tempIndex);
  }
  // console.log(productsToDisplay);

  var productOneIndex = productsToDisplay.pop();
  var productTwoIndex = productsToDisplay.pop();
  var productThreeIndex = productsToDisplay.pop();

  // get first index
  //assign product info - product one
  imageOneElement.src = allProducts[productOneIndex].src;
  imageOneElement.alt = allProducts[productOneIndex].name;
  imageOneElement.title = allProducts[productOneIndex].name;
  //log the view - views start at 0 and get incremented with every view
  allProducts[productOneIndex].views++;

  // get second index
  //assign product info - product two
  imageTwoElement.src = allProducts[productTwoIndex].src;
  imageTwoElement.alt = allProducts[productTwoIndex].name;
  imageTwoElement.title = allProducts[productTwoIndex].name;
  //log the view - views start at 0 and get incremented with every view
  allProducts[productTwoIndex].views++;

  // //assign product info - product three
  imageThreeElement.src = allProducts[productThreeIndex].src;
  imageThreeElement.alt = allProducts[productThreeIndex].name;
  imageThreeElement.title = allProducts[productThreeIndex].name;
  // //log the view - views start at 0 and get incremented with every view
  allProducts[productThreeIndex].views++;
}

//event handler
function handleClick(event) {
  // console.log(event);
  if (event.target === myContainer) {
    alert('Click on an image, please!');
  } else {
    actualClicks++;
  }
  var clickedProduct = event.target.title;
  // console.log(clickedProduct);
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
    //#1. remove event listener
    myContainer.removeEventListener('click', handleClick);
    //#2. show results in a list - moved to buttonClick function to only display when clicked
    //Render chart now that max clicks have been reached
    renderChart();
  }
}

//Create callback function for button click
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
  // var namesArray = [];
  // var votesArray = [];
  // var viewsArray = [];
  for (var i = 0; i < allProducts.length; i++){
    namesArray.push(allProducts[i].name);
    votesArray.push(allProducts[i].votes);
    viewsArray.push(allProducts[i].views);
  }
}

//Create renderChart function - to render the chart once done clicking
function renderChart(){
  //Chart code from chart.js documentation
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


