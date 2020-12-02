import { Menu } from 'src/app/@core/models/menu.model';

export const menuItems: Menu[] = [
  { route: 'home', display_name: 'Home', icon_name: 'home', children: [], open: false },
  {
    route: 'current-account', display_name: 'Conta Corrente', icon_name: 'payments', children: [
      { route: 'current-account/extract/1', icon_name: 'receipt_long', display_name: 'Extrato', children: [], open: false },
      { route: 'current-account/future-postings', icon_name: 'history_edu', display_name: 'Lançamentos Futuros', children: [], open: false }
    ], open: false
  },
  { route: 'transactions', display_name: 'Transações', icon_name: 'local_atm', children: [], open: false },
  { route: 'profiles', display_name: 'Grupo de Usuários', icon_name: 'group', children: [], open: false },
  { route: 'companies', display_name: 'Empresas', icon_name: 'store_mall_directory', children: [], open: false },
  { route: 'password-transaction', display_name: 'Senha Transação', icon_name: 'vpn_key', children: [], open: false },
  { route: 'rules', display_name: 'Regras', icon_name: 'rule', children: [], open: false },
  { route: 'login', display_name: 'Login', icon_name: 'lock', children: [], open: false },
]