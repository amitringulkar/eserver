import Level from "../Level";
export default new Level(function (rows, cols) {
    var _a = [rows / 2, cols / 2], halfRows = _a[0], halfCols = _a[1];
    return [
        [[halfRows - 2, halfCols], [halfRows + 2, halfCols]],
        [[halfRows, halfCols - 2], [halfRows, halfCols + 2]],
        [[halfRows - 8, halfCols - 8], [halfRows - 3, halfCols - 3]],
        [[halfRows + 3, halfCols + 3], [halfRows + 8, halfCols + 8]],
        [[halfRows + 8, halfCols - 8], [halfRows + 3, halfCols - 3]],
        [[halfRows - 3, halfCols + 3], [halfRows - 8, halfCols + 8]],
    ];
});
