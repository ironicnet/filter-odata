var assert = require('assert');
var conversor = require('../conversor.js'); // our module

describe('Conversor', function() {
  describe('ToOData', function() {
    it('should have a ToOData Method', function() {
      assert.equal(typeof conversor, 'object');
      assert.equal(typeof conversor.ToOData, 'function');
    });
    it('should have a operators property', function() {
      assert.equal(typeof conversor, 'object');
      assert.equal(typeof conversor.operators, 'object');
    })

    it(
      "Receiving { field: 'SupplierProductName', operator: 'eq', value: 'Test' } should equal \"SupplierProductName eq 'Test'\"",
      function() {
        assert.equal(conversor.ToOData({
          field: "SupplierProductName",
          operator: "eq",
          value: "Test"
        }), "SupplierProductName eq 'Test'");
      }); // use .deepEqual for arrays see: http://stackoverflow.com/questions/13225274/

    it(
      "Receiving { field: 'SupplierProductName', operator: 'eq', value: 1 } should equal \"SupplierProductName eq 1\"",
      function() {
        assert.equal(conversor.ToOData({
          field: "SupplierProductName",
          operator: "eq",
          value: 1
        }), "SupplierProductName eq 1");
      }); // use .deepEqual for arrays see: http://stackoverflow.com/questions/13225274/

    it(
      "Receiving { field: 'SupplierProductName', operator: 'equal', value: 'Test' } should equal using alias. \"SupplierProductName eq 'Test'\"",
      function() {
        conversor.operators.eq.aliases.push('equal');
        assert.equal(conversor.ToOData({
          field: "SupplierProductName",
          operator: "equal",
          value: "Test"
        }), "SupplierProductName eq 'Test'");
      }); // use .deepEqual for arrays see: http://stackoverflow.com/questions/13225274/

    it(
      "Receiving multiple filters should concate them correctly",
      function() {

        var multiple = {
          logic: "or",
          filters: [{
            field: "WarehouseProductName",
            operator: "eq",
            value: "Warehouse"
          }, {
            field: "SupplierProductName",
            operator: "eq",
            value: "Supplier"
          }]
        };
        var expected =
          "(WarehouseProductName eq 'Warehouse') or (SupplierProductName eq 'Supplier')";
        assert.equal(conversor.ToOData(multiple), expected);
      });
  });
});
