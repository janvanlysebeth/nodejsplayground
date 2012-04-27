define("chessApplication", ["chess"], 
    function(chess) {
        return function ChessApplication() {
            this.game = null;
            
            this.init = function() {
                var self = this;
                loadHtml("chessApplication.phtml", 'chessApplication',
                    function() {                        
                        $('newGameButton').click = function() {
                            self.newGame();
                        };
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
                        var imgHtml = "";
                        if (piece) {
                            imgHtml = "<img class='piece' src='images/" +
                                piece.name() + ".png'/>";
                        } 
                        $(squareString).innerHTML = imgHtml;
                    });
                });
            };
    };
    
    function loadHtml(url, elementId, finishedCallback) {
        var xhr = new XMLHttpRequest();  
        xhr.open("GET", url);  
        xhr.onreadystatechange = function (xhrEvent) {  
            if (xhr.readyState === 4) {  
                if (xhr.status !== 200) {
                    console.log("Error", xhr.statusText);
                } else {
                    $(elementId).innerHTML = xhr.responseText;
                    finishedCallback();
                }
            }
        };
        xhr.send(null);
    }
    
    function $(elementId) {
        return window.document.getElementById(elementId);
    }
});