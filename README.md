<div align="center">

## expense-tracker

**Simple** and **easy-to-use** expense tracker for your terminal.

**expense-tracker** helps you manage your finances by keeping track of your daily expenses. It allows you to add,
update, delete, list, and summarize your expenses directly from your terminal.

</div>

## Getting Started

**Prerequisites:** This tool requires no additional installations.

## ⌨️ Usage

The `expense-tracker` command accepts various options to manage your expenses.

**Adding Expenses**

- Use the `add` subcommand to add a new expense.
- **Required:**
  - `--description`: A brief description of the expense.
  - `--amount`: The amount spent on the expense (numerical value).
- **Optional:**
  - `--category`: The category of the expense (e.g., "groceries", "entertainment").

**Examples:**

```bash
# Add an expense for lunch
expense-tracker add --description "Lunch" --amount 20
# Output: Expense "Lunch" added successfully.

# Add an expense with a category
expense-tracker add --description "Dinner with wife" --amount 50 --category "eat out"
# Output: Expense "Dinner with wife" added successfully.
```

**Listing Expenses**

- Use the `list` subcommand to view all your expenses.
- **Optional:**
  - `--category`: Filter expenses by a specific category.

**Examples:**

```bash
# List all expenses
expense-tracker list
# ID: 1 - Description: Lunch - Amount: 20
# ID: 2 - Description: Dinner with wife - Amount: 50 - Category: eat out

# List expenses in the "eat out" category
expense-tracker list --category "eat out"
# ID: 2 - Description: Dinner with wife - Amount: 50 - Category: eat out
```

**Summarizing Expenses**

- Use the `summary` subcommand to get a total overview of your expenses.
- **Optional:**
  - `--category`: Summarize expenses for a specific category.

**Examples:**

```bash
# View the summary of all expenses
expense-tracker summary
# The summary of all expenses is: $70

# Summarize expenses in the "eat out" category
expense-tracker summary --category "eat out"
# The summary of all expenses in the "eat out" category is: $50
```

**Updating Expenses**

- Use the `update` subcommand to modify an existing expense.
- **Required:**
  - `--id`: The unique identifier of the expense you want to update.
- **Specify at least one additional option to update:**
  - `--description`: Update the expense description.
  - `--amount`: Update the expense amount.
  - `--category`: Update the expense category.

**Example:**

```bash
# Update the amount of expense ID 1
expense-tracker update --id 1 --amount 30
# Output: Expense "Lunch" updated successfully.
```

**Deleting Expenses**

- Use the `delete` subcommand to remove an expense.
- **Required:**
  - `--id`: The unique identifier of the expense you want to delete.

**Example:**

```bash
# Delete expense ID 2
expense-tracker delete --id 2
# Output: Expense "Dinner with wife" deleted successfully.
```

This usage guide provides a basic overview of `expense-tracker`. Feel free to experiment and explore its
functionalities!

## ⭐️ Acknowledgement

This project is part of the [Roadmap.sh Project Ideas](https://roadmap.sh/projects) -
<https://roadmap.sh/projects/expense-tracker>
