define(['m1'],function(m1){
    var msg = 'm2-amd';
    function show(){
        console.log(msg,m1.getName());
    }
    return {show};
})