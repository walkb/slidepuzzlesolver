import { useState, useEffect } from "react";
import { findRenderedComponentWithType } from "react-dom/test-utils";

// Constants to change board and tile size.

const tile_size = 100;
const board_size = 3 * tile_size;

// Default board state

const initialTiles = [
    {num: 1, row: 0, col: 1},
    {num: 2, row: 0, col: 2}, 
    {num: 3, row: 1, col: 0}, 
    {num: 4, row: 1, col: 1}, 
    {num: 5, row: 1, col: 2}, 
    {num: 6, row: 2, col: 0}, 
    {num: 7, row: 2, col: 1}, 
    {num: 8, row: 2, col: 2}
];
const initialOpenTile = {row: 0, col: 0}


// |---------- BOARD SOLVER ----------------------------------------------------|

// Uses A* algorithm such that f(n) = (path cost + heuristic)
// Heuristic chosen is Manhattan distance (right angles only)

// Node class

// Solver function should return the path taken, which should be called by the Board class

// First, initialize the root node

// We know there are at most 2 and 4 different actions per state


// |---------- REACT COMPONENTS ------------------------------------------------|

// Board contains 8 tiles and information about tiles and open tile.
export default function Board() {
    const [solving, setSolving] = useState(false);
    const [tiles, setTiles] = useState(initialTiles)
    const [openTile, setOpenTile] = useState(initialOpenTile);
    var className = "parent";

    function findOpenAdjTile(row_in, col_in) {
        var oldTile = {row: row_in, col: col_in};
        // left adj is open
        if (row_in === openTile.row && col_in - 1 === openTile.col) {
            setOpenTile(oldTile);
            return "left";
        }
        // right adj is open
        else if (row_in === openTile.row && col_in + 1 === openTile.col) {
            setOpenTile(oldTile);
            return "right";
        }
        // up adj is open
        else if (row_in - 1 === openTile.row && col_in === openTile.col) {
            setOpenTile(oldTile);
            return "up";
        }
        // down adj is open
        else if (row_in + 1 === openTile.row && col_in === openTile.col) {
            setOpenTile(oldTile);
            return "down";
        }
        // no valid moves
        else {
            return "none";
        }
    }
    
    function handleClick(tile_key) {
        setTiles(tiles.map(tile => {
            if (tile.num === tile_key) {
                // find open tile coordinates
                var isOpen = findOpenAdjTile(tile.row, tile.col);
                if (isOpen === "left") {
                    return ({
                        ...tile,
                        col: tile.col - 1
                    })

                } else if (isOpen === "right") {
                    return ({
                        ...tile,
                        col: tile.col + 1
                    })

                } else if (isOpen === "up") {
                    return ({
                        ...tile,
                        row: tile.row - 1
                    })

                } else if (isOpen === "down") {
                    return ({...tile,
                    row: tile.row + 1})

                } else {
                    // no open tile, so ignore
                    return tile;
                }
            } else {
                return tile;
            }
        }))
    }

    function handleSolve() {
        setSolving(true);
    }

    function handleReset() {
        // console.log("..")
        setTiles(initialTiles);
        setOpenTile(initialOpenTile);
    }

    function handleRandom() {
        const map = new Map();
        initialTiles.forEach(tile => {
            // generate random key number
            var key = Math.floor(Math.random() * 8)
            while (map.has(key)) {
                key = Math.floor(Math.random() * 8)
            }
            map.set(key, tile.num);
        });
        var new_tiles = [];
        // all tiles should be set now
        for (var i = 0; i < 9; i++) {
            var row = Math.floor(i / 3);
            var col = i % 3;
            if (map.has(i)) {
                new_tiles.push({num: map.get(i), row: row, col: col});
            }
            else {
                // empty tile
                setOpenTile({row: row, col: col});
            }
        }
        setTiles(new_tiles);
    }

    return (
        <div className={ solving ? 'parent moveleft' : 'parent'}>
            <div className="board"
            style ={{
                width: `${board_size}px`,
                height: `${board_size}px`
            }}>
                {tiles.map(tile => <Tile handleClick={() => handleClick(tile.num)} number={tile.num} row={tile.row} col={tile.col} key={tile.num}></Tile>)}
            </div>
            <div className="controls" style={{width: '300px'}}>
                <button onClick={() => handleReset()}>RESET</button>
                <button onClick={() => handleRandom()}>RANDOM</button>
                <button onClick={() => handleSolve()}>SOLVE</button>
            </div>
        </div>
    );
}


function Tile({number, row, col, handleClick}) {
    // useEffect(() => {
    // }, [row, col]);
    // function handleClick() {
    //     setRow(row + 1);
    //     console.log("row: ", row)
    // }

    // const [row, setRow] = useState(row_in);
    // const [col, setCol] = useState(col_in);
    return <button
    style = {{
        width: `${tile_size}px`,
        height: `${tile_size}px`,
        top: `${tile_size * row}px`,
        left: `${tile_size * col}px`
    }}
    onClick = {handleClick} className="tile">{number}</button>
}