(function () {"use strict";

var QUnit = window.QUnit; //import global use as local variable

QUnit.test('global async variable exists', function() {
    QUnit.ok(Async !== null);
});

var Async = window.Async;

QUnit.test('forEach: empty array', function() {
    QUnit.stop();
    Async.forEach([], function(x, callback){
        QUnit.ok(false, 'iterator should not be called');
        callback();
    }, function(){
        QUnit.ok(true, 'should call callback');
        QUnit.start();
    });
});


QUnit.test('forEach: happy days', function() {
    var anArray = ["abc", "def"];
    var iteratorCounter = 0;
    QUnit.expect(4);
    QUnit.stop();
    Async.forEach(anArray,
        function iterator(x, finishedCallback) {
            QUnit.ok((anArray.indexOf(x) == iteratorCounter), 
                'should invoke iterator in the order of the elements of the array');
            iteratorCounter++;
            finishedCallback();
        },
        function callback() {
            QUnit.ok(iteratorCounter == anArray.length, 
                'should call iterator for all the elements of the array');
            QUnit.ok(arguments.length === 0, 
                'should invoke the callback without the error argument');
            QUnit.start();
        });
});


QUnit.test('forEach: an error', function() {
    var anArray = ["abc", "def"];
    var errorFixture = 'help something went wrong';
    QUnit.expect(2);
    QUnit.stop();
    Async.forEach(anArray,
        function iterator(x, finishedCallback) {
            finishedCallback(errorFixture);
        },
        function callback(err) {
            QUnit.ok(arguments.length == 1, 
                'should invoke the callback with an error argument');
            QUnit.deepEqual(err, errorFixture, 
                'the error argument should be the same object as the one reported by the iterator');
            QUnit.start();
        });
});

QUnit.test('map: happy days', function() {
    var anArray = ["abc", "def"];
    QUnit.expect(3);
    QUnit.stop();
    Async.map(anArray, function iterator(x, finishedCallback) {
            finishedCallback(null, x.toUpperCase());
        },
        function callback(err, mappedArray) {
            QUnit.ok(err === null, 
                'callback first argument is null when no error was encountered');
            QUnit.ok(mappedArray.length = anArray.length,
                'callback second argument is an array with same length as the mapped array');
            QUnit.deepEqual(mappedArray, ["ABC", "DEF"], 
                'the array contains the results returned by the iterator in order');
            QUnit.start();
        });
});

QUnit.test('map: error', function() {
    var anArray = ["abc", "def"];
    var errorFixture = 'help something went wrong';
    QUnit.expect(1);
    QUnit.stop();
    Async.map(anArray, function iterator(x, finishedCallback) {
            finishedCallback(errorFixture);
        },
        function callback(err, mappedResulr) {
            QUnit.deepEqual(err, errorFixture, 
                'the error argument should be the same object as the one reported by the iterator');
            QUnit.start();
        });
});
})();