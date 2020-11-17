import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Container from "@material-ui/core/Container";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core/styles';
import {fetchHistory} from "../../store/actions/usersAction";
import {push} from "connected-react-router";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    container: {
        marginTop: "20px"
    },

}));

const History = () => {
    const classes = useStyles();
    const trackHistory = useSelector(state => state.users.trackHistory);
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(fetchHistory());
        if (!user) {
            dispatch(push('/'));
        }
    }, [dispatch, user]);

    let historyList;
    if (trackHistory) {
        historyList = trackHistory.map(track => {
            console.log(track.datetime);
            return (
                <div
                    key={track._id}
                >
                    <ListItem button>
                        <ListItemText primary={track.track.album.artist.name}/>
                        <ListItemText primary={track.track.name}/>
                        <ListItemText primary={track.datetime.slice(0, -27)
                        } style={{textAlign: "right"}}/>
                    </ListItem>
                    <Divider/>
                </div>
            )
        });
    }

    return (
        <Container maxWidth="lg" className={classes.container}>
            <List component="nav" className={classes.root} aria-label="mailbox folders">
                {historyList}
            </List>
        </Container>
    );
};

export default History;