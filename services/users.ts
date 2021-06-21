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
    console.log(`userId`, userId);
    return axios.delete<any>(`/api/users/${userId}`);
  }
}
