import Level from "../Level";
export default new Level(function (rows, cols) {
    var _a = [rows / 2, cols / 2], halfRows = _a[0], halfCols = _a[1];
    return [
        [[3, 3], [rows - 3, cols - 3]],
        [[rows - 3, 3], [3, cols - 3]]
    ];
});
