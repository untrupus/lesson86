import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchTracks} from "../../store/actions";
import Container from "@material-ui/core/Container";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core/styles';
import SimpleModal from "../../components/Modal/Modal";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

const Album = props => {
    const classes = useStyles();
    const tracks = useSelector(state => state.tracks);
    const artist = useSelector(state => state.artist);
    const album = useSelector(state => state.album);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTracks(props.match.params.id));
    }, [dispatch, props.match.params.id]);

    const trackList = tracks.map(track => {

        return (
            <div key={track._id}>
                <ListItem button>
                    <ListItemText primary={track.number + ' ' + track.name}/>
                    <ListItemText primary={track.duration} style={{textAlign: "right"}}/>
                     <SimpleModal
                        video={track.youtube}
                        on={!track.youtube}
                     />
                </ListItem>
                <Divider />
            </div>
        )
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