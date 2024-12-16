import ROUTES from '../constants/router';
import { User } from '../pages/User/Join';
import apiClient, { getAuthToken } from './apiClient';

export const createUser = async (userData: User) => {
  try {
    const token = await getAuthToken();

    const response = await apiClient.post(ROUTES.JOIN, userData, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error status: ${error}`);
  }
};

export const getUser = async () => {
  try {
    const response = await apiClient.get(ROUTES.USER);
    return response.data;
  } catch (error) {
    console.error(`회원정보가 없습니다: ${error}`);
    throw new Error(`회원정보 조회 실패:  ${error}`);
  }
};

export interface updateUserProps {
  nickname?: string;
  age?: string;
  job?: string;
}

export const updateUser = async (data: updateUserProps) => {
  try {
    const response = await apiClient.put(ROUTES.UPDATE, data);
    return response.data;
  } catch (error) {
    console.error('회원정보 수정에 실패했습니다.: ', error);
    throw new Error(`회원정보 수정 실패:  ${error}`);
  }
};
