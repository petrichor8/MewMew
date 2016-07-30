/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var media = 0;
var logEvents = true;
var playing=false;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    }
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    ,bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    }
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    ,onDeviceReady: function() {
        app.logger('ready');
        app.initMedia();
    }
    //handle click
    ,onClick: function() {
        app.logger('mediaClick called');
        app.logger(media);
        app.playSound();
        return false;
    }
    // initialize media
    ,initMedia: function(){
        var src = "img/clip.mp3"; 
        src = app.getPhoneGapPath() + src;
        app.logger('media src: ' + src);
        media = new Media(src,app.onMediaSuccess,app.onMediaError,app.onMediaStatus);
    }
    // play media 
    ,playSound: function(){
        if(playing){app.stopSound();}
        app.logger('playSound called');
        playing=true;
        media.play();
    }
    // stop media 
    ,stopSound: function(){
        app.logger('stopSound called');
        media.stop();
        playing=false;
    }
    // get path to file
    ,getPhoneGapPath: function() {
        var path = '';
        if(device.platform == "Android"){
            path = window.location.pathname; 
            var sizefilename = path.length - (path.lastIndexOf("/")+1); 
            path = path.substr( path, path.length - sizefilename );
        }
        return path;
    }
    // log to console if global var is true
    ,logger: function(el){       
        if(logEvents){
            if(!window.console) {console = {log: function() {}}; }
            console.log(el);
        }
    }

    // media onSuccess Callback
    ,onMediaSuccess: function() {
        app.logger("onMediaSuccess called");
    }
    
    // media onError Callback 
    ,onMediaError: function(error) {
        app.logger("onMediaError called");
        app.logger(error);
        playing=false;
        //alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n\nmedia src: ' + media.src + '\n\nwindow pathname: ' + window.location.pathname);
    }

    // media onStatus Callback
    ,onMediaStatus: function(code) {
        app.logger("onMediaStatus called");
        app.logger('code: ' + code);
    }
};
