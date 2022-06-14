var faker = require('faker')

function generateEmployees () {
  var postsEmployee = []
  for (var id = 0; id < 5; id++) {
    var firstName = faker.name.firstName()
    var lastName = faker.name.lastName()
    var email = faker.internet.email()
    var birthDate = faker.date.between();
    var basicSalary = faker.finance.account(7);
    var status = faker.name.status();
    var group = faker.name.group();
    var description = faker.name.between();

    postsEmployee.push({
      "id": id,
      "first_name": firstName,
      "last_name": lastName,
      "email": email,
      "birthDate": birthDate,
      "basicSalary": basicSalary,
      "status": status,
      "group": group,
      "description": description,
    })
  }
  return { "postsEmployee": postsEmployee }
}
module.exports = generateEmployees