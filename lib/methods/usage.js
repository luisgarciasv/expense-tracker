function usage() {
    return `
Hello and welcome to expense-tracker! Here are some examples to get you started:

# Adding a new expense
expense-tracker add --description Lunch --amount 20
# Output: Expense 'Lunch' added successfully.

Additionally, you can use an optional '--category' argument

# Adding another expense
expense-tracker add --description 'Dinner with wife' --amount 10 --category 'eat out'
# Output: Expense 'Dinner with wife' added successfully.

# Listing all your expenses
expense-tracker list
# ID: 1 - Description: Lunch - Amount: 20
# ID: 2 - Description: Dinner with wife - Amount: 50 - Category: eat out

# Viewing a summary of all expenses
expense-tracker summary
# The summary of all expenses is: $70

You can use an optional '--category' argument with list and summary as well

# Listing expenses that match the 'eat out' category
expense-tracker list --category 'eat out'
# ID: 2 - Description: Dinner with wife - Amount: 50 - Category: eat out

# Viewing a summary of expenses in the 'eat out' category
expense-tracker summaryy --category 'eat out'
# The summary of all expenses in the 'eat out' category is: $50

Updating an expense expects an id(required) and at least 1 value to update

# Updating an expense
expense-tracker update --id 3 --amount 20
# Expense 'cat food' updated successfully.

# Deleting an expense
expense-tracker delete --id 4
# Expense 'dog food' deleted successfully.
`;
}

export { usage };

// Add the --month variable into the whole App, ex. summary --month, list --month, etc.
