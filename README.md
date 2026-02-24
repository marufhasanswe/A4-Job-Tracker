# A4-Job-Tracker

1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
   Answer:
   getElementByID: select single element and return single DOM element
   getElementsByClassName: select multiple elements and return HTML collection
   querySelector: select and return first macthing element
   querySelectorAll: select all matching element and return NodeList

2. How do you create and insert a new element into the DOM?
   Answer:
   let p = document.createElement('p');
   p.innerText = "Job Tracker";
   document.body.appendChild(p);

3. What is Event Bubbling? And how does it work?
   Answer:
   Event bubbling means when an event happens on a child element, it propagates upward to its parent element.

4. What is Event Delegation in JavaScript? Why is it useful?
   Answer:
   Event delegation means adding an event listener to a parent element instead of adding listeners to multiple child elements.

5. What is the difference between preventDefault() and stopPropagation() methods?
   Answer:
   preventDefault(): Stop the browser default behavior
   stopPropagation(): Stops the event from bubbling up to parent elements
