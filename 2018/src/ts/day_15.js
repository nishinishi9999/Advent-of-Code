"use strict";
exports.__esModule = true;
var Util = require("./util");
var Battle = /** @class */ (function () {
    function Battle(map) {
        console.log(map);
    }
    Battle.prototype.print = function () {
    };
    return Battle;
}());
function main() {
    var path = 'input/_day_15.txt';
    console.log(Util);
    var input = Util.lines(Util.read_file(path));
    var battle = new Battle(input);
    battle.print();
}
main();
