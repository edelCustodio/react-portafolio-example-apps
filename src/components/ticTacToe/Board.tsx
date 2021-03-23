import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Square from './Square';

import './Board.css';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));


const Board = (props: any) => {

    const [spacing, setSpacing] = useState<Spacing>(2);

    const classes = useStyles();
    let contSquare = 0;

    const renderSquare = (i: number, location: number[]) => {
        contSquare = i + 1;
        return (<Square 
                value={props.squares[i]}
                onChangeSquare={(e: any) => props.onChangeBoard(i, location, e)}>
            </Square>);
    }

    return (
        
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                {[0, 1, 2].map((x: number, ix: number) => (
                    <Grid key={x} container justify="center" spacing={spacing}>
                        {[0, 1, 2].map((y, iy) => (
                            <Grid key={y} item>
                                {renderSquare(contSquare, [x, y])}
                            </Grid>
                        ))}
                    </Grid>
                ))}
                
            </Grid>
        </Grid>
    );
}

export type Spacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | undefined;

export default Board;
