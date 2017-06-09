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

        window.plugins.html5Video.initialize({
             "lvsVideo" : "lvsflyin.mp4",
             "staffordVideo" : "staffordflyin.mp4",
             "duo-hatVideo" : "inlinepowerflyin.mp4",
             "air-wedgeVideo" : "airwedgeflyin.mp4",
             "trio-quadVideo" : "trioquadflyin.mp4",
             "unoVideo" : "unoflyin.mp4",
             "retro-cVideo" : "retrocflyin.mp4"
         });
        $('.touchpoint').hover(function() { 
            var touchId = $(this).attr('id');
            $('nav ul li a.' + touchId).addClass('blue');
        }, function() {
            var touchId = $(this).attr('id');
            $('nav ul li a.' + touchId).removeClass('blue');
        });

        $('.touchpoint').on('click', function(e){
            e.preventDefault();
            var touchId = $(this).attr('id');
            var video = $('.video-playback').children('video.' + touchId)[0];
            $('nav ul li a.' + touchId).addClass('active');
            $('a.close').fadeIn();
            $('.touchpoint').each(function(){
                $(this).fadeOut();
            });
            $('.video-playback').children('video.' + touchId).show();

            if(video.paused) {
                window.plugins.html5Video.play(touchId + "Video");
                //video.play();
            }

        });
        $('nav ul li a').on('click', function() {
            var touchId = $(this).attr('class');

            $('nav ul li a').each(function() {
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
            $(this).fadeOut();
            $('.touchpoint').each(function(){
                $(this).fadeIn();
            });
            $('a.close').fadeOut();
            $('nav ul li').children('.active').removeClass('active');
        });

        $('.close').on('click', function(e){
            e.preventDefault();

            $('.touchpoint').each(function(){
                $(this).show();
            });
            $('a.close').hide();
            var activeClass = $('nav ul li').children('.active').attr('class').split(' ')[0];
            var video = $('video.' + activeClass)[0];
            
            video.pause();
            video.load();
            $('nav ul li').children('.active').removeClass('active');
            $('video.' + activeClass).hide();

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
