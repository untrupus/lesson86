import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchArtist} from "../../store/actions/artistsActions";
import {publicAlbum, deleteAlbum} from "../../store/actions/adminActions";
import SingleAlbum from "../../components/SingleAlbum/SingleAlbum";
import Container from "@material-ui/core/Container";
import {makeStyles} from '@material-ui/core/styles';
import TimerIcon from "@material-ui/icons/Timer";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const useStyles = makeStyles(() => ({
    albums: {
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

const Artist = props => {
    const classes = useStyles();
    const albums = useSelector(state => state.artists.albums);
    const artist = useSelector(state => state.artists.artist);
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);


    useEffect(() => {
        dispatch(fetchArtist(props.match.params.id));
    }, [dispatch, props.match.params.id]);


    const remove = async (id) => {
        await dispatch(deleteAlbum(id));
        dispatch(fetchArtist(props.match.params.id));
    };

    const add = async (id) => {
        await dispatch(publicAlbum(id));
        dispatch(fetchArtist(props.match.params.id));
    };

    const albumList = albums.map(album => {
        if (album.published ||
            (user && user.user.role === "admin") ||
            (user && user.user._id === album.user)) {
            return (
                <SingleAlbum
                    key={album._id}
                    name={album.name}
                    year={album.year}
                    id={album._id}
                    count={album.count}
                    src={'http://localhost:8000/uploads/' + album.image}
                    timer={!album.published ? <TimerIcon/> : null}
                    delete={user && user.user.role === "admin" ?
                        <HighlightOffIcon
                            onClick={() => remove(album._id)}
                            className={classes.iconDel}
                        /> : null}
                    add={!album.published && (user && user.user.role === "admin") ?
                        <AddCircleOutlineIcon
                            onClick={() => add(album._id)}
                            className={classes.iconAdd}
                        /> : null}
                />
            )
        } else return null;
    });


    return (
        <div>
            <Container maxWidth="lg">
                <h2>{artist}</h2>
                <div className={classes.albums}>
                    {albumList}
                </div>
            </Container>
        </div>
    );
};

export default Artist;