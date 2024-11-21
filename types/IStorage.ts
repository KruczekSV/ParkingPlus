export interface IStorage {
  get: (key: string) => Promise<string | null>;
  set: (key: string, value: string) => Promise<void>;
  remove: (key: string) => Promise<void>;
  clear: () => Promise<void>;
  getJSON: <T>(key: string) => Promise<T | null>;
  setJSON: (key: string, value: any) => Promise<void>;
}
