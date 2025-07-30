export interface PageData {
  url: string;
  page_authority: number;
  backlinks: number;
}

export interface JsonData {
  domain: string;
  pages: PageData[];
  domain_authority: number;
}

export interface CsvRow {
  Address: string;
  Indexability: string;
  "Alt Text": string;
  "Content-Type": string;
}

export interface ProcessedMetrics {
  domain: string;
  indexable_pages: number;
  images_without_alt: number;
  average_page_authority: number;
  total_backlinks: number;
}

export interface FileUploadState {
  jsonFile: File | null;
  csvFile: File | null;
  jsonData: JsonData | null;
  csvData: CsvRow[];
} 