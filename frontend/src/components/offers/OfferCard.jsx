export default function OfferCard({ offer, onEdit, onDelete }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex flex-col justify-between">
      <div>
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{offer.title}</h4>
        <p className="text-gray-600 dark:text-gray-300">{offer.description}</p>
        {offer.location && <p className="text-gray-500 dark:text-gray-400">Location: {offer.location}</p>}
        {offer.salary && <p className="text-gray-500 dark:text-gray-400">Salary: {offer.salary}</p>}
      </div>
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onEdit(offer)}
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(offer.id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
