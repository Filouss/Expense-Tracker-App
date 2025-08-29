# Expense Tracker SPA

This repository contains the **Expense Tracker App**, a web application i have developed as a school project for the college course _"Klientské aplikace v javascrpitu"_.

## Overview

The Expense Tracker App allows users to easily manage, track, and review their expenses. Users can add, edit, and delete expenses, categorize them, and view statistics about their spending.

## Features

1. **Adding, editing, and deleting individual expenses**
   - Users can record the title, amount, date, category, and optionally a note for each expense.
   - Expenses are stored using the Local Storage API.
   - Editing is done by clicking on an expense to open the detail window and using the pencil icon.
2. **Graphs displaying monthly spending for the last year and a pie chart showing the distribution of expenses by category**
   - Graphs are rendered using the Chart.js Graph API.
3. **Top Bar showing the total expenses for the last month, information about the largest expense, and the sum of all expenses**
4. **Summary of all expenses divided by year and month**
5. **Navigation between app states using the History API**
6. **Sidebar widget on the home page showing expenses from the last month**
   - The widget lists expenses from newest to oldest and allows scrolling if the expenses exceed the widget’s size.

## Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Filouss/Expense-Tracker-App.git
   ```
2. **Run the app locally:**
   - Open the project folder in [Visual Studio Code](https://code.visualstudio.com/).
   - Use the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (or any similar static server) to launch `index.html` in your browser.
   - Alternatively, use any static file server (such as `http-server` or Python's `http.server`) to serve the files.

## Usage

- Add new expenses using the “Add New Expense” form.
- View, edit, or delete expenses from the main interface.
- Filter expenses by category.
- Explore statistics and graphs for an overview of your spending.

---

> _Developed by [Filouss](https://github.com/Filouss) for the course "Klientské aplikace v javascrpitu"._
