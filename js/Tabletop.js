const hero = document.querySelector('.hero');

hero.addEventListener('mousedown', mouseDown);

function mouseDown(e) {
    console.log('down')
    
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);

    //get X and Y position and mouse click
    let prevX = e.clientX;
    let prevY = e.clientY;

    function mouseMove(e) {
        console.log('moving..')
        //update X and Y position of object relative with mouse click
        let newX = prevX - e.clientX;
        let newY = prevY - e.clientY;

        //get the current properties from Hero (position)
        const heroRect = hero.getBoundingClientRect();

        //update the position of Hero
        hero.style.left = heroRect.left - newX + "px";
        hero.style.top = heroRect.top - newY + "px";

        //update previous X and Y
        prevX = e.clientX;
        prevY = e.clientY;
    }

    function mouseUp() {
        console.log('up')
        window.removeEventListener('mousemove', mouseMove);
        window.removeEventListener('mouseup', mouseUp);
    }
}
