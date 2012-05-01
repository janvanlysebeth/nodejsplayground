(function(QUnit) {
    "use strict";
    
    QUnit.test("basic split",
        function() {
            var s = "foo=fooValue&bar=barValue";
            var tupples = s.split("&");
            QUnit.ok(tupples.length == 2);
            QUnit.equal(tupples[0], "foo=fooValue");
            QUnit.equal(tupples[1], "bar=barValue");
        });
        
    QUnit.test("split: separator not found",
        function() {
            var s = "foo";
            var tupples = s.split("&");
            QUnit.ok(tupples.length == 1);
            QUnit.equal(tupples[0], "foo");
        });
        
    QUnit.test("split: consecutive separators",
        function() {
            var s = "foo&&";
            var tupples = s.split("&");
            QUnit.ok(tupples.length == 3);
            QUnit.equal(tupples[0], "foo");
            QUnit.equal(tupples[1], "");
            QUnit.equal(tupples[2], "");
        });
})(window.QUnit);