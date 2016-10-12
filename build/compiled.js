'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}var WS=require('ws');var HOST='wss://iotmmsp1942206778trial.hanatrial.ondemand.com/com.sap.iotservices.mms/v1/api/ws/data/50f2e452-c95d-4168-920c-e07f7c8ef962';function getRandomInt(min,max){return Math.floor(Math.random()*(max-min))+min}function getRandomArbitrary(min,max){return Math.random()*(max-min)+min}var Sensor=function(){function Sensor(id_,class_,io_port_){_classCallCheck(this,Sensor);this.io_port=io_port_;this.msg={sensor_id:id_,sensor_class:class_,sensor_value:0,timestamp:'0'}}_createClass(Sensor,[{key:'readInput',value:function readInput(){this.msg.sensor_value=getRandomArbitrary(this.id*10*(1-0.05),this.id*10*(1+0.05))}},{key:'getMessage',value:function getMessage(){var sap_msg_struct={'mode':'async','messageType':'bfdb9f931da6f202de05','messages':[this.msg]};return JSON.stringify(sap_msg_struct)}},{key:'id',get:function get(){return this.msg.sensor_id}},{key:'class',get:function get(){return this.msg.sensor_class}}]);return Sensor}();var OPTIONS={headers:{Authorization:'Bearer 4c721e1eeb7e3be80d9a96c609a42fa'}};var sensors=[new Sensor('1','WATER',1),new Sensor('2','LIGHT',2)];function setupWebSocket(){var timerId=0;var ws=new WS(HOST,OPTIONS);ws.onopen=function(){console.log('opened');timerId=setInterval(function(){sensors.forEach(function(sensor){sensor.readInput();console.log('>>',sensor.msg);ws.send(sensor.getMessage())})},1000)};ws.onerror=function(err){console.log(err+'')};ws.onmessage=function(msg_){console.log('<<:',msg_.data)};ws.onclose=function(){console.log('Connection closed');clearInterval(timerId);setTimeout(setupWebSocket,1000)}}setupWebSocket();
