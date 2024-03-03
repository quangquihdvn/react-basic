import actionTypes from './actionTypes';
import {
    getAllCodeService,
    createNewUserService,
    getAllUsers,
    deleteUserService,
    updateUserService,
    getTopDoctorHomeService
} from '../../services/userService';
import { toast } from 'react-toastify';


export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            });
            let res = await getAllCodeService("gender");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        }
        catch (e) {
            dispatch(fetchGenderFailed());
            console.log(e);
        }
    }

};

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
})

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAIL
})


export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("position");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        }
        catch (e) {
            dispatch(fetchPositionFailed());
            console.log(e);
        }
    }

};

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("role");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        }
        catch (e) {
            dispatch(fetchRoleFailed());
            console.log(e);
        }
    }

};

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data)
            if (res && res.errCode === 0) {
                toast.success("create a new user succeed!");
                dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(saveUserFail());
            }
        }
        catch (e) {
            dispatch(saveUserFail());
            console.log(e);
        }
    }
}


export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL
})

export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("All");
            if (res && res.errCode === 0) {
                let users = res.users.reverse();
                dispatch(fetchAllUserSuccess(users));
            } else {
                toast.error("fetch user error");
                dispatch(fetchAllUserFailed());
            }
        }
        catch (e) {
            toast.error("fetch user error");
            dispatch(fetchAllUserFailed());
            console.log(e);
        }
    }
};

export const fetchAllUserSuccess = (users) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    data: users
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAIL
})

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId)
            if (res && res.errCode === 0) {
                toast.success("delete user succeed!");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error("delete user error");
                dispatch(deleteUserFailed());
            }
        }
        catch (e) {
            toast.error("delete user error");
            dispatch(deleteUserFailed());
            console.log(e);
        }
    }
}

export const deleteUserSuccess = (users) => ({
    type: actionTypes.DELETE_USER_SUCCESS,
    data: users
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAIL
})

export const editUserStart = (user) => {
    return async (dispatch, getState) => {
        try {
            let res = await updateUserService(user)
            if (res && res.errCode === 0) {
                toast.success("Update user succeed!");
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error("Update user error");
                dispatch(editUserFailed());
            }
        }
        catch (e) {
            toast.error("Update user error");
            dispatch(editUserFailed());
            console.log(e);
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAIL
})

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAIL
                })
            }
        }
        catch (e) {
            console.log(e);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAIL
            })
        }
    }
}
//let res1 = await getTopDoctorHomeService(3);