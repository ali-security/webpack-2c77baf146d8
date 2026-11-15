// A value read once as the object of a member set folds into it.
var target = {};
var log = [];
function make(name) {
	log.push(name);
	return target;
}
function key(name) {
	log.push(name);
	return "k";
}
console.log(
	(function (value) {
		var object = make("a");
		return object.set = value;
	})(1),
	target.set
);
(function (value) {
	var object = make("b");
	object.added += value;
})(2);
// Folded in turn, each value runs where it did: the object, then the key.
console.log(
	(function (value) {
		var object = make("c");
		var name = key("d");
		var result = object[name] = value;
		return result;
	})(3),
	target.k
);
console.log(
	(function () {
		var object = make("e");
		var name = key("f");
		var result = object[name];
		return result;
	})()
);
// A key run first keeps its object's value where it is.
(function (value) {
	var name = key("g");
	var object = make("h");
	object[name] = value;
})(4);
console.log(
	(function () {
		var object = make("i");
		var name = key("j");
		return name + object.k;
	})()
);
// A top-level `const` read as long as its value prints the value.
const a = 1;
console.log(a, log.join(""));
