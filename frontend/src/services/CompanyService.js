let companies = [
  { id: "1", name: "Tech Corp", description: "Empresa de software" },
  { id: "2", name: "Health Inc", description: "Servicios de salud" },
];

export const getCompanies = () => new Promise(res => setTimeout(() => res([...companies]), 300));

export const createCompany = (company) => {
  const newCompany = { ...company, id: Date.now().toString() };
  companies.push(newCompany);
  return new Promise(res => setTimeout(() => res(newCompany), 300));
};

export const updateCompany = (company) => {
  companies = companies.map(c => (c.id === company.id ? company : c));
  return new Promise(res => setTimeout(() => res(company), 300));
};

export const deleteCompany = (id) => {
  companies = companies.filter(c => c.id !== id);
  return new Promise(res => setTimeout(() => res(), 300));
};