/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {

  this.getNum = function (input) {
    // Gets number portion of the input: from the beggining, up until the first letter
    const val = input.slice(0, input.indexOf(input.match('[a-zA-Z]')));
    // If no number is sent on input, it defaults to 1
    if (val == '') {
      return 1;
    } else if (val.split(/\//).length > 2) { // if there is more than 1 slash(/) that means there's a double division, therefore it's an invalid number
      return 'invalid number';
    }
    return +eval(val).toFixed(5);
  };

  this.getUnit = function (input) {
    // Slice the input, from the first letter found, to the end of the string, and make it lower case
    const unit = input.slice(input.indexOf(input.match('[a-zA-Z]')), input.length).toLowerCase();
    // Make an array with the acceptable units to check later if the provided unit in the input is valid
    const acceptableUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    // returns the unit if it matches an acceptable unit, else return invalid unit
    return acceptableUnits.indexOf(unit) >= 0 ? unit : 'invalid unit';
  };

  this.getReturnUnit = function (initUnit) {
    // Create an input array with acceptable units and output array with its counterparts
    const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    const output = ['l', 'gal', 'km', 'mi', 'kg', 'lbs'];
    // check if provided unit is among the acceptable units and on which index of the created array it is
    const inputIndex = input.indexOf(initUnit);
    // returns the matching output unit if valid, else it returns invalid unit
    return inputIndex >= 0 ? output[inputIndex] : 'invalid unit';
  };

  this.spellOutUnit = function (unit) {
    // Create 2 arrays, one with the units, the other with the spelled out version of the units
    const input = ["gal", "l", "mi", "km", "lbs", "kg"];
    const output = ["gallons", "liters", "miles", "kilometers", "pounds", "kilograms"];
    // check if provided unit is among the acceptable units and on which index of the created array it is
    const inputIndex = input.indexOf(unit);
    // returns spelled out unit if match is found, else returns invalid unit
    return inputIndex >= 0 ? output[inputIndex] : 'invalid unit';
  };

  this.convert = function (initNum, initUnit) {
    // stores the rates for the conversions in an object variable
    const rates = { gal: 3.78541, l: 1 / 3.78541, lbs: 0.453592, kg: 1 / 0.453592, mi: 1.60934, km: 1 / 1.60934 }
    // check if any of the inputs are invalid
    if (initNum == 'invalid number' && initUnit == 'invalid unit') {
      return "invalid number and unit";
    } else if (initNum == 'invalid number') {
      return "invalid number";
    } else if (initUnit == 'invalid unit') {
      return "invalid unit";
    } else {
      return parseFloat((initNum * rates[initUnit]).toFixed(5)); // if inputs are valid, returns the conversion amount (parsed as a number)
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return initNum + ' ' + this.spellOutUnit(initUnit) + ' converts to ' + returnNum + ' ' + this.spellOutUnit(returnUnit);
  };

}

module.exports = ConvertHandler;
