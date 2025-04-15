export type FilmType = {
  id: number;
  name: string;
  image: string;
  description: string;
  status: 'none' | 'saved' | 'watched';
}

export type ReelType = {
  id: number;
  film: FilmType;
  isLiked: boolean;
  likesCount: number;
}

export type SearchSuggestionType = {
  id: number;
  title: string;
  description: string;
  subtitle: string;
  image: string;
}

export type NoteTextType = {
  id: number;
  title: string;
  description: string;
  isSeen: boolean;
}

export type NoteFilmType = {
  id: number;
  film: FilmType;
  isSeen: boolean;
}

export type NoteType = NoteTextType | NoteFilmType;
