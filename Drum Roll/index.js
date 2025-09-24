



//document.querySelector("button").addEventListener("click", handleClick);



//function handleClick(){
//    alert("working");}

for(var i=0;i<document.querySelectorAll(".drum").length;i++){
    document.querySelectorAll(".drum")[i].addEventListener("click", function(){
    var alp= this.innerHTML;    
    
    soundfunc(alp);
    buttonanimation(alp);
   
});}



addEventListener("keydown", function(event){
    var key=event.key;
    
    soundfunc(key);
    buttonanimation(key);
  

});



function buttonanimation(currentkey){
var but=document.querySelector("."+currentkey);
but.classList.add("pressed");
setTimeout(function(){
    but.classList.remove("pressed");
},100);
}


function soundfunc(alp){
    switch(alp){
        case "w":
            var audio = new Audio('./sounds/tom-1.mp3');
            audio.play();
        break;

        case "a":
            var audio = new Audio('./sounds/tom-2.mp3');
            audio.play();
        break;

        case "s":
            var audio = new Audio('./sounds/tom-3.mp3');
            audio.play();
        break;

        case "d":
            var audio = new Audio('./sounds/tom-4.mp3');
            audio.play();
        break;

        case "j":
            var audio = new Audio('./sounds/snare.mp3');
            audio.play();
        break;

        case "k":
            var audio = new Audio('./sounds/crash.mp3');
            audio.play();
        break;

        case "l":
            var audio = new Audio('./sounds/kick-bass.mp3');
            audio.play();
        break;

        default: console.log(this);
    }
}