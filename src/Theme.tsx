import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    palette: {
        type: 'dark'
    },
    spacing: 10,
    props: {
        MuiPaper: {
            elevation: 12
        },
        MuiButton: {
            variant: 'contained',
            color: 'primary'
        },
        MuiTextField: {
            variant: 'outlined'
        }
    },
    overrides: {
        MuiButton: {
            root: {
                // marginTop: '10px'
            }
        }
    }
});
