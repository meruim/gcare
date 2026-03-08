export interface InstallStep {
  id: number;
  title: string;
  description?: string;
  instructions: string[];
  images: string[];
  note?: string;
}
