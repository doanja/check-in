import axios, { AxiosResponse } from 'axios';

export default class CheckInService {
  public getCheckIns(): Promise<AxiosResponse<any>> {
    return axios.get<any>('/api/checkIns');
  }

  public createCheckIn(): Promise<AxiosResponse<any>> {
    return axios.post<any>('/api/checkIns');
  }

  public deleteCheckIn(checkInId: string): Promise<AxiosResponse<any>> {
    return axios.delete<any>(`/api/checkIns/${checkInId}`);
  }

  public getSingleUserCheckIns(userId: string): Promise<AxiosResponse<any>> {
    return axios.get<any>(`/api/checkIns/${userId}`);
  }
}
