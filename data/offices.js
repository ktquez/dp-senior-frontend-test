import faker from 'faker'

let id = 1
const colors = ['bg-accent-blue', 'bg-accent-red', 'bg-accent-yellow', 'bg-primary-gray', 'bg-primary-darkBlue']

const officeSchema = {
  id: () => id,
  title: () => (faker.fake('{{company.companyName}}')),
  address: () => (faker.fake('{{address.streetAddress}}')),
  fullName: () => (faker.fake('{{name.findName}}')),
  jobPosition: () => (faker.fake('{{name.jobTitle}}')),
  email: () => (faker.fake('{{internet.email}}')),
  phone: () => (faker.fake('{{phone.phoneNumberFormat}}')),
  color: () => (colors[(Math.floor(Math.random() * colors.length) + 0)])
}

export default function makeOffices (numberItems = 10) {
  return new Array(numberItems)
    .fill(null)
    .map(office => {
      office = {}
      Object.keys(officeSchema).forEach(prop => {
        office[prop] = officeSchema[prop]()
      })
      ++id
      return office
    })
}
