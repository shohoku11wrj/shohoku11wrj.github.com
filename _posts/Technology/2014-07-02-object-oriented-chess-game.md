---
layout: post
title: Object Oriented Design -- Chess Game
category: Technology
tag: ['object-oriented','java']
lan: EN
---

Object Oriented Design for Chess Game.

This is a simple version by myself, as I have not found a simple one on the Internet.

<!--preview-->

* `class Piece` is the abstract class, which is extended by `class King, Queen, Knight, etc.`;
* Every `Piece` has a virable to mark which `Player` it belongs to;
* `class Block` is cell on the chess board, there might be `Piece` on Block;
* `class Game` is the entry of this small project, it initializes the chess game, control the action rounds, and determine when the game stops.

## Codes

### Piece

`Piece` has the responsibility to judge whether a move is valid or not, the extended class, such as `Queen, Knight` will implement the judge function `boolean isValidMove`.

    public abstract class Piece {
      private Player player;
      public Piece(Player p) { player = p;}

      public abstract boolean isValidMove(Block[][] board,
          int fromX, int fromY, int toX, int toY);
      public Player getPlayer() { return player; }
    }

### Knight which extends Piece

The movement of Knight is independent from other pieces between the original block and the destionation, so the `board` variable is unused here.

    public class Knight extends Piece {

      public Knight(Player p) {
        super(p);
      }

      @Override
      public boolean isValidMove(Block[][] board,
          int fromX, int fromY, int toX, int toY) {
        /*
        Piece orig = board[fromX][fromY].getPiece();
        Piece dest = board[toX][toY].getPiece();
        */
        int x = Math.abs(formX - toX);
        int y = Math.abs(fromY - toY);
        if (x * y = 2) {
          return true;
        } else {
          return false;
        }
      }

    }

### Player

As simple as it can. Or, you can add some functions to track every pieces belonging to this player.

    public class Player {
      private boolean result;

      public boolean getResult() { return result; }
      public void setResult(boolean r) { result = r; }
    }

### Block

There might be a `Piece` on the `Block`, so `getPiece()` return `null` when there is `NO` piece on it, otherwise return the piece object.

    public class Block {
      private Piece piece;

      public Block(Piece p) { piece = p; }

      public Piece getPiece() {
        return piece;
      }
      public void setPiece(Piece p) {
        piece = p;
      }
    }


### Game

There are two players `black & white` defined as virables, and a two dimensional array `Block[][] board` acts as the chessboard.

I use function `void initialize()` to setup a new chess game: reset the board and the two players' status.

The function `boolean move()` has several responsibilities: 

* 1) decide there is a Piece belongs to the current player, if not return false;

* 2) decide the destionation Block is a blank Block; or if it is not blank, there is a Piece belongs to the opponent; if not return false;

* 3) decide the movement from Block[fromX][fromY] to Block[toX][toY] is valid according to the regulation of different Pieces (e.g. Root moves straight routes, and Bishop moves diagonal routes) respectively, as well as considering the other Pieces which might be hinders in the route. <br/>
So, we need to pass the reference of `Block[][] board` to the `Piece.isValidMove(board, fromX, fromY, toX, toY)`.

* 4) function `viod play()` rounds the players' actions one by one

      public class Game {
        private Player black, white;
        private Block[][] board;

        private void initialize() { 
          black = new Player();
          white = new Player();
          //... 
          board[0][0] = new Block(new Rook(black));
          board[0][1] = new Block(new Knight(black));
          //...
          board[7][6] = new Block(new Knight(white));
          board[7][7] = new Block(new Rook(white));
        }

        private boolean isEnd() {
          return !(white.getResult() && black.getResult());
        }

        public Piece getPiece(int x, int y) {
          return board[x][y].getPiece();
        }

        public boolean move(int fromX, int fromY, int toX, int toY, Player player) {
          Piece piece = board[fromX][fromY].getPiece();
          if (piece == null) return false;
          if (!piece.getPlayer().equals(player)) {
            return false;
          }
          /* where to judge there is not obstacle between [fromX][fromY] and [toX][toY]? 
           * here in Game class, or in Piece class? */
          if (!piece.isValidMove(board, fromX, fromY, toX, toY)){
            return false;
          }

          /* kill? */
          Block dest = board[toX][toY];
          if (dest.getPiece() == null) {
            return true;
          }
          if (dest.getPiece() != null &&
              !dest.getPiece().getPlayer().equals(player)) {
            //TODO KILL
            Player opponent = dest.getPiece().getPlayer();
            // Checkmate 将军
            if (dest.getPiece() instanceof King) {
              opponent.setResult(false);
            }
            return true;
          }
          return false;
        }

        public void play() {
          boolean gameOver = false;
          while (!gameOver) {
            while (!move(0,0,2,1,white));
            gameOver = isEnd();
            while (!move(0,0,2,1,black));
            gameOver = isEnd();
          }
        }
      }


## References

<blockquote>
<a href="http://amitcodes.com/2014/02/04/object-oriented-design-for-chess-game/">Object oriented design for chess game</a> -- a good preview of the chess game OO Design <br/> 
<a href="http://tianrunhe.wordpress.com/2012/03/19/design-a-chess-game-using-oo-principles/">Design a chess game using OO principles</a> -- the basement of my codes
</blockquote>
