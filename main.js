import chalk from 'chalk';
import inquirer from 'inquirer';
// Customer class
class Customer {
    name;
    age;
    address;
    contactDetails;
    constructor(name, age, address, contactDetails) {
        this.name = name;
        this.age = age;
        this.address = address;
        this.contactDetails = contactDetails;
    }
}
// Bank Account Class
class BankAccountImpl {
    accountNumber;
    customer;
    balance = 0;
    constructor(accountNumber, customer) {
        this.accountNumber = accountNumber;
        this.customer = customer;
    }
    deposit(amount) {
        this.balance += amount;
    }
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
        }
        else {
            throw new Error(chalk.red("Insufficient funds"));
        }
    }
    getBalance() {
        return this.balance;
    }
    transferFunds(toAccount, amount) {
        if (this.balance >= amount) {
            this.withdraw(amount);
            toAccount.deposit(amount);
        }
        else {
            throw new Error(chalk.red("Insufficient funds for transfer"));
        }
    }
}
async function main() {
    console.log(chalk.bgBlueBright("Welcome to the Bank Application!"));
    // Get customer details
    const customerDetails = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter your name:'
        },
        {
            type: 'number',
            name: 'age',
            message: 'Enter your age:'
        },
        {
            type: 'input',
            name: 'address',
            message: 'Enter your address:'
        },
        {
            type: 'input',
            name: 'contactDetails',
            message: 'Enter your contact details:'
        }
    ]);
    const customer = new Customer(customerDetails.name, customerDetails.age, customerDetails.address, customerDetails.contactDetails);
    console.log(chalk.yellow("Customer details saved successfully!"));
    // Create bank account
    const accountNumber = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a random account number
    const bankAccount = new BankAccountImpl(accountNumber, customer);
    console.log(chalk.bgMagenta(`Your account number is: ${accountNumber}`));
    // Deposit money
    const depositAmount = await inquirer.prompt({
        type: 'number',
        name: 'amount',
        message: 'Enter the amount to deposit:'
    });
    bankAccount.deposit(depositAmount.amount);
    console.log(chalk.green(`Deposited ${depositAmount.amount} successfully!`));
    // Withdraw money
    const withdrawAmount = await inquirer.prompt({
        type: 'number',
        name: 'amount',
        message: 'Enter the amount to withdraw:'
    });
    bankAccount.withdraw(withdrawAmount.amount);
    console.log(chalk.green(`Withdrawn ${withdrawAmount.amount} successfully!`));
    // Display balance
    console.log(chalk.yellow(`Your current balance is: ${bankAccount.getBalance()}`));
}
// Run the main function
main();
