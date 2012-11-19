(function(QUnit) {
  
  //read Named function expressions demystified for more info: http://kangax.github.com/nfe/
    
    QUnit.test("eval basic function declaration",
        function() {
          	eval("function foo() { }");
          	QUnit.ok(typeof foo == "function", "is visible after the return of the eval");
        });
    
    QUnit.test("eval basic function declaration between brackets (= function expression)",
        function() {
          	eval("(function foo() {return 1 })");
          	QUnit.ok(typeof foo == "undefined", "function not defined");
        });
    
    QUnit.test("eval basic function expression and assign to temp variable",
        function() {
          	eval("var f = (function foo() {return 1 })");
          	QUnit.ok(typeof f == "function", "temp variable is visible and of type function");
            QUnit.equal(f(), 1, "temp variable can be invoked as function");
        });
})(window.QUnit);