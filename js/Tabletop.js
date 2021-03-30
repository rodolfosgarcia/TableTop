var heroes = document.querySelectorAll('.hero');
const addHeroButton = document.querySelector('.addHero');
const addMonsterButton = document.querySelector('.addMonster');

addHeroButton.addEventListener('mousedown', addHero);
addHeroButton.addEventListener('mouseover', overAddHero);
addMonsterButton.addEventListener('mousedown', addMonster);
addMonsterButton.addEventListener('mouseover', overAddMonster);




for (let hero of heroes) {
    hero.addEventListener('mousedown', mouseDown);
    hero.addEventListener('mouseover', mouseOver);
    console.log(heroes.length)
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

function mouseOver() {
    console.log('over');
}

function addHero() {
    newDiv = document.createElement('div');
    newDiv.className = 'hero Generic';
    newDiv.style.top = '500px';
    newDiv.style.left = '100px';
    document.querySelector('.board').append(newDiv);
    heroes = document.querySelectorAll('.hero');
    for (let hero of heroes) {
        hero.addEventListener('mousedown', mouseDown);
        hero.addEventListener('mouseover', mouseOver);
        console.log(heroes.length)
    }
}

function addMonster() {
    console.log('added monster');
}

function overAddHero() {
    console.log('over add hero');
}

function overAddMonster() {
    console.log('over add mon');
}