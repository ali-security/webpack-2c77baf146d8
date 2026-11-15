// In strict code, a class nobody reads prints what it runs: its primitive
// keys in order, then the names its static fields read.
var log = [];
var counter = { count: 0 };
var shared = "shared";
(function () {
	"use strict";
	class Keys {
		[counter.count++]() {}
		["a" + log.push("key")] = 1;
	}
	class Values {
		static first = shared;
		[counter.count++]() {}
		static second = counter;
	}
	(class {
		static value = shared;
		[log.push("expression")]() {}
	});
	if (log.length) {
		class Nested {
			static value = shared;
		}
	}
})();
class Outer {
	constructor(flag) {
		class Inner {
			[flag ? (this.kind = 1) : (this.kind = 2)]() {}
		}
		class Assigned {
			[(this.size = flag ? 3 : 4)]() {}
		}
	}
}
console.log(new Outer(true).kind, new Outer(false).size);
// A static field reading a name not yet set still throws there.
console.log(
	(function () {
		"use strict";
		try {
			class Early {
				static value = late;
			}
		} catch (error) {
			return error instanceof ReferenceError;
		}
		let late = 1;
		return false;
	})()
);
// Kept: a key that may convert an object, its own name read, a sloppy
// scope, `extends`, a static value running code, or `this` there.
(function () {
	"use strict";
	var key = {
		toString() {
			log.push("toString");
			return "k";
		}
	};
	class Converts {
		[key]() {}
	}
	class Self {
		static value = Self;
	}
	class Reads {
		[counter.count++]() {}
		method() {
			return Reads;
		}
	}
	class Derived extends Object {
		[counter.count++]() {}
	}
	class Runs {
		static value = log.push("static");
	}
	class This {
		static value = this;
	}
})();
(function () {
	class Sloppy {
		static value = shared;
		[counter.count++]() {}
	}
})();
console.log(log.join(), counter.count);
