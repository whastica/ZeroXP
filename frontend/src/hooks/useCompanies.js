import { useState, useEffect } from "react";
import * as companyService from "../services/CompanyService";

export const useCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCompanies = async () => {
    setLoading(true);
    const data = await companyService.getCompanies();
    setCompanies(data);
    setLoading(false);
  };

  const addCompany = async (company) => {
    const newCompany = await companyService.createCompany(company);
    setCompanies(prev => [...prev, newCompany]);
  };

  const editCompany = async (company) => {
    const updated = await companyService.updateCompany(company);
    setCompanies(prev => prev.map(c => (c.id === updated.id ? updated : c)));
  };

  const removeCompany = async (id) => {
    await companyService.deleteCompany(id);
    setCompanies(prev => prev.filter(c => c.id !== id));
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return { companies, loading, addCompany, editCompany, removeCompany, fetchCompanies };
};
