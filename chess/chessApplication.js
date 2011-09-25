chess.Application = function() {
    this.game = null;
    
    this.init = function() {
        this.newGame();
    };
    
    this.newGame = function() {
        var self = this;
        $('#newGameButton').click(function () {   
            function askUserToAbandonGame() {
                return true;
            }
            if (!askUserToAbandonGame()) return null;
            self.game = new chess.Game();
        });
    };
};