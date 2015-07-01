# Baton
Like generators, but easier.   
[![GitHub version](https://badge.fury.io/gh/samueleaton%2Fbaton.svg)](http://badge.fury.io/gh/samueleaton%2Fbaton) <img src="https://img.shields.io/badge/license-MIT-blue.svg">

<br>

Baton allows you to create a chain of functions, where the chain will be paused until the control is yielded to the next function.

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

###Conditional Progression


###Easy Piping

One of the the powerful features of baton is that it makes it easy to set up a chain of functions where you can pipe the result of one function to the next function.

#####*How?*
*Step 1*  
Pass the data into the next function `next("sam")`

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
.run("S");
```




###Returning a Result

###Re-usable Baton

###Recursive Calculations


<hr>

<br>

*still in early development - examples soon*
