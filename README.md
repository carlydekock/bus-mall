# Lab 13

## BusMall
Built an app to do market analysis for product options for startup BusMall. Displays potential products to individuals three at a time, side-by-side, and has the individual choose which product of the three they would be most likely to purchase. Once the individual has finished selecting, a chart renders to the page to display the data for number of votes and number of views for each product. There is also a button to display the number of clicks and views in a list format at the bottom of the page. Implemented local storage, so that the totals of views and clicks persist and allow for the display of aggregate totals for views and clicks for each product.

### Author: Carly Dekock

### Links and Resources
- Dec 14: Used this for Math.random(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
- Dec 14: Used this for includes() method for arrays: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
- Dec 14: worked at lab table with Jason Q, Anthony H, and Glenn. Had help from Ryan on our function to generate 3 unique images.
- Dec 15: Finalized button after talking through the approach to it during code review in class.
- Dec 15: Used this for Chart.js CDN: https://www.jsdelivr.com/package/npm/chart.js
- Dec 15: Used this for example code for creating a chart: https://www.chartjs.org/docs/latest/
- Dec 16: Implemented local storage according to format shown in class.

### Reflections and Comments
- Dec 14: The first part of this went well, I was able to get three images rendered to the page. It was difficult to ensure those were three unique images. With a lot of help from Ryan, we were able to get it to work, but it was definitely a stretch trying to figure out how to make it happen. 
- Dec 15: Added uniqueness for 6 images instead of 3 from yesterday. Had to troubleshoot a bit as I had the array to hold them as a local variable, instead of a global variable. When it was a local variable, 6 new indexes were randomly selected each time instead of the unshift/pop functionality working for the array to ensure the 3 displayed were unique from the next 3 displayed. The chart was interesting to implement, really cool to see the opportunities for displaying data.
- Dec 16: Implemented local storage to store the number of views and clicks to be able to persistently track totals between page refreshes, to keep track of the aggregate number of votes for each product.
- Dec 18: Finalized BusMall, cleaned up comments and code. 