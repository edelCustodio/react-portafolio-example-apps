import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: '10px'
    }
}));

const FormTodo = (props) => {
    const [description, setDescription] = useState('');
    const { handleAddItem } = props;

    const classes = useStyles();

    const handleSubmit = e => {
        e.preventDefault();
        handleAddItem({
            done: false,
            id: (+new Date()).toString(),
            description
        });
        setDescription("");
    };

	return (
        <form onSubmit={handleSubmit}>
            <div >
                <div >
                    <TextField
                        label="To do"
                        type="text"
                        className="text"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        fullWidth
                    />
                    <Button className={classes.button} type="submit" disabled={ description === '' } fullWidth>
                        Add
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default FormTodo;
