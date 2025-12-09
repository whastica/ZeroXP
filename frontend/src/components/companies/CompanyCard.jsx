export default function CompanyCard({ company, onEdit, onDelete }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{company.name}</h3>
        <p className="text-gray-600 dark:text-gray-300">{company.description}</p>
        {company.website && (
          <a href={company.website} target="_blank" className="text-blue-500 hover:underline">
            {company.website}
          </a>
        )}
      </div>
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onEdit(company)}
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(company.id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
