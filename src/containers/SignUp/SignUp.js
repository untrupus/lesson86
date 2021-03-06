import React, {useRef, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link as RouterLink} from "react-router-dom";
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {registerUser} from "../../store/actions/usersAction";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    login: {
        marginLeft: 'auto',
        marginRight: 'auto'
    }
}));

const SignUp = () => {
    const classes = useStyles();
    const [state, setState] = useState({
        email: '',
        password: '',
        displayName: '',
        avatarImage: ''
    });
    const inputRef = useRef();

    const dispatch = useDispatch();
    const error = useSelector(state => state.users.registerError);

    const inputChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };
    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];
        setState(prevState => ({
            ...prevState, [name]: file
        }));
    };
    const formSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(state).forEach(key => {
            formData.append(key, state[key]);
        });
        dispatch(registerUser(formData));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form}
                      onSubmit={formSubmit}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        error={!!getFieldError("email")}
                        helperText={getFieldError("email")}
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        value={state.email}
                        onChange={inputChangeHandler}
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        error={!!getFieldError("displayName")}
                        helperText={getFieldError("displayName")}
                        fullWidth
                        id="displayName"
                        label="Display Name"
                        name="displayName"
                        value={state.displayName}
                        onChange={inputChangeHandler}
                        autoComplete="displayName"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="avatarImage"
                        type="file"
                        placeholder="Avatar Image"
                        error={!!getFieldError("avatarImage")}
                        helperText={getFieldError("avatarImage")}
                        ref={inputRef}
                        id="avatarImage"
                        onChange={fileChangeHandler}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        error={!!getFieldError("password")}
                        helperText={getFieldError("password")}
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={state.password}
                        onChange={inputChangeHandler}
                        autoComplete="current-password"
                    />
                    <Button
                        id="signup"
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item className={classes.login}>
                            <Link component={RouterLink} to="/signin">
                                {"Already have an account? Sign In"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default SignUp;