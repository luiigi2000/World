let man = document.getElementById("man");
man.style.display = "none";
let consle = document.getElementById("console");
document.getElementById("menu").style.display = "none";
let people = [man];
requestAnimationFrame(movement);
let count = 0;
let xdirect = 0;
let ydirect = 0;
let state = "explore";
let attacked = false;
let targetx = 0;
let targety = 0
let opened = false;
let clone_src = "";


document.addEventListener("click", function(event){
    if(event.target == this.getElementById("open_menu") && !opened){
        document.getElementById("menu").style.display = "block";
        opened = true;
    }else if(event.target == this.getElementById("open_menu")){
        opened = false;
        document.getElementById("menu").style.display = "none";
    }else if(event.target == this.getElementById("menu_man")){
        cloned=true;
        clone_src = man;
    }else{
        if(clone_src){
            let clone = clone_src.cloneNode(false);
            clone.style.display = "block";
            clone.style.left = event.clientX + "px"; 
            clone.style.top = event.clientY + "px"; 
            clone.xdirect = Math.floor(Math.random() * 3) - 1;
            clone.ydirect = Math.floor(Math.random() * 3) - 1;
            people.push(clone)
            document.body.appendChild(clone);
        }   
    }
});


document.addEventListener("keypress", function(event){   //change to side menu
    if(event.key=="Enter"){
        for(i = 0; i < people.length; i++){
            people[i].remove();
        }
        people.length = 0;
    }else if(event.key=="a" && !attacked){
        state="attack";
        attacked = true;
    }else if(event.key=="a" && attacked){
        state="explore";
        attacked = false;
    }
});

function movement(){
    for(i = 0; i < people.length; i++){
        //change direction
        if(state=="explore"){
            if(count>Math.floor(Math.random() * 101) + 200){
                people[i].xdirect = Math.floor(Math.random() * 3) - 1;
                people[i].ydirect = Math.floor(Math.random() * 3) - 1;
                count=0;
            }
        }else if(state=="attack"){
            if(count>Math.floor(Math.random() * 101) + 200){
                people[i].xdirect = (parseInt(targetx)-parseInt(people[i].style.left))/900;             //1000 - speed, makes it too slow
                people[i].ydirect = (parseInt(targety)-parseInt(people[i].style.top))/900;             //1000 - speed, makes it too slow
                count=0;
            }
        }
        //move in that direction
        people[i].style.left = parseInt(people[i].style.left)+people[i].xdirect+"px";
        people[i].style.top = parseInt(people[i].style.top)+people[i].ydirect+"px";
        if(parseInt(people[i].style.left)<0||parseInt(people[i].style.left)>screen.width){
            people[i].style.left = parseInt(people[i].style.left)+people[i].xdirect*-1+"px";
        }
        count++;
    }
    requestAnimationFrame(movement);
}
