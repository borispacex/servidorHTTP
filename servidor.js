var http = require('http');     // modulo http
var url = require('url');        // modulo url GET
var qs = require('querystring'); // modulo POST

// crear el servidor http
var servidor = http.createServer(function(request, response) { // request: recibir
    /* OBTENEMOS LA DATA MEDIANTE EL METODO get */
    if (request.method == 'GET') {
        var respuestaGET = url.parse(request.url, true).query; // obtenemos la data por la url
        console.log('respuesta GET', respuestaGET);
        // proceso
    }
    /* OBTENEMOS LA DATA MEDIANTE el METODO post */
    if (request.method == 'POST') {
        var body = '';
        request.on('data', function(data) {
            // concatenar la data a mi variable body
            body = body + data;
            if (body.length > 1e6) {
                request.connection.destroy();   // si hay demasiados datos, desconectamos
            }
        });
        request.on('end', function(){
            var respuestaPOST = qs.parse(body);
            console.log('respuesta POST', respuestaPOST);

            console.log('Nombre: ' + respuestaPOST.nombre);

            // proceso
        });
    }
});

servidor.listen(8000); // http://127.0.0.1:8000

console.log(' -- Servidor Iniciado -- ');
console.log( ' Escuchando http://127.0.0.1:8000');