function validateInputs() {
  const currentBalance = document.getElementById('currentBalance').value;
  const loanAmount = document.getElementById('loanAmount').value;
  const lastDepositDate = document.getElementById('lastDepositDate').value;
  const lastLoanDate = document.getElementById('lastLoanDate').value;
  const loanStartDate = document.getElementById('loanStartDate').value;
  const loanEndDate = document.getElementById('loanEndDate').value;

//Validate if current balance and loan amount are positive numbers
if(currentBalance <= 0 || loanAmount <= 0) {
  alert("Value must be a positive number.");
  return false;
}
//Check if the date inputs are valid
if (!Date.parse(lastDepositDate) || !Date.parse(lastLoanDate) || !Date.parse(loanStartDate) || !Date.parse(loanEndDate)) {
  alert("Please enter valid dates.");
  return false;
}

//Ensure loan repayment end date is after the start date
if (new Date(loanStartDate) >= new Date(loanEndDate)) {
  alert("Loan repayment end date must be after the start date.");
  return false;
}

return true;
}

function checkCreditWorthiness(){
  if (!validateInputs()) {
    return;
  }

  let score = 0;
  const currentBalance = parseFloat(document.getElementById('currentBalance').value);
  const loanAmount = parseFloat(document.getElementById('loanAmount').value);
  const creditHistory = document.querySelectorAll('inpute[name="creditHistory"]:checked').length;
  const lastDepositDate = new Date(document.getElementById('lastDepositDate').value);
  const lastLoanDate = new Date(document.getElementById('lastLoanDate').value);
  const loanStartDate = new Date(document.getElementById('loanStartDate').value);
  const loanEndDate = new Date(document.getElementById('loanEndDate').value);
  const accountType = document.getElementById('accountType').value;

  //Number 1: Current Account Balance;
  if (currentBalance >= loanAmount) {
    score += 10;
  }else{
    score -= 10;
  }

  //Number 2: Credit History of 6-month;
  if (creditHistory >= 6) {
    score += 10;
  }

  //Number 3: Last Deposit Date;
  const presentDay = new Date();
  const depositDiff = (presentDay - lastDepositDate) / (1000 * 60 * 24);
  if (depositDiff <= 30) {
    score += 5;
  }

  //Number 4: Last Loan Collection Date;
  const loanDiff = (presentDay - lastLoanDate) / (1000 * 60 * 60 * 24);
  if (loanDiff > 180) {
    score += 10;
  }


  //Number 5: Loan Repayment Period:
  const repaymentPeriod = (loanEndDate - loanStartDate) / (1000 * 60 * 60 * 24);
  if (repaymentPeriod < 180) {
    score += 5;
  }

  //Number 6: Account Type:
  if (accountType === 'current') {
    score += 10;
  }else if (accountType === 'savings') {
    score += 5;
  }

  //Result Display:
  const result = document.getElementById('result');
  if (score > 30) {
    result.innerText = `Credit Worthiness Score: ${score} - Loan Approved`;    
  }else {
    result.innerText = `Credit Worthiness Score: ${score} - Loan Denied`;
  }
}