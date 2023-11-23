let count = 0;
setInterval(function(){
    count++;
    postMessage(count);
}, 1000);