declare global {
  function route(
    name: string,
    params?: Record<string, unknown>,
    absolute?: boolean,
  ): string;
}
export {};
