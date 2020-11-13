import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link as RouterLink} from "react-router-dom";
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        marginBottom: "20px"
    },
});


const SingleAlbum = props => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Album"
                    height="140"
                    image={props.src}
                    title="Album"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.year} ({props.count})
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    <Link component={RouterLink}  to={'/album/' + props.id}>Tracks</Link>
                </Button>
            </CardActions>
        </Card>
    );
};

export default SingleAlbum;