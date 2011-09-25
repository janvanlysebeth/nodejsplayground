chess = {};

chess.Game = function() {
    this.position = new chess.Position();
    this.position.addWhitePawn('a2');
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
    
    this.addWhitePawn = function(aSquare) {
        var p = new chess.Pawn();
        p.isWhite = true;
        p.rank = aSquare.charAt(1);
        p.file = aSquare.charAt(0);
        this.addPiece(p);
    };
        
};

chess.Position.WHITE_KINGSIDE_CASTLING = 1;
chess.Position.WHITE_QUEENSIDE_CASTLING = 2;
chess.Position.BLACK_KINGSIDE_CASTLING = 4;
chess.Position.BLACK_QUEENSIDE_CASTLING = 8;

chess.Piece = function() {
    this.isWhite = true;
    this.rank = null;
    this.file = null;
};

chess.Pawn = function() {};
$.extend(chess.Pawn, chess.Piece);