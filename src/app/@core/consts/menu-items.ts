import { Menu } from 'src/app/models/Menu';

export const menuItems: Menu[] = [
  { route: 'home', name: 'Home', type: 'link', icon: 'home' },
  { route: 'user', name: 'Grupo de Usuários', type: 'link', icon: 'group'},
  { route: 'company', name: 'Estabelecimento', type: 'link', icon: 'group'},
  { route: 'login', name: 'Login', type: 'link', icon: 'lock'}

]