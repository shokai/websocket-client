
var ws;
var logs = [];

var channel = {};
channel.clients = [];
channel.subscribe = function(callback){
    if(typeof callback == 'function'){
        this.clients.push(callback);
        return this.clients.length;
    }
    return null;
};
channel.push = function(msg){
    for(var i = 0; i < this.clients.length; i++){
        this.clients[i](msg);
    }
};



$(function(){
    $('input#btn_connect').click(function(){
        ws = new WebSocket("ws://"+$('input#addr').val());
        ws.onopen = function(){
            console.log('websocket connected!');
        };
        ws.onclose = function(){
            console.log('websocket closed');
        };
        ws.onmessage = function(e){
            channel.push(e.data);
        };
    });

    channel.subscribe(function(e){
        console.log(e);
    });

    channel.subscribe(function(e){
        $('#logs').prepend($('<div>').html(e));
    });
});

