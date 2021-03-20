import React, { useState, useEffect } from 'react'
import ButtonBase from "@material-ui/core/ButtonBase";
import Paper from "@material-ui/core/Paper";
import Icon from '@material-ui/core/Icon';

import './Square.css';

const Square = (props: any) => {
    const { value, onChangeSquare } = props;
    const [val, setVal] = useState('');

    useEffect(() => {
        if (value !== null) {
            setVal(value === 'X' ? 'games' : 'fiber_manual_record');
        }
    }, [value]);

    return (
        <ButtonBase>
            <Paper
                onClick={(e) => onChangeSquare(e)}
                elevation={4}
                className="Paper">
                <Icon
                    className="Icon"
                    style={{fontSize: 78}}>
                        {val}
                </Icon>
            </Paper>
        </ButtonBase>
    );
}

export default Square;
