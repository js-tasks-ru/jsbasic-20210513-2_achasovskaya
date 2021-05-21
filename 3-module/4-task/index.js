
function showSalary(users, age) {
  let result = [];
  users.forEach(element => {
    if (element.age <= age) {
      result.push(element.name + ", " + element.balance);
    }
  });
  return result.join('\n');
};


