Apart.define("testChess", ['chess'], function (Chess) {

var QUnit = window.QUnit;

QUnit.test('Chess.Square constructor with 2 arguments', function() {
    var s = new Chess.Square('a', '1');		
    QUnit.ok(s.rank, 1, 'second argument should be rank of square');
    QUnit.ok(s.file, 'a', 'first argument should be file of square');
});

});