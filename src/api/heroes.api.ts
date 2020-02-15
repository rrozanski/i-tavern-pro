import { Hero } from '@/models';
import axios from 'axios';

export class HeroesApi {
    private readonly baseUrl: string = 'http://localhost:3000';

    public getHeroes(): any {
        return axios.get(`${this.baseUrl}/heroes`);
    }

    public createHero(hero: Hero): any {
        return axios.post(`${this.baseUrl}/hero`, hero);
    }

    public deleteHero(heroId: number): any {
        return axios.delete(`${this.baseUrl}/hero/${heroId}`);
    }
}
