import React, {useEffect} from 'react';
import {fetchArtists} from "../../store/actions/artistsActions";
import {deleteArtist, publicArtist} from "../../store/actions/adminActions"
import SingleArtist from "../../components/SingleArtist/SingleArtist";
import {useSelector, useDispatch} from "react-redux";
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TimerIcon from '@material-ui/icons/Timer';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    artists: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingTop: "40px"
    },
    iconDel: {
        cursor: "pointer",
        '&:hover': {
            color: "red"
        }
    },
    iconAdd: {
        cursor: "pointer",
        '&:hover': {
            color: "green"
        }
    }
}));

const Artists = () => {
    const classes = useStyles();
    const artists = useSelector(state => state.artists.artists);
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    const remove = async (id) => {
        await dispatch(deleteArtist(id));
        dispatch(fetchArtists());
    };

    const add = async (id) => {
        await dispatch(publicArtist(id));
        dispatch(fetchArtists());
    };

    const artistsList = artists.map(artist => {
        if (artist.published ||
            (user && user.user.role === "admin") ||
            (user && user.user._id === artist.user)) {
            return (
                <SingleArtist
                    key={artist._id}
                    src={'http://localhost:8000/uploads/' + artist.image}
                    name={artist.name}
                    id={artist._id}
                    timer={!artist.published ? <TimerIcon/> : null}
                    delete={user && user.user.role === "admin" ?
                        <HighlightOffIcon
                            onClick={() => remove(artist._id)}
                            className={classes.iconDel}
                        /> : null}
                    add={!artist.published && (user && user.user.role === "admin") ?
                        <AddCircleOutlineIcon
                            onClick={() => add(artist._id)}
                            className={classes.iconAdd}
                        /> : null}
                />
            )
        } else return null;
    });
    return (
        <Container maxWidth="lg">
            <div className={classes.artists}>
                {artistsList}
            </div>
        </Container>
    );
};

export default Artists;