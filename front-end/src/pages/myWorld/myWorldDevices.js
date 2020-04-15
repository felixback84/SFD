import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

// Proptypes
import PropTypes from 'prop-types'; 

// Components
import UserDevice from '../../components/myWorld/userDevices/UserDevice';
import UserDeviceSkeleton from '../../utilities/UserDeviceSkeleton';

// Redux stuff
import { connect } from 'react-redux';
import { getUserData } from '../../redux/actions/userActions';

class myWorldDevices extends Component {

    componentDidMount() {
        this.props.getUserData(); 
        
    }

    render() {
        const { userDevices, loading } = this.props.user;
        
        let userDevicesMarkup = !loading ? (
            userDevices.map(userDevice => <UserDevice key={userDevice.userDeviceId} userDevice={userDevice}/>)
        ) : (
            <UserDeviceSkeleton/>
        );
        return (
            <Grid container spacing={6}>
                <Grid item sm={12} xs={12}>
                    {userDevicesMarkup}
                </Grid>
            </Grid>
        );
    } 
}

myWorldDevices.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, {getUserData})(myWorldDevices);
