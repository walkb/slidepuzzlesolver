// import React from 'react';
import { useState, useEffect } from "react";

const tile_size = 100;
const board_size = 3 * tile_size;

export default function Board() {
    
    
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
    
    const [tiles, setTiles] = useState(initialTiles)
    const [openTile, setOpenTile] = useState(initialOpenTile);

    function findOpenAdjTile(row_in, col_in) {
        var oldTile = {row: row_in, col: col_in};
        // console.log(oldTile);
        // console.log(openTile);
        // left
        if (row_in === openTile.row && col_in - 1 === openTile.col) {
            setOpenTile(oldTile);
            return "left";
        }
        // right
        else if (row_in === openTile.row && col_in + 1 === openTile.col) {
            setOpenTile(oldTile);
            return "right";
        }
        // up
        else if (row_in - 1 === openTile.row && col_in === openTile.col) {
            setOpenTile(oldTile);
            return "up";
        }
        // down
        else if (row_in + 1 === openTile.row && col_in === openTile.col) {
            setOpenTile(oldTile);
            return "down";
        }
        // none
        else {
            return "none";
        }
    }
    
    function handleClick(tile_key) {
        // var found_tile = tiles.find(tile => tile.num === tile_key);
        // console.log(found_tile.num);
        setTiles(tiles.map(tile => {
            if (tile.num === tile_key) {
                // find open tile coordinates
                var isOpen = findOpenAdjTile(tile.row, tile.col);
                // console.log(isOpen);
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

    return (
        <div className="parent">
            <div className="board"
            style ={{
                width: `${board_size}px`,
                height: `${board_size}px`
            }}>
                {tiles.map(tile => <Tile handleClick={() => handleClick(tile.num)} number={tile.num} row={tile.row} col={tile.col} key={tile.num}></Tile>)}
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