import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {addTrack, fetchArtists, fetchArtist} from "../../store/actions/artistsActions";

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
        display: 'block',
        margin: theme.spacing(3, "auto", 2),
        padding: "15px",
        width: "100%"
    },
    login: {
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    formControl: {
        marginTop: theme.spacing(1),
        width: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const AddTrack = () => {
    const classes = useStyles();
    const [state, setState] = useState({
        name: '',
        duration: '',
        album: '',
        artist: '',
        number: ''
    });

    const dispatch = useDispatch();
    const error = useSelector(state => state.artists.addTrackError);
    const artists = useSelector(state => state.artists.artists);
    const albums = useSelector(state => state.artists.albums);

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchArtist(state.artist))
    }, [state.artist, dispatch]);

    const inputChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const formSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(state).forEach(key => {
            formData.append(key, state[key]);
        });
        dispatch(addTrack(formData));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch(e) {
            return undefined;
        }
    };

    const artistSelect = artists.map(artist => {
        return (
            <MenuItem
                key={artist._id}
                value={artist._id}
            >{artist.name}</MenuItem>
        )
    });

    const albumSelect = albums.map(album => {
        return (
            <MenuItem
                key={album._id}
                value={album._id}
            >{album.name}</MenuItem>
        )
    });

    return (
        <Container>
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Add new track
                    </Typography>
                    <form className={classes.form}
                          onSubmit={formSubmit}
                    >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            error={!!getFieldError("name")}
                            helperText={getFieldError("name")}
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            value={state.name}
                            onChange={inputChangeHandler}
                            autoComplete="name"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="duration"
                            label="Duration"
                            type="duration"
                            id="duration"
                            error={!!getFieldError("duration")}
                            helperText={getFieldError("duration")}
                            value={state.duration}
                            onChange={inputChangeHandler}
                            autoComplete="duration"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="number"
                            label="Number"
                            type="number"
                            id="number"
                            error={!!getFieldError("number")}
                            helperText={getFieldError("number")}
                            value={state.number}
                            onChange={inputChangeHandler}
                            autoComplete="number"
                        />
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">Artist</InputLabel>
                            <Select
                                fullWidth
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={state.artist}
                                onChange={inputChangeHandler}
                                label="Artist"
                                name="artist"
                                error={!!getFieldError("artist")}
                                helperText={getFieldError("artist")}
                            >
                                {artistSelect}
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">Album</InputLabel>
                            <Select
                                fullWidth
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={state.album}
                                onChange={inputChangeHandler}
                                label="Album"
                                name="album"
                                error={!!getFieldError("album")}
                                helperText={getFieldError("album")}
                            >
                                {albumSelect}
                            </Select>
                        </FormControl>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Add
                        </Button>
                    </form>
                </div>
            </Container>
        </Container>
    );
};

export default AddTrack;