const fill = document.querySelector('.fill');
const board = document.querySelector('.board');
const empties = document.querySelectorAll('.empty');

//function init() {
//    console.log('init');
//    var img = new Image();
//
//    img.onload = function(){
//    var height = img.height;
//    var width = img.width;
//
//    // code here to use the dimensions
//    }
//
//    img.src = url;
//}

//init()

// Fill Listeners
fill.addEventListener('dragstart', dragStart);
fill.addEventListener('dragend', dragEnd);

// Board Listeners
board.addEventListener('dragover', dragOverBoard);
board.addEventListener('drop', dragDropBoard);

//Loop through empties and call drag events
//for(const empty of empties) {
//    empty.addEventListener('dragover', dragOver);
//    empty.addEventListener('dragenter', dragEnter);
//    empty.addEventListener('dragleave', dragLeave);
//    empty.addEventListener('drop', dragDrop);
//}


//Drag Functions
function dragStart() {
    console.log('start');
    this.className += ' hold';
    setTimeout(() =>  this.className = 'invisible')
}

function dragEnd() {
    console.log('end');
    this.className = 'fill';
}

function dragOver(e) {
    console.log('over');
    e.preventDefault();
}


function dragEnter(e) {
    console.log('enter');
    e.preventDefault();
    this.className += ' hovered';
}

function dragLeave() {
    console.log('leave');
    this.className = 'empty';
}

function dragDrop() {
    console.log('drop');
    this.className = 'empty';
    this.append(fill);
}



function dragOverBoard(e) {
    console.log('over Board');
    e.preventDefault();
}

function dragDropBoard(e) {
    console.log('drop Board');
    console.log(e.clientY);
    console.log(e.clientX);
    console.log(fill.style.top);
    this.style.top = e.ClientX + 'px;';
    this.style.left = e.ClientY + 'px;';
}
