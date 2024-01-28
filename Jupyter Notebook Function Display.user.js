// ==UserScript==
// @name         Jupyter Notebook Function Display
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Display function definitions in a floating window that can be closed. Navigate to the definition by clicking items in the list.
// @author       TheJavaNoob
// @match        http://localhost:8888/*
// @run-at       document-idle
// @icon         https://www.google.com/s2/favicons?domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    setTimeout(function(){
        var flist = document.getElementsByClassName("ͼs");
        var float_window = document.createElement("div");
        var window_title = document.createElement("div");
        float_window.appendChild(window_title)
        for(var i = 0; i < flist.length; i++){
            if(flist[i].innerHTML == "def"){
                var new_elem = document.createElement("div");
                new_elem.className = "cm_line";
                new_elem.id = "list_" + i;
                new_elem.innerHTML = flist[i].parentNode.innerHTML;
                new_elem.onclick = function(){
                    var func_id = event.currentTarget.id.replace("list_", "func_");
                    document.getElementById(func_id).scrollIntoView();
                }
                float_window.appendChild(new_elem);

                flist[i].parentNode.parentNode.setAttribute("id", "func_" + i);
            }
        }
        float_window.setAttribute("style","position:fixed;" + "height:auto;" + "width:auto;" + "top:100px;" + "right:10px;" + "background-color:#eeeeee;" + "overflow:hidden;")
        window_title.innerText = "Close"
        window_title.setAttribute("style","width:20px;" + "height:20px;" + "font-size:10;");
        window_title.onclick = function(){
            if(float_window.style.height == "auto"){
                float_window.style.height = "20px";
                window_title.innerText = "Open";
            }else{
                float_window.style.height = "auto";
                window_title.innerText = "Close";
            }
        }
        document.getElementsByTagName("body")[0].appendChild(float_window);
    },5000);
})();