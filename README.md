# BMI-Calculator-Testing-QEA25PW002-Team-04

Automated testing project for a BMI Calculator web application, developed during a hackathon using **Playwright**. The testing process was guided by the **Functional Requirements Document (FRD)** and focused on validating core functionalities, UI responsiveness, and edge case handling. 

## 🔗 Application Under Test

[BMI Calculator](https://bodymassindexcalculator1.netlify.app/)  

## 📌 Project Highlights

- ✅ Based on FRD of the BMI Calculator  
- 🧠 Designed using the **Page Object Model (POM)** for maintainability  
- 🧪 Automated with **Playwright**  
- 👥 Team collaboration with modular structure  

## 🗂️ Folder Structure

```
├── allure-report/        # Generated Allure report
├── allure-results/       # Raw results for Allure
├── data/                 # Test data and expected results
├── keywords/             # Reusable test actions and logic
├── pages/                # Page Object Model classes
├── playwright-report/    # Playwright HTML report
├── screenshots/          # Screenshots captured during test runs
├── test-results/         # Raw test result files
├── tests/                # Test scripts
├── utils/                # Utility functions and helpers
├── BMICalculator.xlsx    # Test document with scenarios, cases, defects, RTM
├── BMICalculatorFRD.pdf  # Functional Requirements Document
├── package.json          # Project metadata and dependencies
├── package-lock.json     # Dependency lock file
├── playwright.config.js  # Playwright configuration
```

## 📄 Documentation Includes

- Test Scenarios  
- Test Cases  
- Defect Report  
- Requirements Traceability Matrix (RTM)  
- Functional Requirements Document (FRD)

## 📊 Reporting

- **Allure Report**: Interactive and detailed test execution insights  
- **Playwright HTML Report**: Lightweight summary of test results  
- **Screenshots**: Captured during test failures or validations

## 🚀 How to Run Tests

1. Install dependencies  
   ```bash
   npm install
   ```

2. Run tests  
   ```bash
   npx playwright test
   ```

3. Generate Allure report  
   ```bash
   npx allure generate allure-results --clean -o allure-report
   npx allure open allure-report
   ```
   
## 📋 Requirements

To run this project locally, ensure the following are installed:

- [Node.js](https://nodejs.org/) (v16 or later recommended)  
- [Playwright](https://playwright.dev/)  
- [Allure Commandline](https://docs.qameta.io/allure/) (for generating reports)  

> ⚠️ `node_modules` folder not uploaded to GitHub.  
> Instead, `package.json`, `package-lock.json`, and `playwright.config.js` are included.  
> After cloning the repo, run `npm install` to restore dependencies.

## 📄 License

This project is open-source and free to use under the MIT License.
