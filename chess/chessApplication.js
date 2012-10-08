Apart.define("chessApplication", ["raw@chessBoard.phtml", "chess"], function(chessBoardTemplate, chess) {
  function ChessApplication() {
    this.game = null;
    this.selection = null;
  }
    
  ChessApplication.prototype.init = function() {
    var self = this;
    self.selection = new Selection();
    $('chessboard').innerHTML = chessBoardTemplate;
	$('newGameButton').click = function() {
       self.newGame();
     };
    var tdList = $('chessboardTable').getElementsByTagName('td');
    for (var i = 0; i < tdList.length; ++i) {
      tdList[i].onclick = function() {
        if (self.game.position.pieceAt(this.id) != null) {
        	self.selection.selectSquareWithCoordinates(this.id);
        }
      }
    }
	self.newGame();
  };
    
  ChessApplication.prototype.newGame = function() {
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
    
  ChessApplication.prototype.displayPosition = function (aPosition) {
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
  
  function $(elementId) {
    return window.document.getElementById(elementId);
  }
  
  function Selection() {
  }
  
  Selection.prototype.square = null;
  
  Selection.prototype.selectSquareWithCoordinates = function(aString) {
    if (this.square != null) {
      $(this.square.file + this.square.rank).style.removeProperty('background-color');
    } 
    
    var newSelectedSquare = new chess.Square(aString.charAt(0), aString.charAt(1));
    if (this.square != newSelectedSquare) {
      	this.square = newSelectedSquare;
    	$(this.square.file + this.square.rank).style['background-color'] = 'blue';
    }
  }
  
  return ChessApplication;
});