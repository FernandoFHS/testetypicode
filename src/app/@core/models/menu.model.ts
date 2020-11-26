export class Menu {
  display_name: string;
  disabled?: boolean;
  icon_name: string;
  route?: string;
  children?: Menu[];
  open: boolean = false;
}