// constructer

// function Bankaccount(costumer_name,balance=0)
// { this.costumer_name=costumer_name;
//  this.balance=balance
//  this.deposite=function(amount){
//    this.balance+=amount
//  }

// }


// const ashaccount=new Bankaccount("ashim",3000)
// ashaccount.deposite(9000)
// console.log(ashaccount)

// classes

// 
class Bankaccount {
   constructor(costumer_name, balance = 0) {
      this.costumer_name = costumer_name;
      this.balance = balance;
      this.deposite = function (amount) {
         this.balance += amount;
      };
   }
}

// const ashaccount = new Bankaccount("ashim", 3000);
// ashaccount.deposite(9000);
// console.log(ashaccount);

// inheritance

// class CurrentAccount extends Bankaccount{
//    transectionLimit=500000
//    constructor(costumer_name,balance,lone){
//    super(costumer_name,balance)
//    this.lone=lone

// }
// }

// const Rakesh=new CurrentAccount("rakesh",9000,500000)
// console.log(Rakesh)

// encpulation

// function BankAccount(customerName, initialBalance = 0) {
//    let balance = initialBalance;
 
//    this.getCustomerName = function() {
//      return customerName;
//    };
 
//    this.getBalance = function() {
//      return balance;
//    };
 
//    this.deposit = function(amount) {
//      if (amount > 0) {
//        balance += amount;
//        return true;
//      }
//      return false;
//    };
 
//    this.withdraw = function(amount) {
//      if (amount > 0 && amount <= balance) {
//        balance -= amount;
//        return true;
//      }
//      return false;
//    };
//  }
 
//  const ashAccount = new BankAccount("Ashim", 3000);
//  ashAccount.deposit(9000);
//  console.log(ashAccount.getCustomerName()); // Output: Ashim
//  console.log(ashAccount.getBalance()); // Output: 12000
//  ashAccount.withdraw(2000);
//  console.log(ashAccount.getBalance()); // Output: 10000

// eg-2
// class BankAccount {
//    #balance; // Private field
 
//    constructor(customerName, initialBalance = 0) {
//      this.customerName = customerName;
//      this.#balance = initialBalance;
//    }
 
//    getCustomerName() {
//      return this.customerName;
//    }
 
//    getBalance() {
//      return this.#balance;
//    }
 
//    deposit(amount) {
//      if (amount > 0) {
//        this.#balance += amount;
//        return true;
//      }
//      return false;
//    }
 
//    withdraw(amount) {
//      if (amount > 0 && amount <= this.#balance) {
//        this.#balance -= amount;
//        return true;
//      }
//      return false;
//    }
//  }
 
//  const ashAccount = new BankAccount("Ashim", 3000);
//  ashAccount.deposit(9000);
//  console.log(ashAccount.getCustomerName()); // Output: Ashim
//  console.log(ashAccount.getBalance()); // Output: 12000
//  ashAccount.withdraw(2000);
//  console.log(ashAccount.getBalance()); // Output: 10000
 
 