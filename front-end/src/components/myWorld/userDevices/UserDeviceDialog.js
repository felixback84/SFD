import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// Components
import MyButton from '../../util/MyButton';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
// Redux stuff
import { connect } from 'react-redux';
import { getUserDevice, clearErrors } from '../../redux/actions/dataActions';

const styles = (theme) => ({
    ...theme.notColor,
    profileImage: {
        maxWidth: 200,
        maxHeight: 200,
        borderRadius: '50%',
        objectFit: 'cover',
        marginLeft: 10
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        top:'5%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    },
});

class ScreamDialog extends Component {

    state = {
        open: false
    };

    componentDidMount(){
        if(this.props.openDialog){
            this.handleOpen();
        }
    };

    handleOpen = () => {
        
        this.setState({ open: true });
        // redux action
        this.props.getUserDevice(this.props.userDeviceId);
    }

    handleClose = () => {
        // redux actions
        this.setState({ open: false });
        this.props.clearErrors();
    } 
  
    render(){
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
            },
            ui: { loading }
        } = this.props;
        
        const dialogMarkup = loading ? (
            <CircularProgress size={5}/>
        ) : (
            <Grid container spacing={6}>
                <Grid item sm={12}>
                    
                </Grid>
                <Grid item sm={12}>
                    
                </Grid>
                <hr className={classes.visibleSeparator}/>
            </Grid>
        )
        
        return(
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Expand scream" tipClassName={classes.expandButton}>
                    <UnfoldMore color="primary"/>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <MyButton tip="close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon/> 
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>        
            </Fragment>   
        )
    }   

}

// ScreamDialog.propTypes = {
//     clearErrors: PropTypes.func.isRequired,
//     getScream: PropTypes.func.isRequired,
//     screamId: PropTypes.string.isRequired,
//     userHandle: PropTypes.string.isRequired,
//     scream: PropTypes.object.isRequired,
//     UI: PropTypes.object.isRequired
// };

const mapStateToProps = (state) => ({
    user: state.user.userDevice,
    ui: state.ui
});

const mapActionsToProps = {
    getUserDevice,
    clearErrors
};

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(ScreamDialog));
