[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

[![Angular 17.3.7](https://img.shields.io/badge/Angular-17.0.8-dd0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)



# FinTracker Frontend
![Screenshot_23-5-2024_112936_localhost](https://github.com/cey-labs/fin-tracker-frontend/assets/78165134/7809af4d-3931-475b-a7e0-29c7dbc0b5cd)

FinTracker is a modern web application designed to help users manage their personal finances. This repository contains the Angular frontend for the application.

## Upcoming Features

* **Dashboard:** Overview of financial health, accounts, and recent transactions.
* **AI Assistant:** LLM based cahtbot to enhance user experience.
* **Transactions:** Detailed view and management of transactions.
* **Accounts:** Manage multiple accounts and track balances (e.g.: My Wallet, Savings Account).
* **Budgeting:** Set budgets for categories and track spending against them.
* **Reports:** Generate insightful financial reports.


## Technologies

* **Angular:** The frontend framework.
* **Material UI (MUI):**  Library for UI components and styling.

## Getting Started

1. **Prerequisites:**
   * `Node.js` and `npm` installed on your system.

2. **Installation:**
   * Fork this repository to your Github account and run following commands in your local environment,

     ```bash
     git clone <your-repository-url>
     cd fin-tracker-frontend
     npm install
     ```
   * Replace above `<your-repository-url>` with your forked repository URL.

3. **Development Server:**
   * Run the development server using foolowing coommand,

      ```bash
      ng serve
      ```
   * Open your browser to `http://localhost:4200/` to view the app.

4. **Environment Configuration (Optional):**
   * Create a `.env` file in the project root directory to store environment variables (API endpoints, etc.).

## Project Structure

* `src/app/`
    * `core/`
        * `components/` - Shared components (navbar, footer, etc.).
        * `services/` - Services for interacting with the backend API.
        * `models/` - Data models for transactions, accounts, etc.
    * `pages/` 
        * `home/`, `login/`, `signup/`, `dashboard/` - Feature modules for specific pages.
    * `app.component.*` - Main app component.
    * `app-routing.module.ts` - Routing configuration.


## Angular Commands

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.8.

* **Development server**

  * Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

* **Code scaffolding**

  * Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

* **Build**

   * Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

* **Running unit tests**

   * Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

* **Running end-to-end tests**

   * Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

* **Further help**

   * To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Contributing

We welcome contributions to FinTracker! Please see our `CONTRIBUTING.md` guide for details on how to submit issues, suggest features, and submit pull requests.

## License

Apache 2.0 License 
