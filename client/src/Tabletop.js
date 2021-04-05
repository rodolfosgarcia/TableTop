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
        hero.addEventListener('click', (e) => sock.emit('leftClick', {ele: hero.id, isCtrlPress: e.ctrlKey}));
    }
    
    for (let monster of monsters) {
        monster.addEventListener('mousedown', (e) => sock.emit('mouseDown', { ele: monster.id, oriX: e.clientX, oriY: e.clientY }));
        monster.addEventListener('click', (e) => sock.emit('leftClick', {ele: monster.id, isCtrlPress: e.ctrlKey}));
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
    sock.on('leftClick', ({ele , isCtrlPress}) => leftClick({ele , isCtrlPress}));
    sock.on('mouseUp', () => {
        isMoving = false;
    });

    function turnOffMove() {
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
        newDiv.addEventListener('mousedown', (e) => sock.emit('mouseDown', { ele: newDiv.id, oriX: e.clientX, oriY: e.clientY }));
        newDiv.addEventListener('click', (e) => sock.emit('leftClick', {ele: newDiv.id, isCtrlPress: e.ctrlKey}));
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
        newDiv.addEventListener('mousedown', (e) => sock.emit('mouseDown', { ele: newDiv.id, oriX: e.clientX, oriY: e.clientY }));
        newDiv.addEventListener('click', (e) => sock.emit('leftClick', {ele: newDiv.id, isCtrlPress: e.ctrlKey}));
    }

    function leftClick({ele , isCtrlPress}) {
        if (isCtrlPress) {
            let token = document.getElementById(ele);
            if (token.hasChildNodes()) {
                token.removeChild(document.getElementById('dead'+ ele + '1'));
                token.removeChild(document.getElementById('dead'+ ele + '2'));
            }
            else {
                let newDiv1 = document.createElement('div');
                let newDiv2 = document.createElement('div');
                newDiv1.id = 'dead'+ ele + '1';
                newDiv2.id = 'dead'+ ele + '2';
                newDiv1.className = 'dead-line-1';
                newDiv2.className = 'dead-line-2';
                document.getElementById(ele).append(newDiv1);
                document.getElementById(ele).append(newDiv2);
            }
        }
    }
    
})();




function mouseDown({ele, oriX, oriY}) {
    isMoving = true;
    eleID = ele;
    prevX = oriX;
    prevY = oriY;
}

function mouseMove({ele, oriX, oriY, destX, destY}) {
    let subX = oriX - destX;
    let subY = oriY - destY;
    
    let hero_action = document.getElementById(ele);
    let heroRect = hero_action.getBoundingClientRect();

    hero_action.style.left = heroRect.left - subX + "px";
    hero_action.style.top = heroRect.top - subY + "px";

    prevX = destX;
    prevY = destY;
}

