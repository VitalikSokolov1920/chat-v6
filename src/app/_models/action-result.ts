export class ActionResult<T> {
  actionResult: boolean;

  result: T;

  error?: string;
}

export class ActionResultSliceParamsResponse<T> extends ActionResult<T>{
  isEnd?: boolean;
  // общее количество элементов
  total_count?: number;
}
