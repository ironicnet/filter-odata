# filter-odata

[![Build Status](https://travis-ci.org/ironicnet/filter-odata.svg?branch=master)](https://travis-ci.org/ironicnet/filter-odata)

## Synopsis

Utility script to convert a filter to a OData filter

Generates a filter using the [OData 2.0 Uri convention](http://www.odata.org/documentation/odata-version-2-0/uri-conventions/)

## Example

### Single Filter
Converts a [kendo filter](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-filter)
```json
  {
    "field":"ProductName",
    "operator":"eq",
    "value":"Stuff"
  }
```
to
```
  "ProductName eq 'Stuff'"
```
### Using aliases

```javascript
var conversor = require('filter-odata');
conversor.operators.eq.aliases.push('equal');
var filter = {
  "field":"ProductName",
  "operator":"equal",
  "value":"Stuff"
};

var filterString = conversor.ToOData();
//Outputs: "SupplierProductName eq 'Test'"
```
### Multiple filters

```json
  {
    "logic": "or",
    "filters": [{
      "field": "WarehouseProductName",
      "operator": "eq",
      "value": "Warehouse"
    }, {
      "field": "SupplierProductName",
      "operator": "eq",
      "value": "Supplier"
    }]
  }
```
to
```
  "(WarehouseProductName eq 'Warehouse') or (SupplierProductName eq 'Supplier')"
```
