import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteTrack, fetchTracks, publicTrack} from "../../store/actions/artistsActions";
import {addTrack} from "../../store/actions/usersAction";
import Container from "@material-ui/core/Container";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core/styles';
import SimpleModal from "../../components/Modal/Modal";
import TimerIcon from "@material-ui/icons/Timer";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    track: {
        width: "100%"
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

const Album = props => {
    const classes = useStyles();
    const tracks = useSelector(state => state.artists.tracks);
    const artist = useSelector(state => state.artists.artist);
    const album = useSelector(state => state.artists.album);
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(fetchTracks(props.match.params.id));
    }, [dispatch, props.match.params.id]);

    const addTrackHandler = trackId => {
        dispatch(addTrack(trackId));
    };

    const remove = async (id) => {
        await dispatch(deleteTrack(id));
        dispatch(fetchTracks(props.match.params.id));
    };

    const add = async (id) => {
        await dispatch(publicTrack(id));
        dispatch(fetchTracks(props.match.params.id));
    };

    const trackList = tracks.map(track => {
        if (track.published ||
            (user && user.user.role === "admin") ||
            (user && user.user._id === track.user)) {
            return (
                <div
                    className={classes.track}
                    key={track._id}
                >
                    <ListItem button>
                        <ListItemText primary={track.number + ' ' + track.name}
                                      onClick={() => addTrackHandler({track: track._id})}
                        />
                        {!track.published ? <TimerIcon/> : null}
                        {user && user.user.role === "admin" ?
                            <HighlightOffIcon
                                onClick={() => remove(track._id)}
                                className={classes.iconDel}
                            /> : null}
                        {!track.published && (user && user.user.role === "admin") ?
                            <AddCircleOutlineIcon
                                onClick={() => add(track._id)}
                                className={classes.iconAdd}
                            /> : null}

                        <ListItemText primary={track.duration} style={{textAlign: "right"}}/>
                        <SimpleModal
                            video={track.youtube}
                            on={!track.youtube}
                        />
                    </ListItem>
                    <Divider/>
                </div>
            )
        } else return null;
    });

    return (
        <Container maxWidth="lg">
            <h4>{artist}</h4>
            <p>{album}</p>
            <List component="nav" className={classes.root} aria-label="mailbox folders">
                {trackList}
            </List>

        </Container>
    );
};

export default Album;