import React, { Component } from './node_modules/react';
import { Link } from './node_modules/react-router-dom';
// dayjs
import dayjs from './node_modules/dayjs';
import relativeTime from './node_modules/dayjs/plugin/relativeTime';

// Proptypes
import PropTypes from './node_modules/prop-types';

// Componets
import MyButton from '../../util/MyButton';
import UserDeviceDialog from './ScreamDialog';
import LikeButton from './LikeButton';

// MUI Stuff
import withStyles from './node_modules/@material-ui/core/styles/withStyles';
import Card from './node_modules/@material-ui/core/Card';
import CardContent from './node_modules/@material-ui/core/CardContent';
import CardMedia from './node_modules/@material-ui/core/CardMedia';
import Typography from './node_modules/@material-ui/core/Typography';

// icons
import ChatIcon from './node_modules/@material-ui/icons/Chat';

// styles
const styles = (theme) => ({
    ...theme.notColor
});

export class UserDevice extends Component {

    render() {
        
        dayjs.extend(relativeTime);
        
        // same: const classes = this.props.classes;
        const { 
            classes, 
            device: { 
                deviceId,
                nameOfDevice,
                howManyAdventures,
                ageRate,
                price,
                badgeUrl,
                imgUrl,
                videoUrl, 
                createdAt,   
                likesCount, 
                commentsCount 
            }
        } = this.props;

        return (
            <Card className={classes.card}>
                <CardMedia image={userImage} title="Profile image" className={classes.image}/>
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                    <LikeButton screamId={screamId}/>
                    <span>{likeCount} likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary"/>
                    </MyButton>
                    <span>{commentCount} comments</span>
                    <UserDeviceDialog screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog}/>
                </CardContent>
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

export default connect(mapStateToProps)(withStyles(styles)(UserDevice));
