import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers, createNewUserService, deleteUserService, updateUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from "../../utils/emitter"

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUsers();
    }

    getAllUsers = async () => {
        let response = await getAllUsers('All');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handlerAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,

        })
    }

    handlerEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    doEditUser = async (user) => {
        try {
            let response = await updateUserService({
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                address: user.address
            });

            if (response && response.errCode !== 0) {
                alert(response.message);
            }
            else {
                await this.getAllUsers();
                this.setState({
                    isOpenModalEditUser: false,
                });
            }
        }
        catch (e) {
            console.log(e);
        }

    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        });
    }

    toggleEditUserModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        });
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.message);
            }
            else {
                await this.getAllUsers();
            }

            this.setState({
                isOpenModalUser: false,
            });

            //fire event to modal
            emitter.emit("EVENT_CLEAR_MODAL_DATA");
        }
        catch (e) {
            console.log(e);
        }
    }

    handlerDeleteUser = async (user) => {
        try {
            let res = await deleteUserService(user.id);
            if (res && res.errCode !== 0) {
                alert(res.message);
            }
            else {
                await this.getAllUsers();
            }

        }
        catch (e) {
            console.log(e);
        }
    }

    /**Life cyle
     * Run component:
     * 1.Run constructor -> init state
     * 2.Did mount
     * 3.Render
     */
    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className='users-container'>
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {
                    this.state.isOpenModalEditUser && <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleEditUserModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }
                <div className='title text-center'>
                    Manage Users
                </div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                        onClick={() => this.handlerAddNewUser()}
                    ><i className='fas fa-plus'></i> Add new users</button>
                </div>
                <div className='users-table mt-3 mx-1'>

                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>

                            {
                                arrUsers && arrUsers.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className='btn-edit' onClick={() => this.handlerEditUser(item)}> <i className="fas fa-pencil-alt"></i></button>
                                                <button className='btn-delete' onClick={() => this.handlerDeleteUser(item)}><i className="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div >
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
