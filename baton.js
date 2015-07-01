function baton(_init){
	var b = {
		run:function(_input){
			b.__utils__.i = -1;
			return b.yield((_input!==undefined)?_input:null)
		},
		then: function(_callback){
			if(typeof _callback === "function") b.__utils__.queue.push(_callback);
			return b;
		},
		yield: function(_data){
			if(typeof b.__utils__.queue[b.__utils__.i+1] !== "undefined"){
				b.__utils__.i++;
				return b.__utils__.queue[b.__utils__.i](b.yield, _data);
			}
			return _data;
		},
		__utils__:{ queue:[], i:-1 }
	}; 
	return Object.create(b).then(_init);
}