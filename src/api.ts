import { FilmType, NoteType, SearchSuggestionType } from "./types";
import { API_BASE_URL } from "./config";

export class Api {
  BASE_URL = API_BASE_URL;

  private accessToken?: string;

  static async init() {
    const initData = window.Telegram?.WebApp.initData;

    if (!initData) {
      throw new Error("Init data not found");
    }

    const api = new Api();
    await api.loginViaTelegram(initData).then((token) => {
      api.accessToken = token;
    });

    return api;
  }

  async loginViaTelegram(initData: string): Promise<string> {
    const response = await fetch(`${this.BASE_URL}/auth/loginViaTelegram`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rawInitData: initData,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to login via telegram");
    }
    const data = await response.text();
    return data;
  }

  async getNotes(): Promise<NoteType[]> {
    const response = await fetch(`${this.BASE_URL}/notes`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to get films");
    }

    const data: {
      notes: {
        id: number;
        title: string;
        description: string;
        film?: {
          id: number;
          name: string;
          year: string;
          description: string;
          countries: string[];
          genres: string[];
          rating: number;
          ratingVoteCount: number;
          posterUrl: string;
          posterUrlPreview: string;
          reelName: string;
        };
        isSeen: boolean;
      }[];
    } = await response.json();

    return data.notes.map(
      (note) =>
        ({
          id: note.id,
          title: note.title,
          description: note.description,
          film: note.film
            ? ({
                id: note.film.id,
                name: note.film.name,
                image: note.film.posterUrl,
                description: note.film.description,
                status: note.isSeen ? "watched" : "none",
              } satisfies FilmType)
            : undefined,
          isSeen: note.isSeen,
        } satisfies NoteType)
    );
  }

  async deleteNote(noteId: string) {
    const response = await fetch(`${this.BASE_URL}/notes/${noteId}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete note");
    }
  }

  async searchFilms(value: string): Promise<Array<SearchSuggestionType>> {
    const response = await fetch(`${this.BASE_URL}/films/search`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
      method: "POST",
      body: JSON.stringify({
        value,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to search films");
    }

    const data: Array<{
      id: number;
      name: string;
      year: string;
      description: string;
      countries: string[];
      genres: string[];
      rating: number;
      ratingVoteCount: number;
      posterUrl: string;
      posterUrlPreview: string;
      reelName: string;
    }> = await response.json();

    return data.map((film) => ({
      id: film.id,
      title: film.name,
      description: film.description,
      subtitle: film.reelName,
      image: film.posterUrlPreview,
    }));
  }

  async createTextNode(
    title: string,
    description: string
  ): Promise<{
    id: number;
    title: string;
    description: string;
    film: {
      id: number;
      name: string;
      year: string;
      description: string;
      countries: string[];
      genres: string[];
      rating: number;
      ratingVoteCount: number;
      posterUrl: string;
      posterUrlPreview: string;
      reelName: string;
    } | null;
    isSeen: boolean;
  }> {
    const response = await fetch(`${this.BASE_URL}/notes`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        title,
        description,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create text note");
    }

    const data: {
      id: number;
      title: string;
      description: string;
      film: {
        id: number;
        name: string;
        year: string;
        description: string;
        countries: string[];
        genres: string[];
        rating: number;
        ratingVoteCount: number;
        posterUrl: string;
        posterUrlPreview: string;
        reelName: string;
      } | null;
      isSeen: boolean;
    } = await response.json();
    return data;
  }
  async createNoteViaFilmId(filmId: number): Promise<{
    id: number;
    title: string;
    description: string;
    film: {
      id: number;
      name: string;
      year: string;
      description: string;
      countries: string[];
      genres: string[];
      rating: number;
      ratingVoteCount: number;
      posterUrl: string;
      posterUrlPreview: string;
      reelName: string;
    } | null;
    isSeen: boolean;
  }> {
    const response = await fetch(`${this.BASE_URL}/notes/viaFilmId`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        filmId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create note via film id");
    }

    const data: {
      id: number;
      title: string;
      description: string;
      film: {
        id: number;
        name: string;
        year: string;
        description: string;
        countries: string[];
        genres: string[];
        rating: number;
        ratingVoteCount: number;
        posterUrl: string;
        posterUrlPreview: string;
        reelName: string;
      } | null;
      isSeen: boolean;
    } = await response.json();
    return data;
  }

  async updateTextNode(noteId: number, title: string, description: string) {
    const response = await fetch(`${this.BASE_URL}/notes/${noteId}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        title,
        description,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update text note");
    }
  }
}
