import { useState } from "react";
import { useCompanies } from "../hooks/useCompanies";
import CompanyCard from "../components/companies/CompanyCard";
import CompanyForm from "../components/companies/CompanyForm";
import CompanyOffersPage from "../pages/CompanyOffersPage"; // asegurate de importar

export default function CompaniesPage() {
  const { companies, loading, addCompany, editCompany, removeCompany } = useCompanies();
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null); // nueva variable para ofertas

  const handleEdit = (company) => {
    setEditing(company);
    setShowForm(true);
  };

  const handleSubmit = (company) => {
    if (company.id) editCompany(company);
    else addCompany(company);
    setShowForm(false);
    setEditing(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Companies</h1>
      <button
        onClick={() => setShowForm(true)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Create Company
      </button>

      {showForm && (
        <CompanyForm
          initial={editing}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {companies.map((c) => (
            <div key={c.id} className="flex flex-col">
              <CompanyCard company={c} onEdit={handleEdit} onDelete={removeCompany} />
              <button
                onClick={() => setSelectedCompany(c)}
                className="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                View Offers
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Muestra la página de ofertas solo si hay empresa seleccionada */}
      {selectedCompany && (
        <div className="mt-6">
          <CompanyOffersPage company={selectedCompany} />
        </div>
      )}
    </div>
  );
}
