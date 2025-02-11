/*Variables*/
let duration = 1000 ;

let blockContainer = document.querySelector(".memory-game") ;

let blocks = Array.from(blockContainer.children);

let orderRange = [...Array(blocks.length).keys()];

document.querySelector(".control-buttons span").onclick = function() {
    let playerName;
    let namePattern = /^[A-Za-z\s]+$/;

    while (true) {
        playerName = prompt("What is your name?");

        if (playerName === null || playerName.trim() === "") {
            playerName = "Unknown";
            break;
        } else if (!namePattern.test(playerName)) {
            alert("Invalid name! Please enter letters only.");
        } else {
            break;
        }
    }
    document.querySelector(".name span").innerHTML = playerName;
    document.querySelector(".control-buttons").remove();
    document.getElementById('gameMusic').play();
};

function shuffle(array) {
    //Setting vars
    let current = array.length,
        temp,
        random;
    while(current > 0){
        random = Math.floor(Math.random() * current);
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }
    return array ;
}



shuffle(orderRange);

blocks.forEach((block , index) => {
    block.style.order = orderRange[index];
    block.addEventListener('click' , function(){
        flipBlock(block);
    })
});



function flipBlock(selectedBlock) {
    selectedBlock.classList.add('is-flipped');
    let flippedBlocks = blocks.filter(flipedBlock => flipedBlock.classList.contains('is-flipped'));
    if(flippedBlocks.length === 2) {
        /*Stop Clicking*/
        stopClicking();
        /*Check matching*/
        checkMatchedBlock(flippedBlocks[0] , flippedBlocks[1]);
    }
}

function stopClicking(){
    blockContainer.classList.add('no-clicking'); 
    setTimeout(() => {
        blockContainer.classList.remove('no-clicking');
    },duration)   
}

function checkMatchedBlock(firstBlock , secondBlock){
    let tries = document.querySelector('.tries span');
    if(firstBlock.dataset.technology === secondBlock.dataset.technology){
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');
        document.getElementById('success').play();
    }
    else{
        tries.innerHTML = parseInt(tries.innerHTML) + 1 ;
        setTimeout(()=> {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped'); 
        },duration)
        document.getElementById('failed').play();
    }
}
