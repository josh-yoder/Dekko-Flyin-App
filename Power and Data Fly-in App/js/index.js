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
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        navigator.splashscreen.hide();
        
        //window.plugins.html5Video.initialize({
        //    "lvs" : "lvsflyins.mp4",
        //    "stafford" : "staffordflyins.mp4", 
        //    "duohat" : "inlinepowerflyins.mp4",
        //    "airwedge" : "airwedgeflyins.mp4",
        //    "trioquad" : "trioquadflyins.mp4",
        //    "uno" : "unoflyins.mp4",
        //    "retroc" : "retrocflyins.mp4" 
            
        //});  
        
        $('.touchpoint').hover(function() {
        	var touchId = $(this).attr('id');
        	$('nav ul li span.' + touchId).addClass('active');
        }, function() {
        	var touchId = $(this).attr('id'); 
        	$('nav ul li span.' + touchId).removeClass('active');
        });

        $('.touchpoint').on('click', function(e){
        	e.preventDefault();
        	var touchId = $(this).attr('id').replace('p', '');
        	var video = $('.video-playback').children('video#' + touchId)[0];
        	$('nav ul li span.' + touchId + 'p').addClass('active');
        	$('span.close, span.play, span.pause').fadeIn();
        	$('.touchpoint').each(function(){
        		$(this).fadeOut();
        	});
        	$('.video-playback').children('video#' + touchId).show();

        	//if(video.paused) {
                
                
                
        		//window.plugins.html5Video.play(touchId);
                video.play();
        	//}

        });
        $('nav ul li span').on('click', function() {
        	var touchId = $(this).attr('class');

        	$('nav ul li span').each(function() {
        		if($(this).hasClass('active')) {
        			$('.close').trigger('click');
        			$(this).removeClass('active');
        		}
        	});

        	$(this).addClass('active');

        	$('.touchpoint#' + touchId).trigger('click');
        });
        $('video').on('ended', function(){
        	var videoId = $(this).attr('class');
        	$(this).hide();
        	$('.touchpoint').each(function(){
        		$(this).fadeIn();
        	});
        	$('span.close, span.play, span.pause').fadeOut();
        	$('nav ul li').children('.active').removeClass('active');
        });

        $('.close').on('click', function(e){
        	e.preventDefault();

        	$('.touchpoint').each(function(){
        		$(this).show();
        	});
        	$('span.close, span.play, span.pause').fadeOut();
        	//var activeClass = $('nav ul li').children('.active').attr('class').split(' ')[0];
            var activeClass = $('video:visible').attr('class');
            var activeClassClean = activeClass.replace('p', '');
        	var video = $('video#' + activeClassClean)[0];
        	
        	video.pause();
        	video.load();
        	$('nav ul li').children('.active').removeClass('active');
        	$('video#' + activeClassClean).hide(); 

        });
        $('.play').on('click', function(e){
        	e.preventDefault();
            var activeClass = $('video:visible').attr('class');
            var activeClassClean = activeClass.replace('p', '');
        	var video = $('video#' + activeClassClean)[0];
        	
        	if(video.paused) {
        		video.play();
        	}
        });
        $('.pause').on('click', function(e){
        	e.preventDefault();
            var activeClass = $('video:visible').attr('class');
            var activeClassClean = activeClass.replace('p', '');
        	var video = $('video#' + activeClassClean)[0];

        	if (video.paused) {
        		   
        	} else {
        		video.pause();
        	}

        });


    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        // console.log('Received Event: ' + id);
    }
};
