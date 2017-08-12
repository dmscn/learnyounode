var fs = require('fs')
var path = require('path')

// module.exports = function(dir, ext, callback) {
//     fs.readdir(dir, function(err, files){
//         return filter(err, files, ext, callback)
//     })
// }
//
// function filter(err, files, ext, callback) {
//     ext = '.' + ext
//
//     if(err) return callback(err)
//
//     var res = new Array()
//     var i = 0
//
//     files.forEach(function(file) {
//         if(path.extname(file) === ext) {
//             res.push(file)
//         }
//     })
//
//     return callback(null, res)
// }

module.exports = function (dir, ext, callback) {
    fs.readdir(dir, function(err, list) {
        if(err) return callback(err)

        res = list.filter(function(file) {
            return path.extname(file) === '.' + ext
        })

        callback(null, list)
    })
}
