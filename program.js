// var fs = require('fs')
// var file = process.argv[2]
//
// fs.readFile(file, function (err, contents) {
//     if(err) {
//         return console.log(err);
//     }
//
//     var lines = contents.toString().split("\n").length -1
//
//     console.log(lines);
// })

// var fs = require('fs')
// var path = require('path')
//
// var folder = process.argv[2]
// var ext = "." + process.argv[3]
//
// fs.readdir(path, function(err, files) {
//     if(err) console.error(err);
//
//     files.forEach(function(file) {
//         if(path.extname(file) === ext) {
//             console.log(file);
//         }
//     })
// })

// var mod = require('./mymodule')
//
// var dir = process.argv[2]
// var ext = process.argv[3]
//
// mod(dir, ext, function(err, files) {
//     if(err) console.error(err);
//
//     files.forEach(function(file) {
//         console.log(file);
//     })
// })

// var http = require('http');
// var url = process.argv[2]
//
// http.get(url, function(response) {
//     response.setEncoding('UTF8')
//     response.on("data", console.log)
//     response.on("error", console.error)
// }).on('error', console.error)

// var http = require('http');
// var bl = require('bl');
//
// http.get(process.argv[2], function(response) {
//     response.pipe(bl(function(err, data) {
//         if(err) {
//             return console.error(err);
//         }
//         data = data.toString()
//         console.log(data.length);
//         console.log(data);
//     }))
// })

// var http = require('http');
// var bl = require('bl');
//
// var results = new Array()
// var count = 0
//
// function printResults() {
//     for (var i = 0; i < results.length; i++) {
//         console.log(results[i]);
//     }
// }
//
// function httpGet(index) {
//     http.get(process.argv[2 + index], function(response) {
//         response.pipe(bl(function(err, data) {
//             if(err) return console.error(err);
//
//             results[index] = data.toString()
//             count++
//
//             if(count === 3) {
//                 printResults()
//             }
//         }))
//     })
// }
//
// for (var i = 0; i < 3; i++) {
//     httpGet(i)
// }

// ----- meu codigo ------------
// var net = require('net')
// var date = new Date()
// var server = net.createServer(function listener(socket) {
//     var ano = date.getFullYear()
//     var mes = date.getMonth() + 101
//     var dia = date.getDate() + 100
//     var hora = date.getHours()
//     var min = date.getMinutes()
//
//     var blumberg = ano + "-" + mes.toString().substring(1) + "-" + dia.toString().substring(1) + " " + hora + ":" + min + "\n"
//
//     socket.write(blumberg)
//     socket.end()
//
// })
// server.listen(process.argv[2])

// ----- official code --------
// var net = require('net')
//
// function zeroFill(i) {
//     return (i < 10? '0' : '') + i
// }
//
// function now() {
//     var d = new Date()
//     return d.getFullYear() + '-' +
//         zeroFill(d.getMonth() + 1) + '-' +
//         zeroFill(d.getDate()) + ' ' +
//         zeroFill(d.getHours()) + ':' +
//         zeroFill(d.getMinutes())
// }
//
// var server = net.createServer(function (socket) {
//     socket.end(now() + '\n')
// })
//
// server.listen(Number(process.argv[2]))

// -------- my code ------------
// var fs = require('fs')
// var http = require('http')
// var server = http.createServer(function (req, res) {
//     var file = fs.createReadStream(process.argv[3])
//     file.pipe(res)
// })
// server.listen(Number(process.argv[2]))

// ------ official code -------
// var http = require('http');
// var fs = require('fs');
//
// var server = http.createServer(function (req, res) {
//     res.writeHead(200, { 'content-type' : 'text/plain' })
//
//     fs.createReadStream(process.argv[3]).pipe(res)
// })
//
// server.listen(Number(process.argv[2]))

// var http = require('http')
// var map = require('through2-map')
//
// var server = http.createServer(function (req, res) {
//     if(req.method == 'POST') {
//         req.pipe(map(function (chunk) {
//             return chunk.toString().toUpperCase();
//         })).pipe(res)
//     }
// })
//
// server.listen(Number(process.argv[2]))

var http = require('http')
var url = require('url')

function parsetime (time) {
    return {
        'hour' : time.getHours(),
        'minute' : time.getMinutes(),
        'second' : time.getSeconds()
    }
}

function unixtime (time) {
    return { 'unixtime' : time.getTime() }
}

var server = http.createServer(function (req, res) {
    var parsedUrl = url.parse(req.url, true)
    var time = new Date(parsedUrl.query.iso)
    var result

    if(parsedUrl.pathname === '/api/parsetime') {
        result = parsetime(time)
    } else if(parsedUrl.pathname === '/api/unixtime') {
        result = unixtime(time)
    }

    if(result) {
        res.writeHead(200, { 'Content-Type' : 'application/json' })
        res.end(JSON.stringify(result))
    } else {
        res.writeHead(404)
        res.end()
    }
})

server.listen(process.argv[2])
