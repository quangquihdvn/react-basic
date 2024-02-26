import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    state = {

    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                size='lg'
                className='modal-user-container'
            >
                <ModalHeader toggle={() => this.toggle()}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text' />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password' />
                        </div>
                        <div className='input-container'>
                            <label>Firstname</label>
                            <input type='text' />
                        </div>
                        <div className='input-container'>
                            <label>Lastname</label>
                            <input type='text' />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input type='text' />
                        </div>
                    </div>
                    
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" 
                    onClick={() => this.toggle()}
                    className='px-3'
                    >
                        Save changes
                    </Button>{' '}
                    <Button color="secondary" 
                    onClick={() => this.toggle()}
                    className='px-3'
                    >
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
