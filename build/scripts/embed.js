!function(f){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=f();else if("function"==typeof define&&define.amd)define([],f);else{var g;g="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,g.Notebook=f()}}(function(){var define;return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){var ignore={columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0};module.exports=function(el,obj){for(var key in obj){var val=obj[key];"number"!=typeof val||ignore[key]||(val+="px"),el.style[key]=val}return el}},{}],2:[function(require,module,exports){var hasOwn=Object.prototype.hasOwnProperty,toString=Object.prototype.toString;module.exports=function(obj,fn,ctx){if("[object Function]"!==toString.call(fn))throw new TypeError("iterator must be a function");var l=obj.length;if(l===+l)for(var i=0;l>i;i++)fn.call(ctx,obj[i],i,obj);else for(var k in obj)hasOwn.call(obj,k)&&fn.call(ctx,obj[k],k,obj)}},{}],3:[function(require,module,exports){function Url(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}function urlParse(url,parseQueryString,slashesDenoteHost){if(url&&isObject(url)&&url instanceof Url)return url;var u=new Url;return u.parse(url,parseQueryString,slashesDenoteHost),u}function urlFormat(obj){return isString(obj)&&(obj=urlParse(obj)),obj instanceof Url?obj.format():Url.prototype.format.call(obj)}function urlResolve(source,relative){return urlParse(source,!1,!0).resolve(relative)}function urlResolveObject(source,relative){return source?urlParse(source,!1,!0).resolveObject(relative):relative}function isString(arg){return"string"==typeof arg}function isObject(arg){return"object"==typeof arg&&null!==arg}function isNull(arg){return null===arg}function isNullOrUndefined(arg){return null==arg}var punycode=require("punycode");exports.parse=urlParse,exports.resolve=urlResolve,exports.resolveObject=urlResolveObject,exports.format=urlFormat,exports.Url=Url;var protocolPattern=/^([a-z0-9.+-]+:)/i,portPattern=/:[0-9]*$/,delims=["<",">",'"',"`"," ","\r","\n","	"],unwise=["{","}","|","\\","^","`"].concat(delims),autoEscape=["'"].concat(unwise),nonHostChars=["%","/","?",";","#"].concat(autoEscape),hostEndingChars=["/","?","#"],hostnameMaxLen=255,hostnamePartPattern=/^[a-z0-9A-Z_-]{0,63}$/,hostnamePartStart=/^([a-z0-9A-Z_-]{0,63})(.*)$/,unsafeProtocol={javascript:!0,"javascript:":!0},hostlessProtocol={javascript:!0,"javascript:":!0},slashedProtocol={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},querystring=require("querystring");Url.prototype.parse=function(url,parseQueryString,slashesDenoteHost){if(!isString(url))throw new TypeError("Parameter 'url' must be a string, not "+typeof url);var rest=url;rest=rest.trim();var proto=protocolPattern.exec(rest);if(proto){proto=proto[0];var lowerProto=proto.toLowerCase();this.protocol=lowerProto,rest=rest.substr(proto.length)}if(slashesDenoteHost||proto||rest.match(/^\/\/[^@\/]+@[^@\/]+/)){var slashes="//"===rest.substr(0,2);!slashes||proto&&hostlessProtocol[proto]||(rest=rest.substr(2),this.slashes=!0)}if(!hostlessProtocol[proto]&&(slashes||proto&&!slashedProtocol[proto])){for(var hostEnd=-1,i=0;i<hostEndingChars.length;i++){var hec=rest.indexOf(hostEndingChars[i]);-1!==hec&&(-1===hostEnd||hostEnd>hec)&&(hostEnd=hec)}var auth,atSign;atSign=-1===hostEnd?rest.lastIndexOf("@"):rest.lastIndexOf("@",hostEnd),-1!==atSign&&(auth=rest.slice(0,atSign),rest=rest.slice(atSign+1),this.auth=decodeURIComponent(auth)),hostEnd=-1;for(var i=0;i<nonHostChars.length;i++){var hec=rest.indexOf(nonHostChars[i]);-1!==hec&&(-1===hostEnd||hostEnd>hec)&&(hostEnd=hec)}-1===hostEnd&&(hostEnd=rest.length),this.host=rest.slice(0,hostEnd),rest=rest.slice(hostEnd),this.parseHost(),this.hostname=this.hostname||"";var ipv6Hostname="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];if(!ipv6Hostname)for(var hostparts=this.hostname.split(/\./),i=0,l=hostparts.length;l>i;i++){var part=hostparts[i];if(part&&!part.match(hostnamePartPattern)){for(var newpart="",j=0,k=part.length;k>j;j++)newpart+=part.charCodeAt(j)>127?"x":part[j];if(!newpart.match(hostnamePartPattern)){var validParts=hostparts.slice(0,i),notHost=hostparts.slice(i+1),bit=part.match(hostnamePartStart);bit&&(validParts.push(bit[1]),notHost.unshift(bit[2])),notHost.length&&(rest="/"+notHost.join(".")+rest),this.hostname=validParts.join(".");break}}}if(this.hostname.length>hostnameMaxLen?this.hostname="":this.hostname=this.hostname.toLowerCase(),!ipv6Hostname){for(var domainArray=this.hostname.split("."),newOut=[],i=0;i<domainArray.length;++i){var s=domainArray[i];newOut.push(s.match(/[^A-Za-z0-9_-]/)?"xn--"+punycode.encode(s):s)}this.hostname=newOut.join(".")}var p=this.port?":"+this.port:"",h=this.hostname||"";this.host=h+p,this.href+=this.host,ipv6Hostname&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==rest[0]&&(rest="/"+rest))}if(!unsafeProtocol[lowerProto])for(var i=0,l=autoEscape.length;l>i;i++){var ae=autoEscape[i],esc=encodeURIComponent(ae);esc===ae&&(esc=escape(ae)),rest=rest.split(ae).join(esc)}var hash=rest.indexOf("#");-1!==hash&&(this.hash=rest.substr(hash),rest=rest.slice(0,hash));var qm=rest.indexOf("?");if(-1!==qm?(this.search=rest.substr(qm),this.query=rest.substr(qm+1),parseQueryString&&(this.query=querystring.parse(this.query)),rest=rest.slice(0,qm)):parseQueryString&&(this.search="",this.query={}),rest&&(this.pathname=rest),slashedProtocol[lowerProto]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){var p=this.pathname||"",s=this.search||"";this.path=p+s}return this.href=this.format(),this},Url.prototype.format=function(){var auth=this.auth||"";auth&&(auth=encodeURIComponent(auth),auth=auth.replace(/%3A/i,":"),auth+="@");var protocol=this.protocol||"",pathname=this.pathname||"",hash=this.hash||"",host=!1,query="";this.host?host=auth+this.host:this.hostname&&(host=auth+(-1===this.hostname.indexOf(":")?this.hostname:"["+this.hostname+"]"),this.port&&(host+=":"+this.port)),this.query&&isObject(this.query)&&Object.keys(this.query).length&&(query=querystring.stringify(this.query));var search=this.search||query&&"?"+query||"";return protocol&&":"!==protocol.substr(-1)&&(protocol+=":"),this.slashes||(!protocol||slashedProtocol[protocol])&&host!==!1?(host="//"+(host||""),pathname&&"/"!==pathname.charAt(0)&&(pathname="/"+pathname)):host||(host=""),hash&&"#"!==hash.charAt(0)&&(hash="#"+hash),search&&"?"!==search.charAt(0)&&(search="?"+search),pathname=pathname.replace(/[?#]/g,function(match){return encodeURIComponent(match)}),search=search.replace("#","%23"),protocol+host+pathname+search+hash},Url.prototype.resolve=function(relative){return this.resolveObject(urlParse(relative,!1,!0)).format()},Url.prototype.resolveObject=function(relative){if(isString(relative)){var rel=new Url;rel.parse(relative,!1,!0),relative=rel}var result=new Url;if(Object.keys(this).forEach(function(k){result[k]=this[k]},this),result.hash=relative.hash,""===relative.href)return result.href=result.format(),result;if(relative.slashes&&!relative.protocol)return Object.keys(relative).forEach(function(k){"protocol"!==k&&(result[k]=relative[k])}),slashedProtocol[result.protocol]&&result.hostname&&!result.pathname&&(result.path=result.pathname="/"),result.href=result.format(),result;if(relative.protocol&&relative.protocol!==result.protocol){if(!slashedProtocol[relative.protocol])return Object.keys(relative).forEach(function(k){result[k]=relative[k]}),result.href=result.format(),result;if(result.protocol=relative.protocol,relative.host||hostlessProtocol[relative.protocol])result.pathname=relative.pathname;else{for(var relPath=(relative.pathname||"").split("/");relPath.length&&!(relative.host=relPath.shift()););relative.host||(relative.host=""),relative.hostname||(relative.hostname=""),""!==relPath[0]&&relPath.unshift(""),relPath.length<2&&relPath.unshift(""),result.pathname=relPath.join("/")}if(result.search=relative.search,result.query=relative.query,result.host=relative.host||"",result.auth=relative.auth,result.hostname=relative.hostname||relative.host,result.port=relative.port,result.pathname||result.search){var p=result.pathname||"",s=result.search||"";result.path=p+s}return result.slashes=result.slashes||relative.slashes,result.href=result.format(),result}var isSourceAbs=result.pathname&&"/"===result.pathname.charAt(0),isRelAbs=relative.host||relative.pathname&&"/"===relative.pathname.charAt(0),mustEndAbs=isRelAbs||isSourceAbs||result.host&&relative.pathname,removeAllDots=mustEndAbs,srcPath=result.pathname&&result.pathname.split("/")||[],relPath=relative.pathname&&relative.pathname.split("/")||[],psychotic=result.protocol&&!slashedProtocol[result.protocol];if(psychotic&&(result.hostname="",result.port=null,result.host&&(""===srcPath[0]?srcPath[0]=result.host:srcPath.unshift(result.host)),result.host="",relative.protocol&&(relative.hostname=null,relative.port=null,relative.host&&(""===relPath[0]?relPath[0]=relative.host:relPath.unshift(relative.host)),relative.host=null),mustEndAbs=mustEndAbs&&(""===relPath[0]||""===srcPath[0])),isRelAbs)result.host=relative.host||""===relative.host?relative.host:result.host,result.hostname=relative.hostname||""===relative.hostname?relative.hostname:result.hostname,result.search=relative.search,result.query=relative.query,srcPath=relPath;else if(relPath.length)srcPath||(srcPath=[]),srcPath.pop(),srcPath=srcPath.concat(relPath),result.search=relative.search,result.query=relative.query;else if(!isNullOrUndefined(relative.search)){if(psychotic){result.hostname=result.host=srcPath.shift();var authInHost=result.host&&result.host.indexOf("@")>0?result.host.split("@"):!1;authInHost&&(result.auth=authInHost.shift(),result.host=result.hostname=authInHost.shift())}return result.search=relative.search,result.query=relative.query,isNull(result.pathname)&&isNull(result.search)||(result.path=(result.pathname?result.pathname:"")+(result.search?result.search:"")),result.href=result.format(),result}if(!srcPath.length)return result.pathname=null,result.search?result.path="/"+result.search:result.path=null,result.href=result.format(),result;for(var last=srcPath.slice(-1)[0],hasTrailingSlash=(result.host||relative.host)&&("."===last||".."===last)||""===last,up=0,i=srcPath.length;i>=0;i--)last=srcPath[i],"."==last?srcPath.splice(i,1):".."===last?(srcPath.splice(i,1),up++):up&&(srcPath.splice(i,1),up--);if(!mustEndAbs&&!removeAllDots)for(;up--;up)srcPath.unshift("..");!mustEndAbs||""===srcPath[0]||srcPath[0]&&"/"===srcPath[0].charAt(0)||srcPath.unshift(""),hasTrailingSlash&&"/"!==srcPath.join("/").substr(-1)&&srcPath.push("");var isAbsolute=""===srcPath[0]||srcPath[0]&&"/"===srcPath[0].charAt(0);if(psychotic){result.hostname=result.host=isAbsolute?"":srcPath.length?srcPath.shift():"";var authInHost=result.host&&result.host.indexOf("@")>0?result.host.split("@"):!1;authInHost&&(result.auth=authInHost.shift(),result.host=result.hostname=authInHost.shift())}return mustEndAbs=mustEndAbs||result.host&&srcPath.length,mustEndAbs&&!isAbsolute&&srcPath.unshift(""),srcPath.length?result.pathname=srcPath.join("/"):(result.pathname=null,result.path=null),isNull(result.pathname)&&isNull(result.search)||(result.path=(result.pathname?result.pathname:"")+(result.search?result.search:"")),result.auth=relative.auth||result.auth,result.slashes=result.slashes||relative.slashes,result.href=result.format(),result},Url.prototype.parseHost=function(){var host=this.host,port=portPattern.exec(host);port&&(port=port[0],":"!==port&&(this.port=port.substr(1)),host=host.substr(0,host.length-port.length)),host&&(this.hostname=host)}},{punycode:5,querystring:8}],4:[function(require,module,exports){!function(window){var isProperty,forEach,undef,getClass={}.toString;Kamino={},"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=Kamino),exports.Kamino=Kamino):window.Kamino=Kamino,Kamino.VERSION="0.1.0",KaminoException=function(){this.name="KaminoException",this.number=25,this.message="Uncaught Error: DATA_CLONE_ERR: Kamino Exception 25"};var isExtended=new Date(-0xc782b5b800cec);try{isExtended=-109252==isExtended.getUTCFullYear()&&0===isExtended.getUTCMonth()&&1==isExtended.getUTCDate()&&10==isExtended.getUTCHours()&&37==isExtended.getUTCMinutes()&&6==isExtended.getUTCSeconds()&&708==isExtended.getUTCMilliseconds()}catch(exception){}var charIndexBuggy="A"!="A"[0];if(!isExtended){Math.floor}(isProperty={}.hasOwnProperty)||(isProperty=function(property){var constructor,members={};return(members.__proto__=null,members.__proto__={toString:1},members).toString!=getClass?isProperty=function(property){var original=this.__proto__,result=property in(this.__proto__=null,this);return this.__proto__=original,result}:(constructor=members.constructor,isProperty=function(property){var parent=(this.constructor||constructor).prototype;return property in this&&!(property in parent&&this[property]===parent[property])}),members=null,isProperty.call(this,property)}),forEach=function(object,callback){var Properties,members,property,forEach,size=0;(Properties=function(){this.valueOf=0}).prototype.valueOf=0,members=new Properties;for(property in members)isProperty.call(members,property)&&size++;return Properties=members=null,size?forEach=2==size?function(object,callback){var property,members={},isFunction="[object Function]"==getClass.call(object);for(property in object)isFunction&&"prototype"==property||isProperty.call(members,property)||!(members[property]=1)||!isProperty.call(object,property)||callback(property)}:function(object,callback){var property,isConstructor,isFunction="[object Function]"==getClass.call(object);for(property in object)isFunction&&"prototype"==property||!isProperty.call(object,property)||(isConstructor="constructor"===property)||callback(property);(isConstructor||isProperty.call(object,property="constructor"))&&callback(property)}:(members=["valueOf","toString","toLocaleString","propertyIsEnumerable","isPrototypeOf","hasOwnProperty","constructor"],forEach=function(object,callback){var property,length,isFunction="[object Function]"==getClass.call(object);for(property in object)isFunction&&"prototype"==property||!isProperty.call(object,property)||callback(property);for(length=members.length;property=members[--length];isProperty.call(object,property)&&callback(property));}),forEach(object,callback)};var Escapes={"\\":"\\\\",'"':'\\"',"\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","	":"\\t"},toPaddedString=function(width,value){return("000000"+(value||0)).slice(-width)},quote=function(value){for(var symbol,result='"',index=0;symbol=value.charAt(index);index++)result+='\\"\b\f\n\r	'.indexOf(symbol)>-1?Escapes[symbol]:Escapes[symbol]=" ">symbol?"\\u00"+toPaddedString(2,symbol.charCodeAt(0).toString(16)):symbol;return result+'"'},isElement=function(o){return"object"==typeof HTMLElement?o instanceof HTMLElement:o&&"object"==typeof o&&1===o.nodeType&&"string"==typeof o.nodeName},serialize=function(property,object,callback,properties,whitespace,indentation,stack){var originalClassName,className,results,element,index,length,prefix,any,result,regExpSource,value=object[property],regExpModifiers="";if(value instanceof Error||value instanceof Function)throw new KaminoException;if(isElement(value))throw new KaminoException;if("object"==typeof value&&value&&(originalClassName=getClass.call(value),"[object Date]"!=originalClassName||isProperty.call(value,"toJSON")?"function"==typeof value.toJSON&&("[object Number]"!=originalClassName&&"[object String]"!=originalClassName&&"[object Array]"!=originalClassName||isProperty.call(value,"toJSON"))&&(value=value.toJSON(property)):value=value>-1/0&&1/0>value?value.toUTCString().replace("GMT","UTC"):null),callback&&(value=callback.call(object,property,value)),null===value)return"null";if(void 0!==value){if(className=getClass.call(value),"[object Boolean]"==className)return""+value;if("[object Number]"==className)return value===Number.POSITIVE_INFINITY?"Infinity":value===Number.NEGATIVE_INFINITY?"NInfinity":isNaN(value)?"NaN":""+value;if("[object RegExp]"==className)return regExpSource=value.source,regExpModifiers+=value.ignoreCase?"i":"",regExpModifiers+=value.global?"g":"",regExpModifiers+=value.multiline?"m":"",regExpSource=quote(charIndexBuggy?regExpSource.split(""):regExpSource),regExpModifiers=quote(charIndexBuggy?regExpModifiers.split(""):regExpModifiers),value="^"+regExpSource+regExpModifiers;if("[object String]"==className)return value=quote(charIndexBuggy?value.split(""):value),"[object Date]"==originalClassName&&(value="%"+value),value;if("object"==typeof value){for(length=stack.length;length--;)if(stack[length]===value)return"&"+length;if(stack.push(value),results=[],prefix=indentation,indentation+=whitespace,"[object Array]"==className){for(index=0,length=value.length;length>index;any||(any=!0),index++)element=serialize(index,value,callback,properties,whitespace,indentation,stack),results.push(element===undef?"null":element);result=any?whitespace?"[\n"+indentation+results.join(",\n"+indentation)+"\n"+prefix+"]":"["+results.join(",")+"]":"[]"}else forEach(properties||value,function(property){var element=serialize(property,value,callback,properties,whitespace,indentation,stack);element!==undef&&results.push(quote(charIndexBuggy?property.split(""):property)+":"+(whitespace?" ":"")+element),any||(any=!0)}),result=any?whitespace?"{\n"+indentation+results.join(",\n"+indentation)+"\n"+prefix+"}":"{"+results.join(",")+"}":"{}";return result}}};Kamino.stringify=function(source,filter,width){var whitespace,callback,properties;if("function"==typeof filter||"object"==typeof filter&&filter)if("[object Function]"==getClass.call(filter))callback=filter;else if("[object Array]"==getClass.call(filter)){properties={};for(var value,index=0,length=filter.length;length>index;value=filter[index++],("[object String]"==getClass.call(value)||"[object Number]"==getClass.call(value))&&(properties[value]=1));}if(width)if("[object Number]"==getClass.call(width)){if((width-=width%1)>0)for(whitespace="",width>10&&(width=10);whitespace.length<width;whitespace+=" ");}else"[object String]"==getClass.call(width)&&(whitespace=width.length<=10?width:width.slice(0,10));return serialize("",(value={},value[""]=source,value),callback,properties,whitespace,"",[])};var Index,Source,stack,fromCharCode=String.fromCharCode,Unescapes={"\\":"\\",'"':'"',"/":"/",b:"\b",t:"	",n:"\n",f:"\f",r:"\r"},abort=function(){throw Index=Source=null,SyntaxError()},parseString=function(prefix){prefix=prefix||"";var value,symbol,begin,position,source=Source,length=source.length;for(value=prefix,Index++;length>Index;)if(symbol=source[Index]," ">symbol)abort();else if("\\"==symbol)if(symbol=source[++Index],'\\"/btnfr'.indexOf(symbol)>-1)value+=Unescapes[symbol],Index++;else if("u"==symbol){for(begin=++Index,position=Index+4;position>Index;Index++)symbol=source[Index],symbol>="0"&&"9">=symbol||symbol>="a"&&"f">=symbol||symbol>="A"&&"F">=symbol||abort();value+=fromCharCode("0x"+source.slice(begin,Index))}else abort();else{if('"'==symbol)break;value+=symbol,Index++}return'"'==source[Index]?(Index++,value):void abort()},lex=function(){for(var symbol,begin,position,sign,dateString,regExpSource,regExpModifiers,source=Source,length=source.length;length>Index;)if(symbol=source[Index],"	\r\n ".indexOf(symbol)>-1)Index++;else{if("{}[]:,".indexOf(symbol)>-1)return Index++,symbol;if('"'==symbol)return parseString("@");if("%"==symbol){if(Index++,symbol=source[Index],'"'==symbol)return dateString=parseString(),new Date(dateString);abort()}else if("^"==symbol){if(Index++,symbol=source[Index],'"'==symbol&&(regExpSource=parseString(),symbol=source[Index],'"'==symbol))return regExpModifiers=parseString(),new RegExp(regExpSource,regExpModifiers);abort()}else if("&"==symbol){if(Index++,symbol=source[Index],symbol>="0"&&"9">=symbol)return Index++,stack[symbol];abort()}else{if(begin=Index,"-"==symbol&&(sign=!0,symbol=source[++Index]),symbol>="0"&&"9">=symbol){for("0"==symbol&&(symbol=source[Index+1],symbol>="0"&&"9">=symbol)&&abort(),sign=!1;length>Index&&(symbol=source[Index],symbol>="0"&&"9">=symbol);Index++);if("."==source[Index]){for(position=++Index;length>position&&(symbol=source[position],symbol>="0"&&"9">=symbol);position++);position==Index&&abort(),Index=position}if(symbol=source[Index],"e"==symbol||"E"==symbol){for(symbol=source[++Index],"+"!=symbol&&"-"!=symbol||Index++,position=Index;length>position&&(symbol=source[position],symbol>="0"&&"9">=symbol);position++);position==Index&&abort(),Index=position}return+source.slice(begin,Index)}if(sign&&abort(),"true"==source.slice(Index,Index+4))return Index+=4,!0;if("false"==source.slice(Index,Index+5))return Index+=5,!1;if("Infinity"==source.slice(Index,Index+8))return Index+=8,1/0;if("NInfinity"==source.slice(Index,Index+9))return Index+=9,-(1/0);if("NaN"==source.slice(Index,Index+3))return Index+=3,NaN;if("null"==source.slice(Index,Index+4))return Index+=4,null;abort()}}return"$"},get=function(value){var results,any;if("$"==value&&abort(),"string"==typeof value){if("@"==value[0])return value.slice(1);if("["==value){for(results=[],stack[stack.length]=results;value=lex(),"]"!=value;any||(any=!0))any&&(","==value?(value=lex(),"]"==value&&abort()):abort()),","==value&&abort(),results.push(get("string"==typeof value&&charIndexBuggy?value.split(""):value));return results}if("{"==value){for(results={},stack[stack.length]=results;value=lex(),"}"!=value;any||(any=!0)){any&&(","==value?(value=lex(),"}"==value&&abort()):abort()),","!=value&&"string"==typeof value&&"@"==value[0]&&":"==lex()||abort();var result=lex();results[value.slice(1)]=get("string"==typeof result&&charIndexBuggy?result.split(""):result)}return results}abort()}return value},update=function(source,property,callback){var element=walk(source,property,callback);element===undef?delete source[property]:source[property]=element},walk=function(source,property,callback){var length,value=source[property];if("object"==typeof value&&value)if("[object Array]"==getClass.call(value))for(length=value.length;length--;)update(value,length,callback);else forEach(value,function(property){update(value,property,callback)});return callback.call(source,property,value)};Kamino.parse=function(source,callback){var result,value;return Index=0,Source=""+source,stack=[],charIndexBuggy&&(Source=source.split("")),result=get(lex()),"$"!=lex()&&abort(),Index=Source=null,callback&&"[object Function]"==getClass.call(callback)?walk((value={},value[""]=result,value),"",callback):result},Kamino.clone=function(source){return Kamino.parse(Kamino.stringify(source))}}(this)},{}],5:[function(require,module,exports){(function(global){!function(root){function error(type){throw new RangeError(errors[type])}function map(array,fn){for(var length=array.length,result=[];length--;)result[length]=fn(array[length]);return result}function mapDomain(string,fn){var parts=string.split("@"),result="";parts.length>1&&(result=parts[0]+"@",string=parts[1]),string=string.replace(regexSeparators,".");var labels=string.split("."),encoded=map(labels,fn).join(".");return result+encoded}function ucs2decode(string){for(var value,extra,output=[],counter=0,length=string.length;length>counter;)value=string.charCodeAt(counter++),value>=55296&&56319>=value&&length>counter?(extra=string.charCodeAt(counter++),56320==(64512&extra)?output.push(((1023&value)<<10)+(1023&extra)+65536):(output.push(value),counter--)):output.push(value);return output}function ucs2encode(array){return map(array,function(value){var output="";return value>65535&&(value-=65536,output+=stringFromCharCode(value>>>10&1023|55296),value=56320|1023&value),output+=stringFromCharCode(value)}).join("")}function basicToDigit(codePoint){return 10>codePoint-48?codePoint-22:26>codePoint-65?codePoint-65:26>codePoint-97?codePoint-97:base}function digitToBasic(digit,flag){return digit+22+75*(26>digit)-((0!=flag)<<5)}function adapt(delta,numPoints,firstTime){var k=0;for(delta=firstTime?floor(delta/damp):delta>>1,delta+=floor(delta/numPoints);delta>baseMinusTMin*tMax>>1;k+=base)delta=floor(delta/baseMinusTMin);return floor(k+(baseMinusTMin+1)*delta/(delta+skew))}function decode(input){var out,basic,j,index,oldi,w,k,digit,t,baseMinusT,output=[],inputLength=input.length,i=0,n=initialN,bias=initialBias;for(basic=input.lastIndexOf(delimiter),0>basic&&(basic=0),j=0;basic>j;++j)input.charCodeAt(j)>=128&&error("not-basic"),output.push(input.charCodeAt(j));for(index=basic>0?basic+1:0;inputLength>index;){for(oldi=i,w=1,k=base;index>=inputLength&&error("invalid-input"),digit=basicToDigit(input.charCodeAt(index++)),(digit>=base||digit>floor((maxInt-i)/w))&&error("overflow"),i+=digit*w,t=bias>=k?tMin:k>=bias+tMax?tMax:k-bias,!(t>digit);k+=base)baseMinusT=base-t,w>floor(maxInt/baseMinusT)&&error("overflow"),w*=baseMinusT;out=output.length+1,bias=adapt(i-oldi,out,0==oldi),floor(i/out)>maxInt-n&&error("overflow"),n+=floor(i/out),i%=out,output.splice(i++,0,n)}return ucs2encode(output)}function encode(input){var n,delta,handledCPCount,basicLength,bias,j,m,q,k,t,currentValue,inputLength,handledCPCountPlusOne,baseMinusT,qMinusT,output=[];for(input=ucs2decode(input),inputLength=input.length,n=initialN,delta=0,bias=initialBias,j=0;inputLength>j;++j)currentValue=input[j],128>currentValue&&output.push(stringFromCharCode(currentValue));for(handledCPCount=basicLength=output.length,basicLength&&output.push(delimiter);inputLength>handledCPCount;){for(m=maxInt,j=0;inputLength>j;++j)currentValue=input[j],currentValue>=n&&m>currentValue&&(m=currentValue);for(handledCPCountPlusOne=handledCPCount+1,m-n>floor((maxInt-delta)/handledCPCountPlusOne)&&error("overflow"),delta+=(m-n)*handledCPCountPlusOne,n=m,j=0;inputLength>j;++j)if(currentValue=input[j],n>currentValue&&++delta>maxInt&&error("overflow"),currentValue==n){for(q=delta,k=base;t=bias>=k?tMin:k>=bias+tMax?tMax:k-bias,!(t>q);k+=base)qMinusT=q-t,baseMinusT=base-t,output.push(stringFromCharCode(digitToBasic(t+qMinusT%baseMinusT,0))),q=floor(qMinusT/baseMinusT);output.push(stringFromCharCode(digitToBasic(q,0))),bias=adapt(delta,handledCPCountPlusOne,handledCPCount==basicLength),delta=0,++handledCPCount}++delta,++n}return output.join("")}function toUnicode(input){return mapDomain(input,function(string){return regexPunycode.test(string)?decode(string.slice(4).toLowerCase()):string})}function toASCII(input){return mapDomain(input,function(string){return regexNonASCII.test(string)?"xn--"+encode(string):string})}var freeExports="object"==typeof exports&&exports&&!exports.nodeType&&exports,freeModule="object"==typeof module&&module&&!module.nodeType&&module,freeGlobal="object"==typeof global&&global;freeGlobal.global!==freeGlobal&&freeGlobal.window!==freeGlobal&&freeGlobal.self!==freeGlobal||(root=freeGlobal);var punycode,key,maxInt=2147483647,base=36,tMin=1,tMax=26,skew=38,damp=700,initialBias=72,initialN=128,delimiter="-",regexPunycode=/^xn--/,regexNonASCII=/[^\x20-\x7E]/,regexSeparators=/[\x2E\u3002\uFF0E\uFF61]/g,errors={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},baseMinusTMin=base-tMin,floor=Math.floor,stringFromCharCode=String.fromCharCode;if(punycode={version:"1.3.2",ucs2:{decode:ucs2decode,encode:ucs2encode},decode:decode,encode:encode,toASCII:toASCII,toUnicode:toUnicode},"function"==typeof define&&"object"==typeof define.amd&&define.amd)define("punycode",function(){return punycode});else if(freeExports&&freeModule)if(module.exports==freeExports)freeModule.exports=punycode;else for(key in punycode)punycode.hasOwnProperty(key)&&(freeExports[key]=punycode[key]);else root.punycode=punycode}(this)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],6:[function(require,module,exports){"use strict";function hasOwnProperty(obj,prop){return Object.prototype.hasOwnProperty.call(obj,prop)}module.exports=function(qs,sep,eq,options){sep=sep||"&",eq=eq||"=";var obj={};if("string"!=typeof qs||0===qs.length)return obj;var regexp=/\+/g;qs=qs.split(sep);var maxKeys=1e3;options&&"number"==typeof options.maxKeys&&(maxKeys=options.maxKeys);var len=qs.length;maxKeys>0&&len>maxKeys&&(len=maxKeys);for(var i=0;len>i;++i){var kstr,vstr,k,v,x=qs[i].replace(regexp,"%20"),idx=x.indexOf(eq);idx>=0?(kstr=x.substr(0,idx),vstr=x.substr(idx+1)):(kstr=x,vstr=""),k=decodeURIComponent(kstr),v=decodeURIComponent(vstr),hasOwnProperty(obj,k)?isArray(obj[k])?obj[k].push(v):obj[k]=[obj[k],v]:obj[k]=v}return obj};var isArray=Array.isArray||function(xs){return"[object Array]"===Object.prototype.toString.call(xs)}},{}],7:[function(require,module,exports){"use strict";function map(xs,f){if(xs.map)return xs.map(f);for(var res=[],i=0;i<xs.length;i++)res.push(f(xs[i],i));return res}var stringifyPrimitive=function(v){switch(typeof v){case"string":return v;case"boolean":return v?"true":"false";case"number":return isFinite(v)?v:"";default:return""}};module.exports=function(obj,sep,eq,name){return sep=sep||"&",eq=eq||"=",null===obj&&(obj=void 0),"object"==typeof obj?map(objectKeys(obj),function(k){var ks=encodeURIComponent(stringifyPrimitive(k))+eq;return isArray(obj[k])?map(obj[k],function(v){return ks+encodeURIComponent(stringifyPrimitive(v))}).join(sep):ks+encodeURIComponent(stringifyPrimitive(obj[k]))}).join(sep):name?encodeURIComponent(stringifyPrimitive(name))+eq+encodeURIComponent(stringifyPrimitive(obj)):""};var isArray=Array.isArray||function(xs){return"[object Array]"===Object.prototype.toString.call(xs)},objectKeys=Object.keys||function(obj){var res=[];for(var key in obj)Object.prototype.hasOwnProperty.call(obj,key)&&res.push(key);return res}},{}],8:[function(require,module,exports){"use strict";exports.decode=exports.parse=require("./decode"),exports.encode=exports.stringify=require("./encode")},{"./decode":6,"./encode":7}],9:[function(require,module,exports){(function(global){var url=require("url"),css=require("css-component"),each=require("foreach"),Kamino=require("kamino"),__slice=Array.prototype.slice,plugin=({proxy:{url:"/proxy"},envVariables:{yodaLink:"https://api.stage.yaas.io/hybris/yoda/v1",oauthService:"https://api.stage.yaas.io/hybris/oauth2/v1",accountService:"https://api.stage.yaas.io/hybris/account/v1/",marketplaceService:"https://api.stage.yaas.io/hybris/marketplace/v3",clientId:"4lfyAwV3zeskWEIzoIMxohRMVYd0YFXI",url:"http://127.0.0.1:3000/auth.html",loginCssUrl:"https://devportal.stage.yaas.io/styles/auth-iframe.css"},customLocation:{path:"./apinotebooks",devportalUrl:"http://localhost:9778/apinotebooks/",mode:"external"}}||{}).customLocation||{},MODE=plugin.mode,extend=function(obj){return each(__slice.call(arguments,1),function(source){for(var prop in source)Object.prototype.hasOwnProperty.call(source,prop)&&(obj[prop]=source[prop])}),obj},getDataAttributes=function(el){var obj={};if(el.dataset)return extend(obj,el.dataset);for(var upperCase=function(_,$0){return $0.toUpperCase()},attrs=el.attributes,i=0,l=attrs.length;l>i;i++){var attr=attrs.item(i);if("data-"===attr.nodeName.substr(0,5)){var name=attr.nodeName.substr(5).replace(/\-(\w)/,upperCase);obj[name]=attr.nodeValue}}return obj},defaultOptions={url:"external"===MODE?"/build/embed.html":url.resolve("/build/embed.html"),id:null,content:"",style:{},alias:{}},defaultStyles={
width:"100%",border:"none",display:"block",marginLeft:"auto",marginRight:"auto",padding:"0",overflow:"hidden"},Notebook=module.exports=function(el,options,styles){if(!(this instanceof Notebook))return new Notebook(el,options,styles);var notebook=this,notebookStyles=extend({},defaultStyles,styles),notebookOptions=extend({},defaultOptions,options);notebookOptions.url=url.resolve(window.location.href,notebookOptions.url),notebook._makeFrame(el,notebookOptions),notebook._styleFrame(notebookStyles),notebook.once("ready",function(){var notebook=this;this._ready=!0,this._readyFunctions&&each(this._readyFunctions,function(fn){fn.call(notebook)}),delete this._readyFunctions})};Notebook.instances=[],Notebook.subscriptions=[],Notebook.unsubscriptions=[],Notebook.subscribe=function(fn){Notebook.subscriptions.push(fn),each(Notebook.instances,fn)},Notebook.unsubscribe=function(fn){Notebook.unsubscriptions.push(fn)},Notebook.prototype._makeFrame=function(el,options){var notebook=this,frame=this.el=document.createElement("iframe");return frame.src=options.url,frame.className=options.className||"",frame.scrolling="no",frame.id="iframeNotebook",frame.Notebook=this,options.config=extend({id:options.id,url:window.location.href,embedded:!0,content:options.content},options.config),this.on("config",function(name,value){options.config[name]=value}),this.once("ready",function(){this.trigger("ready",options)}),this.once("rendered",function(){Notebook.instances.push(notebook),each(Notebook.subscriptions,function(fn){fn(notebook)})}),this.on("height",function(height){this.el.height=height}),this.on("redirect",function(location){window.location=location}),global.addEventListener("message",this._messageListener=function(e){e.source===frame.contentWindow&&(notebook._frameEvent=e,notebook.trigger.apply(notebook,Kamino.parse(e.data)))},!1),"function"==typeof el.appendChild?el.appendChild(frame):el(frame),this.window=frame.contentWindow,this.options=options,this},Notebook.prototype._styleFrame=function(styles){return css(this.el,styles),this},Notebook.prototype.exec=function(evil,done){this.once("exec",function(result){return done&&done(result)}),this.trigger("exec",evil)},Notebook.prototype.getVariable=function(key,done){this.exec(key,done)},Notebook.prototype._removeFrame=function(){return global.removeEventListener("message",this._messageListener),this.el.parentNode.removeChild(this.el),delete this.el,this},Notebook.prototype.remove=function(){for(var i=0;i<Notebook.instances.length;i++)Notebook.instances[i]===this&&(each(Notebook.unsubscriptions,function(fn){fn(Notebook.instances[i])}),i--,Notebook.instances.pop());return this.off(),this._removeFrame()},Notebook.prototype.on=function(name,fn){this._events=this._events||{};var events=this._events[name]=this._events[name]||[];return events.push(fn),this},Notebook.prototype.once=function(name,fn){var that=this;return this.on(name,function cb(){that.off(name,cb),fn.apply(this,arguments),fn=null})},Notebook.prototype.off=function(name,fn){if(!this._events||!this._events[name])return this;if(!fn)return name?delete this._events[name]:delete this._events,this;for(var events=this._events[name],i=0;i<events.length;i++)events[i]===fn&&(events.splice(i,1),i--);return events.length||delete this._events[name],this},Notebook.prototype.trigger=function(name){var args,that=this;return this._frameEvent?(delete that._frameEvent,args=__slice.call(arguments,1),this._events&&this._events[name]&&each(this._events[name].slice(),function(fn){fn.apply(that,args)}),this):(args=__slice.call(arguments,0),this.el.contentWindow.postMessage(Kamino.stringify(args),this.options.url),this)},Notebook.prototype.config=function(){this.trigger.apply(this,["config"].concat(__slice.call(arguments)))},Notebook.prototype.message=function(){this.trigger.apply(this,["message"].concat(__slice.call(arguments)))},Notebook.prototype.meta=function(){this.trigger.apply(this,["meta"].concat(__slice.call(arguments)))},Notebook.prototype.refresh=function(){this.message("refresh")},Notebook.prototype.ready=function(fn){return this._ready?fn.call(this):void(this._readyFunctions||(this._readyFunctions=[])).push(fn)},function(scripts){for(var script,i=0,l=scripts.length;l>i;i++)if(scripts[i].hasAttribute("data-notebook")){script=scripts[i];break}if(script){var el=script.parentNode;return script.getAttribute("data-notebook")&&(el=document.getElementById(script.getAttribute("data-notebook"))),script.removeAttribute("data-notebook"),new Notebook(el,getDataAttributes(script))}}(document.getElementsByTagName("script"))}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"css-component":1,foreach:2,kamino:4,url:3}]},{},[9])(9)});