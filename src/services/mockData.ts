import type { User, UserStatus } from "../types";

const organizations = [
  "Lendsqr",
  "Irorun",
  "Lendstar",
  "Kredi",
  "Alat",
  "Paystack",
  "Flutterwave",
  "Kuda",
  "PiggyVest",
  "Cowrywise",
];

const firstNames = [
  "Grace",
  "Debby",
  "Tosin",
  "Adedeji",
  "Chukwuemeka",
  "Oluwaseun",
  "Chidinma",
  "Adebayo",
  "Ngozi",
  "Emeka",
  "Fatima",
  "Ibrahim",
  "Aisha",
  "Yusuf",
  "Chinonso",
  "Obinna",
  "Adaeze",
  "Chinedu",
  "Bukola",
  "Olumide",
  "Funke",
  "Segun",
  "Kemi",
  "Tunde",
  "Bola",
  "Wale",
  "Sade",
  "Femi",
  "Yemi",
  "Dayo",
  "Kunle",
  "Bisi",
  "Tayo",
  "Gbenga",
  "Nneka",
  "Uche",
];

const lastNames = [
  "Effiom",
  "Ogana",
  "Dokunmu",
  "Okonkwo",
  "Adeyemi",
  "Nwosu",
  "Ibrahim",
  "Aliyu",
  "Bakare",
  "Okafor",
  "Adeleke",
  "Eze",
  "Abubakar",
  "Mohammed",
  "Obi",
  "Okoro",
  "Balogun",
  "Okeke",
  "Adeniyi",
  "Ogundimu",
  "Fashola",
  "Akinyemi",
  "Oladipo",
  "Idowu",
];

const statuses: UserStatus[] = ["Active", "Inactive", "Pending", "Blacklisted"];

const educationLevels = ["B.Sc", "M.Sc", "HND", "OND", "PhD", "SSCE"];

const employmentStatuses = [
  "Employed",
  "Self-employed",
  "Unemployed",
  "Student",
];

const sectors = [
  "FinTech",
  "Banking",
  "Technology",
  "Education",
  "Healthcare",
  "Agriculture",
  "Manufacturing",
];

const residenceTypes = [
  "Parent's Apartment",
  "Rented Apartment",
  "Owner",
  "Company Provided",
];

const relationships = [
  "Sister",
  "Brother",
  "Mother",
  "Father",
  "Friend",
  "Colleague",
  "Spouse",
];

const banks = [
  "Providus Bank",
  "GTBank",
  "First Bank",
  "Access Bank",
  "UBA",
  "Zenith Bank",
  "Sterling Bank",
];

const getRandomItem = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const getRandomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generatePhoneNumber = (): string => {
  const prefixes = [
    "0803",
    "0805",
    "0806",
    "0807",
    "0808",
    "0809",
    "0810",
    "0813",
    "0814",
    "0816",
    "0903",
    "0906",
  ];
  return `${getRandomItem(prefixes)}${getRandomNumber(1000000, 9999999)}`;
};

const generateBVN = (): string => {
  return `${getRandomNumber(10000000000, 99999999999)}`;
};

const generateAccountNumber = (): string => {
  return `${getRandomNumber(1000000000, 9999999999)}`;
};

const generateEmail = (
  firstName: string,
  lastName: string,
  organization: string,
): string => {
  const domains = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    `${organization.toLowerCase()}.com`,
  ];
  return `${firstName.toLowerCase()}${lastName.toLowerCase()}@${getRandomItem(domains)}`;
};

const generateDate = (): string => {
  const start = new Date(2019, 0, 1);
  const end = new Date(2024, 11, 31);
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
  return date.toISOString();
};

const generateTwitterHandle = (firstName: string): string =>
  `@${firstName.toLowerCase()}_${getRandomNumber(1, 999)}`;
const generateFacebookName = (firstName: string, lastName: string): string =>
  `${firstName} ${lastName}`;
const generateInstagramHandle = (firstName: string): string =>
  `@${firstName.toLowerCase()}_${getRandomNumber(1, 999)}`;

export const generateUser = (index: number): User => {
  const firstName = getRandomItem(firstNames);
  const lastName = getRandomItem(lastNames);
  const organization = getRandomItem(organizations);
  const guarantorFirstName = getRandomItem(firstNames);
  const guarantorLastName = getRandomItem(lastNames);

  return {
    id: `usr-${String(index + 1).padStart(6, "0")}`,
    organization,
    username: `${firstName} ${lastName}`,
    email: generateEmail(firstName, lastName, organization),
    phoneNumber: generatePhoneNumber(),
    dateJoined: generateDate(),
    status: getRandomItem(statuses),
    personalInfo: {
      fullName: `${firstName} ${lastName}`,
      phoneNumber: generatePhoneNumber(),
      emailAddress: generateEmail(firstName, lastName, organization),
      bvn: generateBVN(),
      gender: getRandomItem(["Male", "Female"]),
      maritalStatus: getRandomItem([
        "Single",
        "Married",
        "Divorced",
        "Widowed",
      ]),
      children: getRandomItem(["None", "1", "2", "3", "4", "5+"]),
      typeOfResidence: getRandomItem(residenceTypes),
    },
    educationAndEmployment: {
      levelOfEducation: getRandomItem(educationLevels),
      employmentStatus: getRandomItem(employmentStatuses),
      sectorOfEmployment: getRandomItem(sectors),
      durationOfEmployment: `${getRandomNumber(1, 10)} years`,
      officeEmail: `${firstName.toLowerCase()}@${organization.toLowerCase()}.com`,
      monthlyIncome: `₦${getRandomNumber(100, 500).toLocaleString()},000.00 - ₦${getRandomNumber(500, 1000).toLocaleString()},000.00`,
      loanRepayment: `${getRandomNumber(10, 100).toLocaleString()},000`,
    },
    socials: {
      twitter: generateTwitterHandle(firstName),
      facebook: generateFacebookName(firstName, lastName),
      instagram: generateInstagramHandle(firstName),
    },
    guarantor: {
      fullName: `${guarantorFirstName} ${guarantorLastName}`,
      phoneNumber: generatePhoneNumber(),
      emailAddress: `${guarantorFirstName.toLowerCase()}@gmail.com`,
      relationship: getRandomItem(relationships),
    },
    accountBalance: `₦${getRandomNumber(10000, 500000).toLocaleString()}.00`,
    accountNumber: generateAccountNumber(),
    bankName: getRandomItem(banks),
    tier: getRandomItem([1, 2, 3]),
  };
};

export const generateUsers = (count: number): User[] => {
  return Array.from({ length: count }, (_, index) => generateUser(index));
};

// Generate 500 users and export as constant
export const mockUsers: User[] = generateUsers(500);
