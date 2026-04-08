import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';

// Helper to generate a consistent ID
const generateId = (index) => {
  return `usr-${String(index + 1).padStart(6, '0')}`;
};

// Helper for formatting Nigerian currency (with commas)
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Helper for Nigerian phone numbers
const generateNigerianPhone = () => {
  const prefixes = ['0803', '0806', '0703', '0903', '0813', '0816', '0810', '0814', '0906', '0706', '0805', '0705', '0905', '0815', '0811', '0809', '0909', '0817', '0818', '0802', '0902', '0701', '0708', '0812', '0901', '0907'];
  const prefix = faker.helpers.arrayElement(prefixes);
  const suffix = faker.string.numeric(7);
  return `${prefix}${suffix}`;
};

// Generate 500 users
const users = Array.from({ length: 500 }).map((_, index) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName }).toLowerCase();
  const statuses = ['Active', 'Inactive', 'Pending', 'Blacklisted'];

  return {
    id: generateId(index),
    organization: faker.helpers.arrayElement(['Lendsqr', 'Irise', 'Lendstar']),
    username: `${firstName} ${lastName}`,
    email,
    phoneNumber: generateNigerianPhone(),
    dateJoined: faker.date.past({ years: 3 }).toISOString(),
    status: faker.helpers.arrayElement(statuses),
    tier: faker.number.int({ min: 1, max: 3 }),
    personalInfo: {
      fullName: `${firstName} ${lastName}`,
      phoneNumber: generateNigerianPhone(),
      emailAddress: email,
      bvn: faker.string.numeric(11),
      gender: faker.helpers.arrayElement(['Male', 'Female']),
      maritalStatus: faker.helpers.arrayElement(['Single', 'Married', 'Divorced']),
      children: String(faker.number.int({ min: 0, max: 4 })),
      typeOfResidence: faker.helpers.arrayElement(["Parent's Apartment", 'Rented', 'Owned'])
    },
    
    educationAndEmployment: {
      levelOfEducation: faker.helpers.arrayElement(['B.Sc', 'M.Sc', 'PhD', 'OND', 'HND']),
      employmentStatus: faker.helpers.arrayElement(['Employed', 'Self-Employed', 'Unemployed']),
      sectorOfEmployment: faker.helpers.arrayElement(['FinTech', 'Health', 'Education', 'Agriculture']),
      durationOfEmployment: `${faker.number.int({ min: 1, max: 10 })} years`,
      officeEmail: faker.internet.email({ provider: 'company.com' }).toLowerCase(),
      monthlyIncome: `₦${formatCurrency(faker.finance.amount({ min: 200000, max: 400000, dec: 2, symbol: '' }))} - ₦${formatCurrency(faker.finance.amount({ min: 400000, max: 800000, dec: 2, symbol: '' }))}`,
      loanRepayment: `₦${formatCurrency(faker.finance.amount({ min: 10000, max: 50000, dec: 2, symbol: '' }))}`
    },
    
    socials: {
      twitter: `@${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
      facebook: `${firstName} ${lastName}`,
      instagram: `@${firstName.toLowerCase()}${lastName.toLowerCase()}`
    },
    
    guarantor: {
      fullName: faker.person.fullName(),
      phoneNumber: generateNigerianPhone(),
      emailAddress: faker.internet.email().toLowerCase(),
      relationship: faker.helpers.arrayElement(['Sister', 'Brother', 'Friend', 'Colleague'])
    },
    
    accountBalance: `₦${formatCurrency(faker.finance.amount({ min: 10000, max: 1000000, dec: 2, symbol: '' }))}`,
    accountNumber: faker.string.numeric(10), // Ensures strictly 10 digits
    bankName: faker.helpers.arrayElement(['Providus Bank', 'GTBank', 'Access Bank', 'Zenith Bank', 'First Bank'])
  };
});

// Write to public folder so it can be served dynamically during dev as an API mock
const dirPath = path.resolve('public', 'mock-api');
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

const targetPath = path.join(dirPath, 'users.json');
fs.writeFileSync(targetPath, JSON.stringify(users, null, 2), 'utf-8');

console.log(`Successfully generated 500 mock users at ${targetPath}`);
