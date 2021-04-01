import React, { useState, useRef, useCallback } from 'react';
import useBookSearch from './useBookSearch';

import { TextField, Grid, Paper } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import LinearProgress from '@material-ui/core/LinearProgress';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
});

const Books = () => {
    const [query, setQuery] = useState<string>('');
    const [pageNumber, setPageNumber] = useState<number>(1);

    const {
        loading,
        error,
        books,
        hasMore
    } = useBookSearch(query, pageNumber);

    const observer = useRef<any>();
    const lastBookElementRef = useCallback((node: any) => {
        if (loading) {
            return;
        }

        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver((entries: any) => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1);
            }
        });

        if (node) {
            observer.current.observe(node);
        }

    }, [loading, hasMore]);

    const handleSearch = (e: any) => {
        setQuery(e.target.value);
        setPageNumber(1);
    }

    const classes = useStyles();

    return (
        <>
            <Grid container spacing={10}>
                <Grid item xs={12} md={4} lg={12}>
                    <Paper>
                        <TextField
                            label="Search"
                            type="text"
                            className="text"
                            value={query}
                            onChange={handleSearch}
                            fullWidth
                        />
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {books.map((book: any, index: number) => {
                                    if (books.length === index + 1) {
                                        return <TableRow key={book} ref={lastBookElementRef}>
                                                    <TableCell component="th" scope="row">
                                                        {book}
                                                    </TableCell>
                                                </TableRow>
                                    } else {
                                        return <TableRow key={book}>
                                                    <TableCell component="th" scope="row">
                                                        {book}
                                                    </TableCell>
                                                </TableRow>
                                    }
                                    
                                })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}

export default Books;