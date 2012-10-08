Apart.define("chess", function() {
    var chess = {};    
    
    chess.Piece = function() {
        this.basicName = '';
        this.isWhite = true;
        this.square = null;
        
        this.name = function() {
            var color = null;
            if (this.isWhite) {
                color = 'White';
            } else {
                color = 'Black';
            }
            return color + this.basicName;
        };
    };
    
    chess.Pawn = function() {
        this.basicName = 'Pawn';
    };
    chess.Pawn.inheritsFrom(chess.Piece);
    
    chess.Knight = function() {
        this.basicName = 'Knight';
    };
    chess.Knight.inheritsFrom(chess.Piece);
    
    chess.Bishop = function() {
        this.basicName = 'Bishop';
    };
    chess.Bishop.inheritsFrom(chess.Piece);
    
    chess.Rook = function() {
        this.basicName = 'Rook';
    };
    chess.Rook.inheritsFrom(chess.Piece);
    
    chess.Queen = function() {
        this.basicName = 'Queen';
    };
    chess.Queen.inheritsFrom(chess.Piece);
    
    chess.King = function() {
        this.basicName = 'King';
    };
    chess.King.inheritsFrom(chess.Piece);
    
    
    
    
    
    
    chess.Square = function(aChar, anInt) {
        function IllegalSquareException(aChar, anInt) {
            this.message = aChar + "" + anInt + " is not a legal square";
        }
        
        IllegalSquareException.inheritsFrom(Error);
        
        this.isValidRank = function(x) {
            return (chess.Square.VALID_RANKS.indexOf(x)) != -1;
        };
        
        this.isValidFile = function(x) {
            return (chess.Square.VALID_FILES.indexOf(x)) != -1;
        };
        if (!this.isValidRank(anInt) || ! this.isValidFile(aChar)) {
            throw new IllegalSquareException(aChar, anInt);
        }
        this.rank = anInt;
        this.file = aChar;
    };
    
    chess.Square.VALID_RANKS = ['1', '2', '3', '4', '5', '6', '7', '8'];
    chess.Square.VALID_FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    
    chess.Position = function() {
        this.pieces = new Array(32);
        this.whiteIsActive = true;
        this.availableCastlings = 
            [chess.Position.BLACK_KINGSIDE_CASTLING, 
            chess.Position.WHITE_QUEENSIDE_CASTLING,
            chess.Position.BLACK_KINGSIDE_CASTLING,
            chess.Position.BLACK_QUEENSIDE_CASTLING];
        this.enPassantTargetSquare = null;
        
        this.placePieceOnSquare = function(aPiece, aString) {
            aPiece.square = new chess.Square(aString.charAt(0), aString.charAt(1));
        };
        
        this.addPiece = function(aPiece, aString, aBoolean) {
            this.pieces.push(aPiece);
            aPiece.isWhite = aBoolean;
            this.placePieceOnSquare(aPiece, aString);
            return aPiece;
        };
        
        this.pieceAt = function(aString) {
            var file = aString.charAt(0);
            var rank = aString.charAt(1);
            var piece = null;
            this.pieces.forEach(function(aPiece){
                if (aPiece.square.rank == rank && aPiece.square.file == file) {
                    piece = aPiece;
                }
            });
            return piece;
        };
      
      	this.movePieceFromToCoordinate = function(aString, anotherString) {
          	var toSquare = new chess.Square(anotherString.charAt(0), anotherString.charAt(1));
          	this.makeMove(this.pieceAt(aString), toSquare);        
        };
      
      	this.makeMove = function(aPiece, aSquare) {
            aPiece.square = aSquare;
        };
    };
    
    
    
    
    chess.Game = function() {
        this.position = new chess.Position();
        var pos = this.position;
        chess.Square.VALID_FILES.forEach(function(file) {
            pos.addPiece(new chess.Pawn(), file + '2', true);
            pos.addPiece(new chess.Pawn(), file + '7', false);
        });
        pos.addPiece(new chess.Rook(), 'a1', true);
        pos.addPiece(new chess.Knight(), 'b1', true);
        pos.addPiece(new chess.Bishop(), 'c1', true);
        pos.addPiece(new chess.Queen(), 'd1', true);
        pos.addPiece(new chess.King(), 'e1', true);
        pos.addPiece(new chess.Bishop(), 'f1', true);
        pos.addPiece(new chess.Knight(), 'g1', true);
        pos.addPiece(new chess.Rook(), 'h1', true);
        
        pos.addPiece(new chess.Rook(), 'a8', false);
        pos.addPiece(new chess.Knight(), 'b8', false);
        pos.addPiece(new chess.Bishop(), 'c8', false);
        pos.addPiece(new chess.Queen(), 'd8', false);
        pos.addPiece(new chess.King(), 'e8', false);
        pos.addPiece(new chess.Bishop(), 'f8', false);
        pos.addPiece(new chess.Knight(), 'g8', false);
        pos.addPiece(new chess.Rook(), 'h8', false);
    };
    
    chess.Position.WHITE_KINGSIDE_CASTLING = 1;
    chess.Position.WHITE_QUEENSIDE_CASTLING = 2;
    chess.Position.BLACK_KINGSIDE_CASTLING = 4;
    chess.Position.BLACK_QUEENSIDE_CASTLING = 8;
    
    return chess;
});