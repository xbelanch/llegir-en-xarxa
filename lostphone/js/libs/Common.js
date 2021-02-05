// --- Common
// --------------------------------------------------------
// Define some bunch of methods commons to all scenes

Object.defineProperty(Phaser.Structs.List.prototype, 'current', {
    get() {
        return this.getAt(this.position);
    }
});

resolvePropertyInPath = function(path, obj) {
    return path.split('.').reduce(function(prev, curr) {
        return prev ? prev[curr] : null
    }, obj || self)
}

setPropertyInPath = function(path, obj, value) {
    var schema = obj;
    var pList = path.split('.');
    var len = pList.length;
    for(var i = 0; i < len-1; i++) {
        var elem = pList[i];
        if( !schema[elem] ) schema[elem] = {}
        schema = schema[elem];
    }

    schema[pList[len-1]] = value;
}