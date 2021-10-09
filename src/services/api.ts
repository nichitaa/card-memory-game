import {randomInteger} from '../utils';

export class PokeApiService {
    private static instance: PokeApiService;

    private constructor() {
    }

    public static getInstance(): PokeApiService {
        if (!PokeApiService.instance) {
            PokeApiService.instance = new PokeApiService();
        }
        return PokeApiService.instance;
    }

    async fetchPokes(limit = 10): Promise<any> {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${randomInteger(1, 40)}`);
        const json = await response.json();
        return json.results;
    }

    async fetchSinglePoke(url: string): Promise<any> {
        return fetch(url)
            .then(res => res.json());
    }

}