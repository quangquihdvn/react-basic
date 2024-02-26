import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            address: ''
        }

    }

    async componentDidMount() {
        var user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hashcode',
                firstname: user.firstName,
                lastname: user.lastName,
                address: user.address
            })
        }

    }

    handlerOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstname', 'lastname', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing paramete:' + arrInput[i]);
                break;
            }
        }

        return isValid;
    }

    handlerSaveUser = () => {
        var isValid = this.checkValidateInput();
        if (isValid) {
            this.props.editUser(this.state);
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                size='lg'
                className='modal-user-container'
            >
                <ModalHeader toggle={() => this.toggle()}>Update a new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text'
                                onChange={(event) => this.handlerOnChangeInput(event, "email")}
                                value={this.state.email}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password'
                                onChange={(event) => this.handlerOnChangeInput(event, "password")}
                                value={this.state.password}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Firstname</label>
                            <input type='text'
                                onChange={(event) => this.handlerOnChangeInput(event, "firstname")}
                                value={this.state.firstname}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Lastname</label>
                            <input type='text'
                                onChange={(event) => this.handlerOnChangeInput(event, "lastname")}
                                value={this.state.lastname}
                            />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input type='text'
                                onChange={(event) => this.handlerOnChangeInput(event, "address")}
                                value={this.state.address}
                            />
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary"
                        onClick={() => this.handlerSaveUser()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
