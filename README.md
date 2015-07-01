# Baton
Like generators, but easier.   
[![GitHub version](https://badge.fury.io/gh/samueleaton%2Fbaton.svg)](http://badge.fury.io/gh/samueleaton%2Fbaton) <img src="https://img.shields.io/badge/license-MIT-blue.svg">

Baton allows you to create a chain of functions, where the function chain will only progress if the control is yielded to the next function.

*Note:* In the documentation, the word `next` is used tp yield control to the next function, but you can use whatever you like. It is also refered to as "*passing the baton*"

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

###Passing the Baton (yielding control)

The baton (control) will only pass to the next function (specified using the `then` method) if you manually yield control.

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

You need to run the `next` function to continue to pass the baton the next function. Passing it in as the first parameter **only makes it available**, you still need to call it.

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

One of the fundamental features of baton is being able to call next when you want to. You may find that you only want to proceed with the baton series if a certain criteria is met. 

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
Pass the data into the next function `next(someData)`

*Step 2*  
Add a second parameter to the incoming parameters `function(next, data)`

**Example**
```javascript
baton(function(next, data){
  data += "a";
  console.log(data); // Sa
  next(data);
})
.then(function(next, data){
  data += "m";
  console.log(data); // Sam
})
.then(function(next, data){
  data += "uel";
  console.log(data); // Samuel
})
.run("S");
```


###Returning a Result

###Re-usable Baton

###Recursive Calculations


<hr>

<br>

*still in early development - examples soon*
