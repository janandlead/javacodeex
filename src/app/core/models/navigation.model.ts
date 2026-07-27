export interface NavigationItem {
  readonly label: string;
  readonly route?: string;
  readonly icon?: string;
  readonly exact?: boolean;
  readonly external?: boolean;
  readonly heading?: boolean;
  readonly children?: readonly NavigationItem[];
}
