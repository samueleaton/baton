# Baton
Like generators, but easier.   
[![GitHub version](https://badge.fury.io/gh/samueleaton%2Fbaton.svg)](http://badge.fury.io/gh/samueleaton%2Fbaton) <img src="https://img.shields.io/badge/license-MIT-blue.svg">

Baton allows you to create a chain of functions, where the function chain will only progress if the control is yielded to the next function.

```javascript
baton(function(next){
  console.log("hi.");
  next();
})
.then(function(){
  console.log("hello.");
})
.run();
```

*Note:* In the documentation, the word `next` is used to yield control to the next function, but you can use whatever word you like. This yielding of control from one function to the next is also refered to as "*passing the baton*".


**`baton()`** - takes the first function and creates a function series (chain)  
**`then()`** - takes another function and adds it to the function series  
**`run()`** - starts running the series of functions from the beginning (the beginning being the function that was defined in the `baton` method)


###Passing the Baton (yielding control)

The control will only pass to the next function if you manually yield control.

In this example, the cat will *never* eat the mouse:
```javascript
baton(function(next){
	console.log("Cat sees the mouse.");
})
.then(function(next){
  console.log("Cat eats the mouse.")
})
.run();
```

You need to run the `next` function to continue to pass the baton to the next function. Passing it in as the first parameter **only makes it available**—you still need to call it.

```javascript
baton(function(next){
	console.log("Cat sees the mouse.");
	next(); // control is passed to next block
})
.then(function(next){
  console.log("Cat eats the mouse.")
})
.run();
```

###Conditional Progression

One of the fundamental features of baton is being able to call `next` when you want to. You may find that you only want to proceed with the baton series if a certain criteria is met. 

Let's say that in this next example, we want to do the following:
- If a number is greater than 10, pass it to the next function.
- If a number is greater than 0 but less than 10, double it and pass it to the next function.
- If a number is less than 0, do nothing.

*Example*  
```javascript
var numberChecker = baton(function(next, number){
	if(number > 10) {
		next(number);
	}
	else if(number < 10 && number > 0) {
		next(number *= 2);
	}
	else { 
		console.log("Negative number is negative."); 
	}
})

.then(function(next, number){
  console.log("You gave a(n) " + number);
})

.run(11); // You gave a(n) 11
```



###Easy Piping

One of the the powerful features of baton is that it makes it easy to set up a chain of functions where you can pipe the result of one function to the next function.

#####*How?*
*Step 1*  
Pass the any number of arguments into the next function `next(someData, moreData)`

*Step 2*  
Add as many parameters as you want to the incoming parameters `function(next, firstData, secondData)`.  Note that `next` is always the first argument, all other arguments will follow.

**Example**
```javascript
baton(function(next, letter){
  data += "a";
  console.log(letter); // Sa
  next(letter);
})
.then(function(next, letters){
  letters += "m";
  console.log(letters); // Sam
  next(letters, "Eaton");
})
.then(function(next, firstName, lastName){
  firstName += "uel";
  console.log(firstName + " " + lastName); // Samuel Eaton
})
.run("S");
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
