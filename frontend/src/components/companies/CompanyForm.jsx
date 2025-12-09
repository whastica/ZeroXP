import { useState } from "react";

export default function CompanyForm({ initial, onSubmit, onCancel }) {
  const [name, setName] = useState(initial?.name || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [website, setWebsite] = useState(initial?.website || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { id: initial?.id, name, description, website };
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex flex-col gap-4">
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Company Name"
        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="text"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="url"
        value={website}
        onChange={e => setWebsite(e.target.value)}
        placeholder="Website (optional)"
        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex justify-end gap-2">
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600">
            Cancel
          </button>
        )}
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          {initial ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
}
