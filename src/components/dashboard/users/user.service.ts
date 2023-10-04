import axios, { AxiosResponse } from 'axios';
import { API_URL } from 'common/app-consts';
import { getToken } from 'common/utils';

export interface User {
    created: string;
    createdbyuid: string;
    index: number;
    parentuid: string;
    parentusername: string;
    updated: string;
    username: string;
    useruid: string;
    isadmin: number;
}

export enum Status {
    // eslint-disable-next-line no-unused-vars
    OK = 'OK',
}

type Method = 'GET' | 'POST';

type ActionStatus = {
    status: Status;
};

type SortParams = {
    type: 'ASC' | 'DESC';
    column: 'username';
};

type Params = SortParams;

const fetchApiData = async <T>(
    method: Method,
    url: string,
    options?: { data?: any; params?: Params }
): Promise<T> => {
    const headers = { Authorization: `Bearer ${getToken()}` };
    const { data, params } = options || {};
    try {
        const response: AxiosResponse<T> = await axios({
            method,
            url: API_URL + url,
            data,
            params,
            headers,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createOrUpdateUser = (
    loginname: string,
    loginpassword: string,
    uid: string = '0'
): Promise<any> => {
    return fetchApiData('POST', `user/${uid}/user`, { data: { loginname, loginpassword } });
};

export const undeleteUser = (uid: string): Promise<ActionStatus> => {
    return fetchApiData<ActionStatus>('POST', `user/${uid}/undelete`);
};

export const setUserProfile = (uid: string, data: any): Promise<any> => {
    return fetchApiData('POST', `user/${uid}/profile`, { data });
};

export const copyUser = (srcuid: string): Promise<any> => {
    return fetchApiData<ActionStatus>('POST', `user/${srcuid}/copyuser`);
};

export const setUserOptionalData = (uid: string, data: any): Promise<any> => {
    return fetchApiData('POST', `user/${uid}/set`, { data });
};

export const getUsers = (params?: SortParams): Promise<User[]> => {
    const initialParams: SortParams = {
        column: params?.column || 'username',
        type: params?.type || 'ASC',
    };

    return fetchApiData<User[]>('GET', `user/0/list`, { params: initialParams });
};

export const getDeletedUsers = (params?: SortParams): Promise<User[]> => {
    const initialParams: SortParams = {
        column: params?.column || 'username',
        type: params?.type || 'ASC',
    };

    return fetchApiData<User[]>('GET', `user/0/listdeleted`, { params: initialParams });
};

export const deleteUser = (uid: string): Promise<any> => {
    return fetchApiData<ActionStatus>('POST', `user/${uid}/delete`);
};

export const setUserPermissions = (uid: string, data: any): Promise<any> => {
    return fetchApiData('POST', `user/${uid}/permissions`, { data });
};

export const getUserPermissions = (uid: string): Promise<string> => {
    return fetchApiData<string>('GET', `user/${uid}/permissions`);
};

export const getUserExtendedInfo = (uid: string): Promise<string> => {
    return fetchApiData<string>('GET', `user/${uid}/info`);
};

export const getUserLocations = (uid: string): Promise<string> => {
    return fetchApiData<string>('GET', `user/${uid}/locations`);
};

export const getUserProfile = (uid: string): Promise<string> => {
    return fetchApiData<string>('GET', `user/${uid}/profile`);
};

export const setUserSettings = (uid: string, data: any): Promise<any> => {
    return fetchApiData('POST', `user/${uid}/settings`, { data });
};

export const getUserSettings = (uid: string): Promise<any> => {
    return fetchApiData('GET', `user/${uid}/settings`);
};

export const listUserSessions = (uid: string): Promise<string> => {
    return fetchApiData<string>('GET', `user/${uid}/sessions`);
};

export const killSession = (uid: string): Promise<any> => {
    return fetchApiData('POST', `user/${uid}/session`);
};

export const listUserLogins = (uid: string): Promise<string> => {
    return fetchApiData<string>('GET', `user/${uid}/logins`);
};

export const listSubusers = (uid: string): Promise<string> => {
    return fetchApiData<string>('GET', `user/${uid}/subusers`);
};

export const listSalesPersons = (uid: string): Promise<string> => {
    return fetchApiData<string>('GET', `user/${uid}/salespersons`);
};

export const getUserShortInfo = (uid: string): Promise<string> => {
    return fetchApiData<string>('GET', `user/${uid}/username`);
};

export const getAllUIPermissions = (uid: string): Promise<string> => {
    return fetchApiData<string>('GET', `user/${uid}/listpermissions`);
};

export const getAllUITypes = (uid: string): Promise<string> => {
    return fetchApiData<string>('GET', `user/${uid}/listusertypes`);
};

export const clearCache = (): Promise<string[]> => {
    return fetchApiData<string[]>('GET', 'user/updateall');
};
