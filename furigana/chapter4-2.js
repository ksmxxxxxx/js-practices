let addCharge = (bill) => {
  if (bill < 0) {
    return 0;
  }
  return bill * 1.07;
};

console.log(addCharge(-1000));
