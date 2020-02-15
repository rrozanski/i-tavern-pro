import axios from 'axios';

export class QuestsApi {
    private readonly baseUrl: string = 'http://localhost:3000';

    public getQuests(): any {
        return axios.get(`${this.baseUrl}/quests`);
    }
}
