import React, { Component } from 'react';
import { connect } from 'react-redux';


class HomeFooter extends Component {

    render() {

        return (
            <div className='home-footer'>
                <p>
                    &copy; 2024 Training reactjs by Bui Quang Qui.
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href='https://www.youtube.com/watch?v=147SkAVXEqM&list=PLncHg6Kn2JT7q7xHz8Ns3vP0ETxMJ78ts&index=28'>More infomation, please visit my youtube channel. &#8594; Click here &#8592;</a>
                </p>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
