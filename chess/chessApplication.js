chess.Application = function() {
    this.game = null;
    
    this.init = function() {
        var self = this;
        $('#newGameButton').click(function() {
            self.newGame();
        });
    };
    
    this.newGame = function() {
        function askUserToAbandonGame() {
            return true;
        }
        
        if (!askUserToAbandonGame()) {
            return null;
        }
        this.game = new chess.Game();
        this.displayPosition(this.game.position);
        return this.game;
    };
    
    this.displayPosition = function (aPosition) {
        chess.Square.VALID_RANKS.forEach(function(rank) {
            chess.Square.VALID_FILES.forEach(function(file) {
                var squareString = file + rank;
                var piece = aPosition.pieceAt(squareString);
                if (piece) {
                    $("#" + squareString).html(
                        "<img class='piece' src='images/BlackQueen.png'/>");
                } else {
                    $("#" + squareString).html("");
                }
            });
        });
    };
};