var heroes = document.querySelectorAll('.hero');
var monsters = document.querySelectorAll('.monster');
const addHeroButton = document.querySelector('.addHero');
const addMonsterButton = document.querySelector('.addMonster');
var isMoving = false;

(()=> {

    const sock = io();

    addHeroButton.addEventListener('mousedown', () => sock.emit('addHero'));
    
    addMonsterButton.addEventListener('mousedown', () => sock.emit('addMonster'));
    
    for (let hero of heroes) {
        hero.addEventListener('mousedown', (e) => sock.emit('mouseDown', { ele: hero.id, oriX: e.clientX, oriY: e.clientY }));
    }

    for (let monster of monsters) {
        monster.addEventListener('mousedown', () => sock.emit('mouseDown', { ele: monster.id, oriX: e.clientX, oriY: e.clientY }));
    }
    
    window.addEventListener('mousemove', (e) => {
        if (isMoving === true) {
            newX = e.clientX;
            newY = e.clientY;
            sock.emit('mouseMove', {ele:eleID, oriX:prevX, oriY:prevY, destX:newX, destY:newY});
        }
    });

    window.addEventListener('mouseup', turnOffMove());






    sock.on('mouseDown', ({ele, oriX, oriY}) => mouseDown({ele, oriX, oriY}));
    sock.on('mouseMove', ({ele, oriX, oriY, destX, destY}) => mouseMove({ele, oriX, oriY, destX, destY}));
    sock.on('addHero', () => addHero());
    sock.on('addMonster', () => addMonster());
    sock.on('mouseUp', () => {
        console.log('UPPPPPPP local');
        isMoving = false;
    });

    function turnOffMove() {
        console.log('turn off mouse UP');
        sock.emit('mouseUp');
        sock.off('mouseMove');
    }
    
})();




function mouseDown({ele, oriX, oriY}) {
    isMoving = true;
    console.log({ele, oriX, oriY});
    eleID = ele;
    prevX = oriX;
    prevY = oriY;
}

function mouseMove({ele, oriX, oriY, destX, destY}) {
    //update X and Y position of object relative with mouse click
    console.log({ele, oriX, oriY, destX, destY});
    let subX = oriX - destX;
    let subY = oriY - destY;
    
    //get the current properties from Hero (position)
    let hero_action = document.getElementById(ele);
    let heroRect = hero_action.getBoundingClientRect();

    //update the position of Hero
    hero_action.style.left = heroRect.left - subX + "px";
    hero_action.style.top = heroRect.top - subY + "px";

    //update origin/previous X and Y
    prevX = destX;
    prevY = destY;
}

function addHero() {
    let newDiv = document.createElement('div');
    newDiv.className = 'hero Generic';
    newDiv.style.top = '700px';
    newDiv.style.left = '50px';
    document.querySelector('.board').append(newDiv);
    heroes = document.querySelectorAll('.hero');
    for (let hero of heroes) {
        //hero.addEventListener('mousedown', mouseDown);
        hero.addEventListener('mousedown', () => sock.emit('mouseDown'));
    }
}

function addMonster() {
    let newDiv = document.createElement('div');
    newDiv.className = 'monster Generic2';
    newDiv.style.top = '200px';
    newDiv.style.left = '50px';
    document.querySelector('.board').append(newDiv);
    monsters = document.querySelectorAll('.monster');
    for (let monster of monsters) {
        //monster.addEventListener('mousedown', mouseDown);
        monster.addEventListener('mousedown', () => sock.emit('mouseDown'));
    }
}