import { Menu } from 'src/app/@core/models/menu.model';

export const menuItems: Menu[] = [
  { route: 'home', display_name: 'Home', icon_name: 'home', children: [], open: false },
  {
    route: 'transaction', display_name: 'Conta Corrente', icon_name: 'payments', children: [
      { route: 'transaction/extract', icon_name: 'receipt_long', display_name: 'Extrato', children: [], open: false },
      { route: 'transaction/mov', icon_name: 'history_edu', display_name: 'Lançamentos Futuros', children: [], open: false }
    ], open: false
  },
  { route: 'profiles', display_name: 'Grupo de Usuários', icon_name: 'group', children: [], open: false },
  { route: 'companies', display_name: 'Estabelecimentos', icon_name: 'store_mall_directory', children: [], open: false },
  { route: 'password-transaction', display_name: 'Senha Transação', icon_name: 'vpn_key', children: [], open: false },
  { route: 'rules', display_name: 'Regras', icon_name: 'rule', children: [], open: false },
  { route: 'agreements', display_name: 'Contratos', icon_name: 'sticky_note_2', children: [], open: false },
  { route: 'login', display_name: 'Login', icon_name: 'lock', children: [], open: false },
]