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
	// body...
};

unit.add = function(o1, o2) {
	var checkType = (o1.type === o2.type);
	if(!checkType) {
		return new Error("Numbers' type should be the same");
	} else {
		var v = o1.value
		unit.create()
	}
};

unit.sum = function(arr) {

};

//helper: get base
unit.getBase = function(o) {
	//check if o is the instance of Unit
	if(Unit.isPrototypeOf(o)) {
		var b, n;
		_.each(Unit.classification, function(unitClass) {
			if(unitClass.unit === o.state) {
				b = unitClass.base;
				n++;
				return b;
			}
		});
		if(!n) {
			return new Error('getBase: cannot find the base of the given object.');
		}

	} else {
		return new Error('getBase: the argument should be a "Unit".');
	}
};

//ideal way
//classify the difference unit
//var num1 = unit.length('cm', 1);
//or / prefered, easier and naturer way to imply
//need the function to automatic classify the different unit
//a big problem to register new unit
var num1 = unit.create(1, 'cm');
console.log("  asdfasdf  "+unit.getBase(num1));

//should not know anything about 'dm' right now
//eg: unit.plus(num1,unit.create(1,'dm'));
//should emit some err
//then register a new kind of unit, which is used to describe length
unit.register('dm', 'cm', 10);
var num2 = unit.create(0.4, 'm');
console.dir(num1);
console.dir(num2);
var result = unit.add(num1, num2);

//structure of the object created by unit.plus
/*	{
 *		type: 'length' // the type of the object, used for type-check . What if there is no
 *		,value: Number // value
 *		,state: 'state' // represent the current state of this value, eg:10 in cm or 0.1 in m
 *	}
 */