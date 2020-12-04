export const environment = {
  production: true,
  baseUrl: 'http://localhost:8090/api/',
  baseUrlCompany: 'http://company.qa.appmobbuy.tech/',
  baseUrlPlans: 'http://register-plans.qa.appmobbuy.tech/',
  baseUrlPassword:'http://password-maintenance.qa.appmobbuy.tech/',
  api: {
    url: 'http://localhost:8080',
    mock: false
  },
  bff: {
    mock: true,
    url: 'http://company.qa.appmobbuy.tech',
    url_2: 'http://register-plans.qa.appmobbuy.tech',
    url_login: 'http://bffauthentication.qa.appmobbuy.tech:8080/users/login',
    url_financial: 'http://bfffinancial.qa.appmobbuy.tech:8080'
  }
};
