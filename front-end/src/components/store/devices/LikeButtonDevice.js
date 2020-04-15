import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// Redux
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../../redux/actions/dataActions';

class LikeButton extends Component {

    // if the like already exists for the user
    likedScream = () => {
        if(
            this.props.user.likes && 
            this.props.user.likes.find(
                    (like) => like.screamId === this.props.screamId
                ) 
        )
            return true;
        else return false;
    };
    // action to add like
    likeScream = () => {
        this.props.likeScream(this.props.screamId);
    };

    // action to undo like
    unlikeScream = () => {
        this.props.unlikeScream(this.props.screamId);
    };

    render() {
        const { authenticated } = this.props.user;
        //like button logic to call one of above actions
        const likeButton = !authenticated ? (
        <Link to="/login">
            <MyButton tip="Like">
                <FavoriteBorder color="primary"/>
            </MyButton>
        </Link>
        ) : (this.likedScream() ? (
                <MyButton tip="Undo like" onClick={this.unlikeScream}>
                    <FavoriteIcon color="primary"/>
                </MyButton>
                ) : (
                <MyButton tip="Like" onClick={this.likeScream}>
                    <FavoriteBorder color="primary"/>
                </MyButton>
                    )
            );
            return likeButton;
            
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    likeScream,
    unlikeScream
};

export default connect(mapStateToProps,mapActionsToProps)(LikeButton);
