var heroes = document.querySelectorAll('.hero');
var monsters = document.querySelectorAll('.monster');
const addHeroButton = document.querySelector('.addHero');
const addMonsterButton = document.querySelector('.addMonster');
var isMoving = false;
var monIdcounter = 0;
var heroIdcounter = 0;

(()=> {

    const sock = io();

    addHeroButton.addEventListener('mousedown', () => sock.emit('addHero'));
    
    addMonsterButton.addEventListener('mousedown', () => sock.emit('addMonster'));
    
    for (let hero of heroes) {
        hero.addEventListener('mousedown', (e) => sock.emit('mouseDown', { ele: hero.id, oriX: e.clientX, oriY: e.clientY }));
    }

    for (let monster of monsters) {
        monster.addEventListener('mousedown', (e) => sock.emit('mouseDown', { ele: monster.id, oriX: e.clientX, oriY: e.clientY }));
    }
    
    window.addEventListener('mousemove', (e) => {
        if (isMoving === true) {
            newX = e.clientX;
            newY = e.clientY;
            sock.emit('mouseMove', {ele:eleID, oriX:prevX, oriY:prevY, destX:newX, destY:newY});
        }
    });

    window.addEventListener('mouseup', turnOffMove);






    sock.on('mouseDown', ({ele, oriX, oriY}) => mouseDown({ele, oriX, oriY}));
    sock.on('mouseMove', ({ele, oriX, oriY, destX, destY}) => mouseMove({ele, oriX, oriY, destX, destY}));
    sock.on('addHero', () => addHero());
    sock.on('addMonster', () => addMonster());
    sock.on('mouseUp', () => {
        console.log('UPPPPPPP local');
        isMoving = false;
        //sock.off('mouseMove');
    });

    function turnOffMove() {
        console.log('turn off mouse UP');
        sock.emit('mouseUp');
    }




    function addHero() {
        let newDiv = document.createElement('div');
        newDiv.className = 'hero Generic';
        heroIdcounter += 1;
        newDiv.id = 'newHero' + heroIdcounter;
        newDiv.style.top = '700px';
        newDiv.style.left = '50px';
        document.querySelector('.board').append(newDiv);
        heroes = document.querySelectorAll('.hero');
        for (let hero of heroes) {
            hero.addEventListener('mousedown', (e) => sock.emit('mouseDown', { ele: hero.id, oriX: e.clientX, oriY: e.clientY }));
        }
    }
    
    function addMonster() {
        let newDiv = document.createElement('div');
        newDiv.className = 'monster Generic2';
        monIdcounter += 1;
        newDiv.id = 'newMonster' + monIdcounter;
        newDiv.style.top = '200px';
        newDiv.style.left = '50px';
        document.querySelector('.board').append(newDiv);
        monsters = document.querySelectorAll('.monster');
        for (let monster of monsters) {
            monster.addEventListener('mousedown', (e) => sock.emit('mouseDown', { ele: monster.id, oriX: e.clientX, oriY: e.clientY }));
        }
    }
    
})();




function mouseDown({ele, oriX, oriY}) {
    isMoving = true;
    console.log({ele, oriX, oriY});
    eleID = ele;
    prevX = oriX;
    prevY = oriY;
    //sock.on('mouseMove', ({ele, oriX, oriY, destX, destY}) => mouseMove({ele, oriX, oriY, destX, destY}));
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

