function namify(users) {
  let result = [];
  users.forEach(element => {
    result.push(element.name);
  });
  return result;
}
