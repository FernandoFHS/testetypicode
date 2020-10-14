import { Menu } from 'src/app/@core/models/menu.model';

export const menuItems: Menu[] = [
  { route: 'home', name: 'Home', type: 'link', icon: 'home' },
  { route: 'user', name: 'Grupo de Usuários', type: 'link', icon: 'group' },
  { route: 'company', name: 'Estabelecimento', type: 'link', icon: 'group' },
  { route: 'passwordtransaction', name: 'Senha Transação', type: 'link', icon: 'vpn_key' },
  { route: 'login', name: 'Login', type: 'link', icon: 'lock' },
  { route: 'rule', name: 'Regras', type: 'link', icon: 'rule'}
]