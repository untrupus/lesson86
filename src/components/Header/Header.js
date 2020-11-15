import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from "@material-ui/core/Container";
import {Link as RouterLink} from "react-router-dom";
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    logo: {
        color: "white",
        fontWeight: "bold",
        '&:hover': {
            textDecoration: "none"
        }
    }
}));

const Header = () => {
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Link component={RouterLink} className={classes.logo} to="/">Last.FM</Link>
                    </Typography>
                    <Button color="inherit">
                        <Link component={RouterLink} className={classes.logo} to="/signup">Sign up</Link>
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;