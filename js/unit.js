//underscore
var _ = require('underscore');

//var unit = require('unit');
var unit = {};

//分类分好的形式，创建变量的时候似乎需要提供类型名
//will cause some inconvinience
/*unit.classification = {
	length:{},
	volume:{}
};*/
//数组形式，较为灵活，但是单位类型多了以后似乎很难找到base为1的unit，之类的问题
unit.classification = [{
	type: 'length',
	base: 1,
	unit: 'cm'
}, {
	type: 'length',
	base: 100,
	unit: 'm'
}];
//尝试以Object为模板创建Unit，是Unit继承isPrototypeOf方法
var Unit = Object.create(Object());
Object.defineProperty(Unit, 'type', {
	writable: true,
	configurable: true,
	enumerable: true
});
Object.defineProperty(Unit, 'value', {
	writable: true,
	configurable: true,
	enumerable: true
});
Object.defineProperty(Unit, 'state', {
	writable: true,
	configurable: true,
	enumerable: true
});

unit.create = function(value, u) {
	var n = Object.create(Unit);

	var checkUnitClass = function() {
			var checker = 0;
			//if the unit created is in the list then return 1 else return 0
			_.each(unit.classification, function(unitClass) {
				//console.log(unitClass);
				//console.log(unitClass.unit + '' + u);
				if(unitClass.unit === u) {
					checker = 1;
					n.type = unitClass.type;
				}
			});
			return checker;
		}();

	if(!checkUnitClass) {
		console.log('the unit of the Number you created should be registered to the system first.');
		return new Error('The unit of your value should be registered first.');
	} else {
		n.value = value;
		n.state = u;
		return n;
	}
};

unit.register = function(n, o, relation) {

};

unit.add = function(o1, o2) {
	var checkType = (o1.type === o2.type);
	var checkState = (o1.state === o2.state);
	if(!checkType) {
		return new Error("Numbers' type should be the same");
	} else if(!checkState) {
		var n1 = o1.value;
		var b1 = unit.getBase(o1);
		var n2 = o2.value;
		var b2 = unit.getBase(o2);
		var vb1 = n1 * b1;
		var vb2 = n2 * b2;
		var vb = vb1 + vb2;
		var v;
		var middleBase = (function() {
			var mb = (b1 >= b2) ? ((b1 - b2) / 2 + b2) : ((b2 - b1) / 2 + b1);
			return mb;
		})();
		console.log(middleBase);
		console.log(vb);
		var b = "";
		if(vb >= middleBase) {
			b = (b1 >= b2) ? o1.state : o2.state;
		} else {
			b = (b1 >= b2) ? o2.state : o1.state;
		}
		if(b === o1.state) {
			v = n1 + n2 * b2 / b1;
		} else {
			v = n1 * b1 / b2 + n2;
		}
		return unit.create(v, b);
	} else {
		return unit.create((o1.value + o2.value), o1.state);
	}
};

unit.minus = function(o1, o2) {
	var checkType = (o1.type === o2.type);
	var checkState = (o1.state === o2.state);
	if(!checkType) {
		return new Error("Numbers' type should be the same");
	} else if(!checkState) {
		var n1 = o1.value;
		var b1 = unit.getBase(o1);
		var n2 = o2.value;
		var b2 = unit.getBase(o2);
		var vb1 = n1 * b1;
		var vb2 = n2 * b2;
		var vb = Math.abs(vb1 - vb2);
		var v;
		var middleBase = (function() {
			var mb = (b1 >= b2) ? ((b1 - b2) / 2 + b2) : ((b2 - b1) / 2 + b1);
			return mb;
		})();
		console.log(middleBase);
		console.log(vb);
		var b = "";
		if(vb >= middleBase) {
			b = (b1 >= b2) ? o1.state : o2.state;
		} else {
			b = (b1 >= b2) ? o2.state : o1.state;
		}
		if(b === o1.state) {
			v = n1 - n2 * b2 / b1;
		} else {
			v = n1 * b1 / b2 - n2;
		}
		return unit.create(v, b);
	} else {
		return unit.create((o1.value + o2.value), o1.state);
	}
};

unit.sum = function(arr) {
	var checker = 0;
	_.each(arr, function(a) {
		if(!Unit.isPrototypeOf(a)) {
			checker = 1;
		}
	});
	if(checker) {

	} else {
		return new Error('{ERROR}[Sum]被加数必须为Unit对象');
	}
};

//helper: get base
unit.getBase = function(o) {
	//check if o is the instance of Unit
	if(Unit.isPrototypeOf(o)) {
		var b, n = 0;
		_.each(unit.classification, function(unitClass) {
			if(unitClass.unit === o.state) {
				b = unitClass.base;
				n++;
			}
		});
		if(!n) {
			return new Error('getBase: cannot find the base of the given object.');
		} else {
			return b;
		}
	} else {
		return new Error('getBase: the argument should be a "Unit".');
	}
};

//修改为同类型的单位，
unit.changeState = function(o, state) {

};

unit.toPrec = function(num, numLength) {
	if(!isNaN(num)) {
		num = num.toPrecision(numLength);
	} else {
		num = parseFloat(num).toPrecision(numLength);
	}
};

//helper: ECMAScript clone

function clone(proto) {
	function Dummy() {}
	Dummy.prototype = proto;
	Dummy.prototype.constructor = Dummy;
	return new Dummy();
}

module.exports = unit;