function baton(_init){
	var b = {
		run:function(){
			var args = Array.prototype.splice.call(arguments, 0);
			b.__utils__.i = -1;
			return b.yield.apply(null, args);
		},
		then: function(_callback){
			if(typeof _callback === "function") b.__utils__.queue.push(_callback);
			return b;
		},
		yield: function(_data){
			var args = Array.prototype.splice.call(arguments, 0);
			args.unshift(b.yield);
			if(typeof b.__utils__.queue[b.__utils__.i+1] !== "undefined"){
				b.__utils__.i++;
				return b.__utils__.queue[b.__utils__.i].apply(null, args);
			}
			return _data;
		},
		__utils__:{ queue:[], i:-1 }
	}; 
	return Object.create(b).then(_init);
}