import { IPodcast } from '../types/Podcast';

class ItunesApiServices {
  private baseUrl = 'https://itunes.apple.com/search';

  public async searchPodcastById(term: string): Promise<IPodcast[]> {
    const url = `${this.baseUrl}?term=podcast&country=fr&limit=10&genreId=${term}`;

    const res = await fetch(url, {
      method: 'GET',
    });

    const resJson = (await res.json()) as { results: IPodcast[] };

    return resJson.results;
  }

  public async searchPodcastByTerm(term: string): Promise<IPodcast[]> {
    const url = `${this.baseUrl}?entity=podcast&country=fr&limit=10&term=${term}`;

    const res = await fetch(url, {
      method: 'GET',
    });

    const resJson = (await res.json()) as { results: IPodcast[] };

    return resJson.results;
  }
}

export const itunesApiServices = new ItunesApiServices();