var s = require('underscore.string');
module.exports = function Conversor() {
  var self = this;

  self.operators = {
    eq: {
      term: "eq",
      aliases: []
    },
    ne: {
      term: "ne",
      aliases: []
    },
    gt: {
      term: "gt",
      aliases: []
    },
    lt: {
      term: "lt",
      aliases: []
    },
    le: {
      term: "le",
      aliases: []
    },
    and: {
      term: "and",
      aliases: []
    },
    or: {
      term: "or",
      aliases: []
    },
    not: {
      term: "not",
      aliases: []
    },
  };
  self.functions = {
    substringof: {},
    endswith: {},
    startswith: {},
    //length : {}, // Not supported
    //indexof : {},// Not supported
    //replace : {}, // Not supported
    //substring : {},// Not supported
    //tolower : {},// Not supported
    //toupper : {},// Not supported
    //trim : {},// Not supported
    //concat : {},// Not supported
    //day : {},// Not supported
    //hour : {},// Not supported
    //minute : {},// Not supported
    //month : {},// Not supported
    //second : {},// Not supported
    //year : {},// Not supported
    //round : {},// Not supported
    //floor : {},// Not supported
    //ceiling : {},// Not supported
    isOf: {}
  };

  self.ToOData = function(filter) {
    var defaultOperator = "or";
    if (filter.filters) {
      var queries = [];
      var operator = self.getOperator(filter.logic || defaultOperator).term;
      for (var i = 0; i < filter.filters.length; i++) {
        queries.push("(" + self.ToOData(filter.filters[i]) + ")");
      }
      return s.join(" " + defaultOperator + " ", queries);
    } else {
      var functionConfig = self.getFunction(filter.operator);
      if (functionConfig) {

          var field = filter.field;
          var operator = self.getOperator(filter.operator).term;
          var value = self.getFilterValue(filter.value);

          return field + " " + operator + " " + value;
      } else {
        var field = filter.field;
        var operator = self.getOperator(filter.operator).term;
        var value = self.getFilterValue(filter.value);

        return field + " " + operator + " " + value;
      }
    }
  };
  self.getFilterValue = function(value) {
    return "'" + value + "'";
  };
  self.getOperator = function(name) {
    if (self.operators[name]) {
      return self.operators[name];
    }
    if (!self.operators[name]) {
      for (var operatorName in self.operators) {
        if (self.operators.hasOwnProperty(operatorName)) {
          var operator = self.operators[operatorName];
          if (operator.aliases && operator.aliases.indexOf(name) > -1) {
            return operator;
          }
        }
      }
    }
    return null;
  };
  self.getFunction = function(name) {

    if (self.functions[name]) {
      return self.functions[name];
    }
    if (!self.functions[name]) {
      for (var functionName in self.functions) {
        if (self.functions.hasOwnProperty(functionName)) {
          var functionConfig = self.functions[functionName];
          if (functionConfig.aliases && functionConfig.aliases.indexOf(name) > -1) {
            return functionConfig;
          }
        }
      }
    }
    return null;
  };
  return self;
}();
