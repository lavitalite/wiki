/* type.ts */
export interface INavLink {

  icon?: string | { symbolId: string };
  badge?:
  | string
  | {
    text: string
    type: 'info' | 'tip' | 'warning' | 'danger'
  }
  title: string
  desc?: string
  link: string
}

export interface NavData {
  title: string
  items: INavLink[]
}