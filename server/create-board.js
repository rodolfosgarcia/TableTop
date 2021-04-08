const createBoard = () => {
    
    let board;

    const clear = () => {
        board = Array(arguments.length);
        for (var i = 0; i < arguments.length; i++) {
            board[i] = arguments[i];
        }
    };

    const getBoard = () => board;
    
    const updateBoard = (token, x, y , isDead) => {
        boardIndex = board.findIndex(checkToken)
        if (boardIndex != -1) {
            // update
            board[boardIndex] = {}
        } else {
            //new

        }



        function checkToken(ele) {
            return ele === token;
        }

    }

};