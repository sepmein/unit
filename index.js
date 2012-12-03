var unit = require('./js/unit.js');

//ideal way
//classify the difference unit
//var num1 = unit.length('cm', 1);
//or / prefered, easier and naturer way to imply
//need the function to automatic classify the different unit
//a big problem to register new unit
//console.log("[Testing] getBase :"+unit.getBase(num1));

//should not know anything about 'dm' right now
//eg: unit.plus(num1,unit.create(1,'dm'));
//should emit some err
//then register a new kind of unit, which is used to describe length
//unit.register('dm', 'cm', 10);
var num1 = unit.create(20, 'cm');
var num2 = unit.create(0.6, 'm');
//console.dir(num1);
//console.dir(num2);
var result = unit.add(num1, num2);
var m1 = unit.minus(num1, num2);
var m2 = unit.minus(num2, num1);
console.log(result);
unit.changeState(result,'cm');
console.log(result);
unit.changeState(result,'m');

console.log(result);
//console.log(m1);
//console.log(m2);


//structure of the object created by unit.plus
/*	{
 *		type: 'length' // the type of the object, used for type-check . What if there is no
 *		,value: Number // value
 *		,state: 'state' // represent the current state of this value, eg:10 in cm or 0.1 in m
 *	}
 */
