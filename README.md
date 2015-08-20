# Baton
Like generators, but easier.   
[![GitHub version](https://badge.fury.io/gh/samueleaton%2Fbaton.svg)](http://badge.fury.io/gh/samueleaton%2Fbaton) <img src="https://img.shields.io/badge/license-MIT-blue.svg">

Baton allows you to create a chain of functions, where the function chain will only progress if the control is yielded to the next function.

```javascript
baton(function(){
  console.log("hi.");
  this.next();
})
.then(function(){
  console.log("hello.");
})();
```

*Note:* `next` is used to yield control to the next function. This yielding of control from one function to the next is also referred to as "*passing the baton*".


**`baton()`** - takes the first function and creates a function series (chain)  
**`then()`** - takes another function and adds it to the function series  


###Passing the Baton (yielding control)

The control will only pass to the next function if you manually yield control.

In this example, the cat will *never* eat the mouse:
```javascript
baton(function(){
	console.log("Cat sees the mouse.");
})
.then(function(){
  console.log("Cat eats the mouse.")
})();
```

You need to run the `next` method to continue to pass the baton to the next function.  

```javascript
baton(function(){
	console.log("Cat sees the mouse.");
	this.next(); // control is passed to next block
})
.then(function(){
  console.log("Cat eats the mouse.")
})();
```

###Conditional Progression

One of the fundamental features of baton is being able to call `next` when you want to. You may find that you only want to proceed with the baton series if a certain criteria is met. 

Let's say that in this next example, we want to do the following:
- If a number is greater than 10, pass it to the next function.
- If a number is greater than 0 but less than 10, double it and pass it to the next function.
- If a number is less than 0, do nothing.

*Example*  
```javascript
var numberChecker = baton(function(number){
	if(number > 10) {
		this.next(number);
	}
	else if(number < 10 && number > 0) {
		this.next(number *= 2);
	}
	else { 
		console.log("Negative number is negative."); 
	}
})
.then(function(number){
  console.log("You gave a(n) " + number);
})

numberChecker(11); // You gave a(n) 11
```



###Easy Piping

One of the the powerful features of baton is that it makes it easy to set up a chain of functions where you can pipe the result of one function to the next function.

#####*How?*
*Step 1*  
Pass the any number of arguments into the next function `next(someData, moreData)`

*Step 2*  
Add as many parameters as you want to the incoming parameters `function(firstData, secondData)`. 

**Example**
```javascript
var myBaton = baton(function(letter){
  data += "a";
  console.log(letter); // Sa
  this.next(letter);
})
.then(function(letters){
  letters += "m";
  console.log(letters); // Sam
  this.next(letters, "Eaton");
})
.then(function(firstName, lastName){
  firstName += "uel";
  console.log(firstName + " " + lastName); // Samuel Eaton
});

myBaton("S");
```


###Returning a Result
*coming soon*

###Re-usable Baton
*coming soon*

###Recursive Calculations
*coming soon*


<hr>

<br>

*still in early development*
