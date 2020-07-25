/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

  suite('Function convertHandler.getNum(input)', function () {

    test('Whole number input', function (done) {
      const input = '32L';
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test('Decimal Input', function (done) {
      const input = '1.666666km';
      assert.equal(convertHandler.getNum(input), +eval(1.666666).toFixed(5));
      done();
    });

    test('Fractional Input', function (done) {
      const input = '2/3gal';
      assert.equal(convertHandler.getNum(input), +eval(2 / 3).toFixed(5));
      done();
    });

    test('Fractional Input w/ Decimal', function (done) {
      const input = '2.5/1.5mi';
      assert.equal(convertHandler.getNum(input), +eval(2.5 / 1.5).toFixed(5));
      done();
    });

    test('Invalid Input (double fraction)', function (done) {
      const input = '3/7.2/4lbs';
      assert.equal(convertHandler.getNum(input), "invalid number");
      done();
    });

    test('No Numerical Input', function (done) {
      const input = 'gal';
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });

  });

  suite('Function convertHandler.getUnit(input)', function () {

    test('For Each Valid Unit Inputs', function (done) {
      // Given the following units as input:
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
      // the getUnit(function) should return the following units:
      const output = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.getUnit(ele), output[i])
      });
      done();
    });

    // If the unit is not valid, the converter should respond with "invalid unit"
    test('Unknown Unit Input', function (done) {
      const input = ["20.0", "12.5 pounds", "3/5kilograms"];
      // If the unit is either missing or not in an expected format, getUnit() function should return "invalid unit"
      input.forEach((ele) => {
        assert.equal(convertHandler.getUnit(ele), "invalid unit");
      });
      done();
    });

  });
  // Test to make sure that the converter returns the correct "opposite unit" e.g. gal to l or km to mi
  suite('Function convertHandler.getReturnUnit(initUnit)', function () {

    test('For Each Valid Unit Inputs', function (done) {
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      const expect = ['l', 'gal', 'km', 'mi', 'kg', 'lbs'];
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });

  });
  // Test to make sure that the converter spells out the units e.g. 'gal' to 'gallons'.
  suite('Function convertHandler.spellOutUnit(unit)', function () {

    test('For Each Valid Unit Inputs', function (done) {
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      const output = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
      input.forEach((ele, i) => {
        assert.equal(convertHandler.spellOutUnit(ele), output[i]);
      });
      done();
    });

  });
  // To conclude, we need to make sure that the converter is returning the correct values for the conversions, to the correct tolerance level
  suite('Function convertHandler.convert(num, unit)', function () {

    test('Gal to L', function (done) {
      const input = [5, 'gal'];
      const expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
      done();
    });

    test('L to Gal', function (done) {
      const input = [5, 'l'];
      const output = 1.320860;
      assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1)
      done();
    });

    test('Mi to Km', function (done) {
      const input = [100, 'mi'];
      const output = 160.934;
      assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
      done();
    });

    test('Km to Mi', function (done) {
      const input = [320, 'km'];
      const output = 198.83927;
      assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
      done();
    });

    test('Lbs to Kg', function (done) {
      const input = [140, 'lbs'];
      const output = 63.50288;
      assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
      done();
    });

    test('Kg to Lbs', function (done) {
      const input = [80, 'kg'];
      const output = 176.36995;
      assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
      done();
    });

  });

});