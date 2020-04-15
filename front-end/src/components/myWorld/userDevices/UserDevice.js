import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
// dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// react player
import ReactPlayer from "react-player"  

// Proptypes
import PropTypes from 'prop-types';

// Componets
//import MyButton from '../../../utilities/MyButton';
import UserDeviceDialog from './UserDeviceDialog';

// MUI Stuff
//import { makeStyles } from '@material-ui/core/styles';
import withStyles from '@material-ui/core/styles/withStyles';
//import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
//import MuiCardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
//import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

// icons
import ChatIcon from '@material-ui/icons/Chat';

// styles
const styles = () => ({
        avatar: {
            backgroundColor: red[500],
        },
});

export class UserDevice extends Component {
    
    render() {
        dayjs.extend(relativeTime);

        // same: const classes = this.props.classes;
        const {  
            classes,
            userDevice: { 
                userDeviceId,
                userHandle,
                createdAt,
                active,
                device:{
                    videoUrl,
                    nameOfDevice,
                    howManyAdventures,
                    description,
                    ageRate
                }
            }
        } = this.props;

        return (
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {nameOfDevice.charAt(0)}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={'Name of device: ' + nameOfDevice}
                    subheader={'From ages to: ' + ageRate}
                />
                <CardMedia className={classes.media}>
                    <ReactPlayer
                        url={videoUrl}
                        height= '100%'
                        width= '100%'
                    />
                </CardMedia>
                <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                        {'Mine since: ' + dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {`Available adventures for ${nameOfDevice} device: ${howManyAdventures}`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {`Why ${nameOfDevice} is awesome?: ${description}`}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <IconButton
                    aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <UserDeviceDialog userDeviceId={userDeviceId} openDialog={this.props.openDialog}/>
            </Card>     
        )
    }
}

UserDevice.propTypes = {
    user: PropTypes.object.isRequired,
    userDevice: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

export default withStyles(styles)(UserDevice);
