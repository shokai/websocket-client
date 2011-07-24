
var ws;
var logs = [];

var channel = {
    clients : [],
    subscribe : function(callback){
        if(typeof callback == 'function'){
            this.clients.push(callback);
            return this.clients.length-1;
        }
        return null;
    },
    push : function(msg){
        for(var i = 0; i < this.clients.length; i++){
            var callback = this.clients[i];
            if(typeof callback == 'function') this.clients[i](msg);
        }
    },
    unsubscribe : function(id){
        this.clients[id] = null;
    }
};

var add_panel = function(){
    var panel = $('<div>').addClass('panel');
    var input_grep = $('<input>').attr('type','text').addClass('grep').val('.*');
    var btn_close =  $('<input>').attr('type','button').addClass('btn_close').attr('value','x');
    var div_ctrls = $('<div>').append('grep : ').append(input_grep).append(btn_close);
    panel.append(div_ctrls);
    var div_log = $('<div>').addClass('log');
    panel.append(div_log);
    $('div#panels').append(panel);
    channel.subscribe(function(data){
        if(data.match(input_grep.val())) div_log.prepend($('<div>').html(data));
    });
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

    channel.subscribe(function(data){
        console.log(data);
    });

    $('input#btn_add_panel').click(add_panel);

    add_panel();
});

