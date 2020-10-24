import { Menu } from 'src/app/@core/models/menu.model';

export const menuItems: Menu[] = [
  { route: 'home', name: 'Home', type: 'link', icon: 'home' },
  { route: 'profile-list', name: 'Grupo de Usuários', type: 'link', icon: 'group' },
  { route: 'company-list', name: 'Estabelecimento', type: 'link', icon: 'house' },
  { route: 'password-transaction', name: 'Senha Transação', type: 'link', icon: 'vpn_key' },
  { route: 'login', name: 'Login', type: 'link', icon: 'lock' },
  { route: 'login', name: 'Planos', type: 'link', icon: 'lock' }
]