export type ConversionResponse = {
  query: { from: string; to: string; amount: number; };
  info: { rate: number; };
  result: number;
}
