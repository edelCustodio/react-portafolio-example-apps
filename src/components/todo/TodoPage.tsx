
import React, { useState } from "react";
import { Grid, Paper } from "@material-ui/core";

import FormTodo from "./FormTodo";
import TaskList from "./TaskList";


export default function TodoPage(props: any) {

    const [list, setList] = useState<any[]>([]);
    
    const handleAddItem = (addItem: any) => {
        setList([...list, addItem]);
    };
    

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={3}>
                <Paper className={props.fixedHeightPaper}>
                    <FormTodo handleAddItem={handleAddItem}></FormTodo>
                </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
                <Paper className={props.fixedHeightPaper}>
                    <TaskList list={list} setList={setList}></TaskList>
                </Paper>
            </Grid>
        </Grid>
    );
}