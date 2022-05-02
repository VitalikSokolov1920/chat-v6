export class SliceParamsRequest {
  // смещение
  offset: number;
  // сколько нужно элементов
  limit: number;
}

export class SliceParamsResponse<T> extends SliceParamsRequest {
  // получены все данные - true, false иначе
  isEnd?: boolean;
  // общее количество элементов
  total_count?: number;
  // массив элементов
  items?: T[];
}
