// ==UserScript==
// @name           Tumblr Dashboard Filter
// @namespace      http://www.vzvu3k6k.tk/
// @description    Filter your tumblr dashboard
// @include        http://www.tumblr.com/dashboard*
// ==/UserScript==

var myFilter = function(post){
    var postId = post.getAttribute("data-post-id");
    var note = post.querySelector("#note_link_current_" + postId);
    if(note == null) return;
    var note_num = parseInt(note.textContent.replace(/\D/g, "")); // 10,000 -> 10000
    return note_num > 100;
};

var Debug = true;

var style = document.createElement('style');
document.head.appendChild(style);
if(Debug)
    style.textContent = ".tdf_excluded{opacity: 0.5}";
else
    style.textContent = ".tdf_excluded{display: none}";

var filter = function(records){
    Array.prototype.forEach.call(records, function(record){
        if(record.addedNodes == null) return;
        Array.prototype.forEach.call(record.addedNodes, function(node){
            if(node.nodeType == Node.ELEMENT_NODE && node.classList.contains("post_container"))
                if(myFilter(node))
                    node.classList.add("tdf_invisible");
        });
    });
};

var target = document.querySelector('#posts');
var observer = new MutationObserver(filter);
observer.observe(target, { childList: true });
filter([{addedNodes: target.querySelectorAll(".post")}]);
