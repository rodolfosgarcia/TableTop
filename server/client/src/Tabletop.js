var heroes = document.querySelectorAll('.hero');
var monsters = document.querySelectorAll('.monster');
const addHeroButton = document.querySelector('.addHero');
const addMonsterButton = document.querySelector('.addMonster');
var isMoving = false;

(()=> {
    
    const sock = io();
    var eleID = '';
    var prevX = '';
    var prevY = '';
    
    var heroIdcounter = 0;
    var newHeroTopDefault = '700';
    var newHeroLeftDefault = '50';
    
    var monIdcounter = 0;
    var newMonsterTopDefault = '200';
    var newMonsterLeftDefault = '50';
    
    //create board
    sock.on('board', (board) => resetBoard(board));

    function resetBoard(board) {
        console.log(board);
        board.forEach(token => {
            let newDiv = document.createElement('div');
            if (token.id.substring(0, 10) == 'newMonster') {
                newDiv.className = 'monster Generic2';
            } else {
                newDiv.className = 'hero';
                if (token.id.substring(0, 7) == 'newHero') {
                    newDiv.className += ' Generic';
                } 
            }
            newDiv.id = token.id;
            newDiv.style.top = token.top + 'px';
            newDiv.style.left = token.left + 'px';
            document.querySelector('.board').append(newDiv);
            heroes = document.querySelectorAll('.hero');
            if (token.isDead) {
                let newDiv1 = document.createElement('div');
                let newDiv2 = document.createElement('div');
                newDiv1.id = 'dead'+ token.id + '1';
                newDiv2.id = 'dead'+ token.id + '2';
                newDiv1.className = 'dead-line-1';
                newDiv2.className = 'dead-line-2';
                newDiv.append(newDiv1);
                newDiv.append(newDiv2);
            }
            newDiv.addEventListener('mousedown', (e) => mouseDown({ ele: newDiv.id, oriX: e.clientX, oriY: e.clientY }));
            newDiv.addEventListener('click', (e) => sock.emit('leftClick', {ele: newDiv.id, isCtrlPress: e.ctrlKey}));
        });
    }








    addHeroButton.addEventListener('mousedown', () => {
        heroIdcounter += 1;
        let newheroid = 'newHero' + heroIdcounter;
        sock.emit('addHero', {id:newheroid, top:newHeroTopDefault, left:newHeroLeftDefault});
    });
    
    addMonsterButton.addEventListener('mousedown', () => {
        monIdcounter += 1;
        let newmonid = 'newMonster' + monIdcounter;
        sock.emit('addMonster', {id:newmonid, top:newMonsterTopDefault, left:newMonsterLeftDefault});
    });
    
    for (let hero of heroes) {
        hero.addEventListener('mousedown', (e) => mouseDown({ ele: hero.id, oriX: e.clientX, oriY: e.clientY }));
        hero.addEventListener('click', (e) => sock.emit('leftClick', {ele: hero.id, isCtrlPress: e.ctrlKey}));
    }
    
    for (let monster of monsters) {
        monster.addEventListener('mousedown', (e) => mouseDown({ ele: monster.id, oriX: e.clientX, oriY: e.clientY }));
        monster.addEventListener('click', (e) => sock.emit('leftClick', {ele: monster.id, isCtrlPress: e.ctrlKey}));
    }
    
    window.addEventListener('mousemove', (e) => {
        if (isMoving === true) {
            let newX = prevX - e.clientX;
            let newY = prevY - e.clientY;
            let hero_action = document.getElementById(eleID);
            let heroRect = hero_action.getBoundingClientRect();
            hero_action.style.left = heroRect.left - newX + "px";
            hero_action.style.top = heroRect.top - newY + "px";
            prevX = e.clientX;
            prevY = e.clientY;
            //sock.emit('mouseMove', {ele:eleID, destX:calcX, destY:calcY});
        }
    });

    window.addEventListener('mouseup', (e) => {
        console.log(eleID);
        if (eleID != '') {
            console.log('upp');
            let hero_action = document.getElementById(eleID);
            let heroRect = hero_action.getBoundingClientRect();
            console.log(eleID);
            console.log(heroRect.left);
            console.log(heroRect.top);
            sock.emit('mouseUp', {ele: eleID, eleLeft: heroRect.left, eleTop: heroRect.top});
            console.log(eleID);
        }
    });






    sock.on('mouseDown', ({ele, oriX, oriY}) => mouseDown({ele, oriX, oriY}));
    //sock.on('mouseMove', ({ele, destX, destY}) => mouseMove({ele, destX, destY}));
    sock.on('addHero', ({id, top, left}) => addHero({id, top, left}));
    sock.on('addMonster', ({id, top, left}) => addMonster({id, top, left}));
    sock.on('leftClick', ({ele , isCtrlPress}) => leftClick({ele , isCtrlPress}));
    sock.on('mouseUp', ({ele, eleLeft, eleTop}) => {
        isMoving = false;
        let hero_action = document.getElementById(ele);
        hero_action.style.left = eleLeft + 'px';
        hero_action.style.top = eleTop + 'px';
        eleID = '';
        prevX = '';
        prevY = '';
    });


    



    function addHero({id, top, left}) {
        let newDiv = document.createElement('div');
        newDiv.className = 'hero Generic';
        //heroIdcounter += 1; -- being added in the mousedown before emit
        newDiv.id = id;
        newDiv.style.top = top + 'px';
        newDiv.style.left = left + 'px';
        document.querySelector('.board').append(newDiv);
        heroes = document.querySelectorAll('.hero');
        newDiv.addEventListener('mousedown', (e) => mouseDown({ ele: id, oriX: e.clientX, oriY: e.clientY }));
        newDiv.addEventListener('click', (e) => sock.emit('leftClick', {ele: id, isCtrlPress: e.ctrlKey}));
    }
    
    function addMonster({id, top, left}) {
        let newDiv = document.createElement('div');
        newDiv.className = 'monster Generic2';
        //monIdcounter += 1; -- being added in the mousedown before emit
        newDiv.id = id;
        newDiv.style.top = top + 'px';
        newDiv.style.left = left + 'px';
        document.querySelector('.board').append(newDiv);
        monsters = document.querySelectorAll('.monster');
        newDiv.addEventListener('mousedown', (e) => mouseDown({ ele: id, oriX: e.clientX, oriY: e.clientY }));
        newDiv.addEventListener('click', (e) => sock.emit('leftClick', {ele: id, isCtrlPress: e.ctrlKey}));
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

    function mouseDown({ele, oriX, oriY}) {
        isMoving = true;
        eleID = ele;
        prevX = oriX;
        prevY = oriY;
    }
    
    function mouseMove({ele, destX, destY}) {
        //console.log({ele, destX, destY});
        let hero_action = document.getElementById(ele);
        hero_action.style.left = destX + "px";
        hero_action.style.top = destY + "px";
    }
    
})();