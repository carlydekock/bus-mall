'use strict';

//global variables
//all products array
var allProducts = [];
//set variable so can easily adjust max when/if needed
var maxClicksAllowed = 25;
var actualClicks = 0;

//get some IDs from the DOM
var myContainer = document.getElementById('container');
var imageOneElement = document.getElementById('image-one');
var imageTwoElement = document.getElementById('image-two');
var imageThreeElement = document.getElementById('image-three');
var resultsList = document.getElementById('results');

//product constructor
//propertes = src name/alt/title views clicks
function Product(name, src = 'jpg' || 'png' || 'gif') {
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
  var productsToDisplay = [];
  while (productsToDisplay.length < 3) {
    var tempIndex = getRandomIndex(allProducts.length);
    while (productsToDisplay.includes(tempIndex)){
      tempIndex = getRandomIndex(allProducts.length);
    }
    productsToDisplay.push(tempIndex);
  }
  console.log(productsToDisplay);

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
  console.log(event);
  // actualClicks++;
  var clickedProduct = event.target.title;
  console.log(clickedProduct);
  //keep track of which image and number of clicks, increment the correct clicks/votes property
  for (var i = 0; i < allProducts.length; i++) {
    if (clickedProduct === allProducts[i].name) {
      allProducts[i].votes++;
    }
  }
  renderProducts();
}
//reassign image source properties and call function again


//validation for when hit max clicks

//when we hit max clicks
//#1. remove event listener
//#2. show results in a list
//create element
//give it content
//append it to the DOM


//executable code
//call a function that assigns the img srcs
renderProducts();

//event listener attached to the container
myContainer.addEventListener('click', handleClick);


