export var keys;
(function (keys) {
    keys[keys["RETURN"] = 13] = "RETURN";
    keys[keys["SPACE"] = 32] = "SPACE";
    keys[keys["LEFT"] = 37] = "LEFT";
    keys[keys["UP"] = 38] = "UP";
    keys[keys["RIGHT"] = 39] = "RIGHT";
    keys[keys["DOWN"] = 40] = "DOWN";
    keys[keys["C"] = 67] = "C";
    keys[keys["G"] = 71] = "G";
    keys[keys["J"] = 74] = "J";
    keys[keys["K"] = 75] = "K";
})(keys || (keys = {}));
export const UNITS = 10;
export const SIZE = 50;
export const MARGIN = 60;
export const SLOWEST = 250;
export const FASTEST = 0;
// panel constants
export const PANELTOP = 150;
export const PANELLEFT = 100;
export const PANELMARGIN = 100;
export const IMAGE_DRONE = "drone-moving.gif";
export const IMAGE_BLAST = "blast.gif";
