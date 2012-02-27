var chess = {};

chess.Game = function() {
    this.position = new chess.Position();
    var self = this;
    chess.Square.VALID_FILES.forEach(function(file) {
        self.position.addWhitePawn(file + '2');
    });
};

chess.Position = function() {
    this.pieces = new Array(32);
    this.whiteIsActive = true;
    this.availableCastlings = 
        [chess.Position.BLACK_KINGSIDE_CASTLING, 
        chess.Position.WHITE_QUEENSIDE_CASTLING,
        chess.Position.BLACK_KINGSIDE_CASTLING,
        chess.Position.BLACK_QUEENSIDE_CASTLING];
    this.enPassantTargetSquare = null;
    
    this.addPiece = function(aPiece) {
        this.pieces.push(aPiece);
    };
    
    this.placePieceOnSquare = function(aPiece, aString) {
        aPiece.square = new chess.Square(aString.charAt(0), aString.charAt(1));
    };
    
    this.addPawnOn = function(aString) {
        var p = new chess.Pawn();
        this.addPiece(p);
        this.placePieceOnSquare(p, aString);
        return p;
    };
    
    this.addWhitePawn = function(aString) {
        var p = this.addPawnOn(aString);
        p.isWhite = true;
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
};

chess.Position.WHITE_KINGSIDE_CASTLING = 1;
chess.Position.WHITE_QUEENSIDE_CASTLING = 2;
chess.Position.BLACK_KINGSIDE_CASTLING = 4;
chess.Position.BLACK_QUEENSIDE_CASTLING = 8;


chess.Square = function(aChar, anInt) {
    function IllegalSquareException(aChar, anInt) {
        this.message = aChar + "" + anInt + " is not a legal square";
    }
    
    $.extend(IllegalSquareException, Error);
    
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

chess.Piece = function() {
    this.isWhite = true;
    this.square = null;
};

chess.Pawn = function() {
    this.image = 'Pawn';
};
$.extend(chess.Pawn, chess.Piece);
