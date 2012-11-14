//var unit = require('unit');
var unit = {};

//分类分好的形式，创建变量的时候似乎需要提供类型名
//will cause some inconvinience
unit.classification = {
	length:{},
	volume:{}
};
//数组形式，较为灵活，但是单位类型多了以后似乎很难找到base为1的unit，之类的问题
unit.classification = [
	{
		type: 'length',
		base: 1,
		unit: 'cm'
	}，
	{
		type: 'length',
		base: 100,
		unit: 'm'
	}
];

var Unit = Object.create(null);
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

unit.create = function(value, unit) {
	var n = Object.create(Unit);
	n.
};

unit.register = function(new, old, relation) {
	// body...
};

unit.add = function(o1, o2) {


};

unit.sum = function(arr) {
	
};
//ideal way
//classify the difference unit
var num1 = nit.length('cm', 1);
//or / prefered, easier and naturer way to imply
//need the function to automatic classify the different unit
//a big problem to register new unit
var num1 = unit.create(1, 'cm');

//should not know anything about 'dm' right now
//eg: unit.plus(num1,unit.create(1,'dm'));
//should emit some err
//then register a new kind of unit, which is used to describe length
unit.register('dm', 'cm', 10);
var num2 = unit.create(0.4, 'dm')
var result = unit.add(num1, num2);

//structure of the object created by unit.plus
/*	{
 *		type: 'length' // the type of the object, used for type-check . What if there is no
 *		,value: Number // value
 *		,state: 'state' // represent the current state of this value, eg:10 in cm or 0.1 in m
 *	}
 */