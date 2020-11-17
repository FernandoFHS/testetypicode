import { Menu } from 'src/app/@core/models/menu.model';

export const menuItems: Menu[] = [
  { route: 'home', name: 'Home', type: 'link', icon: 'home' },
  { route: 'profile-list', name: 'Grupo de Usuários', type: 'link', icon: 'group' },
  { route: 'company-list', name: 'Estabelecimento', type: 'link', icon: 'store_mall_directory' },
  { route: 'password-transaction', name: 'Senha Transação', type: 'link', icon: 'vpn_key' },
  { route: 'rules', name: 'Regras', type: 'link', icon: 'rule'},
  { route: 'agreements', name: 'Contratos', type: 'link', icon: 'sticky_note_2' },
  { route: 'login', name: 'Login', type: 'link', icon: 'lock' },
]