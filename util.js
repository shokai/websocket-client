
String.prototype.replace_all = function(regex, replace_str, delimiter){
    if(!this.match(regex)) return this;
    tmp = this.split(delimiter);
    result = '';
    for(var i = 0; i < tmp.length; i++){
	var line;
	if(i < tmp.length-1) line = tmp[i]+delimiter;
	else line = tmp[i];
	result += line.replace(regex, replace_str);
    }
    return result;
};

String.prototype.htmlEscape = function(){
    var span = document.createElement('span');
    var txt =  document.createTextNode('');
    span.appendChild(txt);
    txt.data = this;
    return span.innerHTML;
};

