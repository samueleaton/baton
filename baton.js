function baton(_init){
	
	"use strict";

	// Initiates Baton Series
	var b = function (){
		var args = [];
		for(var i = 0, ii = arguments.length; i < ii; i++){
			args.push(arguments[i]);
		}
		b.__utils__.i = -1;
		return b.next.apply(null, args);
	}

	// Adds Function to Baton Series
	b.then = function(_callback){
		if(typeof _callback === "function") b.__utils__.queue.push(_callback);
		return b;
	};

	// Runs the Next Function in the Series
	b.next = function(){
		// converts all incoming arguments into array
		var args = Array.prototype.splice.call(arguments, 0);

		// if a proceeding function has been defined (using the 'then' method)
		if(typeof b.__utils__.queue[b.__utils__.i+1] !== "undefined"){


			// add the 'next' method as first argument
			// args.unshift(b.next);

			// increment the current call index
			b.__utils__.i++;

			// run the next function
			return b.__utils__.queue[b.__utils__.i].apply({next:b.next}, args);
		}
	};

	b.__utils__ = {
		// the queue that will hold all of the function in the series
		queue:[], 

		// index starts at -1 so that the first item is index zero
		i:-1 
	};

	return Object.create(b).then(_init);
}