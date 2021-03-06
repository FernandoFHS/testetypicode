export const environment = {
  production: false,
  baseUrl: 'http://localhost:8090/api/',
  // baseUrlCompany: 'http://company.qa.appmobbuy.tech/',
  baseUrlCompany: 'http://bffmaintenance.qa.appmobbuy.tech:8080/',

  // baseUrlPlans: 'http://register-plans.qa.appmobbuy.tech/',
  baseUrlPlans: 'https://bffmaintenancedev.qa.appmobbuy.tech/',
  // baseUrlPassword:'http://password-maintenance.qa.appmobbuy.tech/',
  baseUrlPassword:'http://bffmaintenance.qa.appmobbuy.tech:8080/',

  baseUrlRecoverPassword: 'http://company-front.qa.appmobbuy.tech/password-recover-validation',
  api: {
    url: 'https://mobbuy-monitoring.azurewebsites.net',
    mock: false
  },
  bff: {
    url: 'http://company.qa.appmobbuy.tech',
    url_2: 'http://register-plans.qa.appmobbuy.tech',
    mock: false,
    url_login: 'http://bffauthentication.qa.appmobbuy.tech:8080/users/login',
    url_financial: 'http://transaction.qa.appmobbuy.tech',
    url_account: 'http://account.qa.appmobbuy.tech'
  },
  login_mobbuy: {
    email: 'angular@mobbuy.com.br',
    password: '4321'
  }
};
