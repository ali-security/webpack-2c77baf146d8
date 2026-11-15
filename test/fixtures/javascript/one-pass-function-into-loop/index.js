do first();
while (turns < 2);
var turns;
function first() {
	console.log("first", (turns = (turns || 0) + 1));
}
// Above, a function the loop opening the source calls prints there,
// though declared after, its call the first node printed.
// One statement called alone in a loop prints in the loop.
var count = 2;
do step();
while (count);
function step() {
	console.log("step", --count);
}
(function () {
	for (var i = 0; i < 2; i++) log();
	function log() {
		console.log("log", i);
	}
})();
// Kept in place: a parameter, `this`, `arguments`, a value read, two
// statements, a directive, a generator, an async function, a function
// moved into it and a statement opening as an object.
for (var a = 0; a < 2; a++) withParam(a);
function withParam(value) {
	console.log("param", value);
}
for (var b = 0; b < 2; b++) readsThis();
function readsThis() {
	console.log("this", typeof this);
}
for (var c = 0; c < 2; c++) readsArguments();
function readsArguments() {
	console.log("arguments", arguments.length);
}
for (var d = 0; d < 2; d++) console.log("value", valueRead());
function valueRead() {
	d += 0;
}
for (var e = 0; e < 2; e++) twoStatements();
function twoStatements() {
	console.log("two", e);
	console.log("statements");
}
for (var f = 0; f < 2; f++) directive();
function directive() {
	"use strict";
}
for (var g = 0; g < 2; g++) generator();
function* generator() {
	yield console.log("never");
}
for (var h = 0; h < 2; h++) asynchronous();
async function asynchronous() {
	console.log("async", h);
}
for (var j = 0; j < 2; j++) outer();
function outer() {
	inner();
}
function inner() {
	console.log("inner", j);
	console.log("inner again");
}
var object = { key: 0 };
for (var k = 0; k < 2; k++) opensObject();
function opensObject() {
	({ key: object.key } = { key: k });
}
console.log("object", object.key);
