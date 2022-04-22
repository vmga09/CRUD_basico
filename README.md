# CRUD_basico

// Pruebas con funciones asincronas 

var ip = getIPs(function(ip){});

var ipCallback;
getIPs(function(ip){
    ipCallback = ip;
});
