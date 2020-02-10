define(function(require,exports,module){
    var msg = 'm1';
    function foo(){
        console.log(msg);
    }
    module.exports = {
        foo:foo
    }
});