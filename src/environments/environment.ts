export const environment = {
  baseUrl: 'http://localhost:8090/api/',
  baseUrlCompany: 'http://company.qa.appmobbuy.tech:8080/',
  baseUrlPlans: 'http://register-plans.qa.appmobbuy.tech:8080/',
  baseUrlPassword:'http://password-maintenance.qa.appmobbuy.tech:8080/',
  baseUrlRecoverPassword: 'http://company-front.qa.appmobbuy.tech/password-recover-validation',
  production: false,
  api: {
    url: 'https://mobbuy-monitoring.azurewebsites.net',
    mock: false
  },
  bff: {
    mock: true,
    url: 'http://company.qa.appmobbuy.tech:8080',
    url_2: 'http://register-plans.qa.appmobbuy.tech:8080',
    url_login: 'http://bffauthentication.qa.appmobbuy.tech:8080/users/login',
    url_financial: 'http://transaction.qa.appmobbuy.tech'
  },
  login_mobbuy: {
    email: 'angular@mobbuy.com.br',
    password: '4321'
  }
};
