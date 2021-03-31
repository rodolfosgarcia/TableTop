var heroes = document.querySelectorAll('.hero');
var monsters = document.querySelectorAll('.monster');
const addHeroButton = document.querySelector('.addHero');
const addMonsterButton = document.querySelector('.addMonster');

addHeroButton.addEventListener('mousedown', addHero);
addMonsterButton.addEventListener('mousedown', addMonster);

for (let hero of heroes) {
    hero.addEventListener('mousedown', mouseDown);
}

for (let monster of monsters) {
    monster.addEventListener('mousedown', mouseDown);
}



function mouseDown(e) {
    //get X and Y position and mouse click
    let prevX = e.clientX;
    let prevY = e.clientY;
    var hero_action = this;
    
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);

    
    function mouseMove(e) {
        //update X and Y position of object relative with mouse click
        let newX = prevX - e.clientX;
        let newY = prevY - e.clientY;

        //get the current properties from Hero (position)
        let heroRect = hero_action.getBoundingClientRect();

        //update the position of Hero
        hero_action.style.left = heroRect.left - newX + "px";
        hero_action.style.top = heroRect.top - newY + "px";

        //update previous X and Y
        prevX = e.clientX;
        prevY = e.clientY;
    }

    function mouseUp() {
        window.removeEventListener('mousemove', mouseMove);
        window.removeEventListener('mouseup', mouseUp);
    }
}

function addHero() {
    let newDiv = document.createElement('div');
    newDiv.className = 'hero Generic';
    newDiv.style.top = '700px';
    newDiv.style.left = '50px';
    document.querySelector('.board').append(newDiv);
    heroes = document.querySelectorAll('.hero');
    for (let hero of heroes) {
        hero.addEventListener('mousedown', mouseDown);
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
        monster.addEventListener('mousedown', mouseDown);
    }
}