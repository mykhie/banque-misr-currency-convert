export interface ConversionModel {
  amount: number;
  from?: string;
  to?: string;
  [key: string]: number | string | undefined;
}
