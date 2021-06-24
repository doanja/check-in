import { Prisma } from '.prisma/client';
import axios, { AxiosResponse } from 'axios';

export default class UserService {
  public getUsers(): Promise<AxiosResponse<any>> {
    return axios.get<any>('/api/users');
  }

  public createUser(user: Prisma.UserCreateInput): Promise<AxiosResponse<any>> {
    return axios.post<any>('/api/users', { user });
  }

  public deleteUser(userId: string): Promise<AxiosResponse<any>> {
    return axios.delete<any>(`/api/users/${userId}`);
  }

  public checkInUser(userId: string): Promise<AxiosResponse<any>> {
    return axios.put<any>(`/api/users/${userId}`);
  }
}
