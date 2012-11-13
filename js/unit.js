//var unit = require('unit');
var unit = {};
unit.create = function(value, unit){

};

unit.add = function(o1, o2){
	// if is array then ~~~ else ~~~
	var checkO1Type = Array.isArray(o1);
	if(checkO1Type) {
		//is array
	} else {
		//not array

	}
}
//ideal way

//classify the difference unit

var num1 = nit.length('cm',1);
//or / prefered, easier and naturer way to imply
//need the function to automatic classify the different unit
//a big problem to register new unit
var num1 = unit.create(1,'cm');

//should not know anything about 'dm' right now
//eg: unit.plus(num1,unit.create(1,'dm'));
//should emit some err

//then register a new kind of unit, which is used to describe length
unit.register('dm','cm',10);
var num2 = unit.create(0.4,'dm') 
var result = unit.add(num1, num2);

//structure of the object created by unit.plus
/*	{
*		type: 'length' // the type of the object, used for type-check . What if there is no 
*		,value: Number // value
*		,state: 'state' // represent the current state of this value, eg:10 in cm or 0.1 in m
*	}
*/
