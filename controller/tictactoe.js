/* eslint-disable no-unused-vars */
let turn = 0;
const type = ['X', 'O'];
const mat = [['', '', ''], ['', '', ''], ['', '', '']];
let finished = 0;

/**
 * Updates the game according to the current move from the user
 * @param {*} id the cell pressed by the user.
 */
function move(id) {
  if (finished) {
    return;
  }

  const row = Number(id[0]) - 1;
  const col = Number(id[1]) - 1;

  if (mat[row][col] == '') {
    document.getElementById(id).innerHTML = type[turn % 2];
    mat[row][col] = type[turn % 2];

    if (wonGame(row, col, turn) || tieGame(turn)) {
      finished = 1;
      return;
    }

    ++turn;
    document.getElementById('turn').innerHTML = 'Player' + (turn % 2 + 1) +
        '\'s turn';
  }
}

/**
 * Checks whether the current player has won the game
 * @param {*} row the row of the chosen cell
 * @param {*} col the column of the chosen cell
 * @param {*} turn the current turn
 * @return {boolean} true if the current player's won, false otherwise
 */
function wonGame(row, col, turn) {
  if (checkLine(row) || checkCol(col) ||
      (row == col && checkPrimaryDiag()) ||
      (2 - row == col && checkSecondaryDiag())) {
    document.getElementById('turn').innerHTML = 'Player' + (turn % 2 + 1) +
        ' has won';
    return true;
  }

  return false;
}

/**
 * Checks whether the current game is a tie
 * @param {*} turn the current turn of the game
 * @return {boolean} true if the game has ended in a tie, false otherwise
 */
function tieGame(turn) {
  if (turn == 8) {
    document.getElementById('turn').innerHTML = 'TIE GAME';
    return true;
  }
  return false;
}

/**
 * Checks whether the player has won on the current row
 * @param {*} row the row to be checked
 * @return {boolean} true if the player has won on this row, false otherwise
 */
function checkLine(row) {
  return mat[row][0] == mat[row][1] && mat[row][1] == mat[row][2];
}

/**
 * Checks whether the player has won on the current column
 * @param {*} col the column to be checked
 * @return {boolean} true if the player has won on this column, false otherwise
 */
function checkCol(col) {
  return mat[0][col] == mat[1][col] && mat[1][col] == mat[2][col];
}

/**
 * Checks whether the player has won on the primary diagonal
 * @return {boolean} true if the player's won on this diagonal, false otherwise
 */
function checkPrimaryDiag() {
  return mat[0][0] == mat[1][1] && mat[1][1] == mat[2][2];
}

/**
 * Checks whether the player has won on the secondary diagonal
 * @return {boolean} true if the player's won on this diagonal, false otherwise
 */
function checkSecondaryDiag() {
  return mat[0][2] == mat[1][1] && mat[1][1] == mat[2][0];
}
