function getNow() {
    return Math.floor(new Date().getTime() / 1000);
}

function timeFormat(unixTime) {
    var date = new Date(unixTime * 1000);
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
}

module.exports.getNow = getNow;
module.exports.timeFormat = timeFormat;