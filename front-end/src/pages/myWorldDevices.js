import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

// Proptypes
import PropTypes from 'prop-types'; 

// Components
import UserDevice from '../components/devices/UserDevice';
import UserDeviceSkeleton from '../utilities/UserDeviceSkeleton';

// Redux stuff
import { connect } from 'react-redux';
//import { getScreams } from '../redux/actions/dataActions';

class myWorldDevices extends Component {

    // componentDidMount() {
    //     this.props.getScreams(); 
        
    // }

    render() {
        //const { screams, loading } = this.props.data;
        const userDevices = this.props.user.userDevices;
        const loading = this.props.user.loading;

        let userDevicesMarkup = !loading ? (
            userDevices.map(userDevice => <UserDevice key ={userDevice.userDeviceId} userDevice ={userDevice}/>)
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

home.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user.userDevices
})

export default connect(mapStateToProps)(myWorldDevices);
