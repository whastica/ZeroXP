import { useState } from "react";
import OfferCard from "../components/offers/OfferCard";
import OfferForm from "../components/offers/OfferForm";
import { useOffers } from "../hooks/useOffers";

export default function CompanyOffersPage({ company }) {
  const { offers, loading, addOffer, editOffer, removeOffer } = useOffers(company.id);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (offer) => {
    setEditing(offer);
    setShowForm(true);
  };

  const handleSubmit = (offer) => {
    if (offer.id) editOffer(offer);
    else addOffer(offer);
    setShowForm(false);
    setEditing(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">{company.name} - Offers</h1>
      <button
        onClick={() => setShowForm(true)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Create Offer
      </button>

      {showForm && <OfferForm initial={editing} onSubmit={handleSubmit} onCancel={() => setShowForm(false)} />}

      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {offers.map(o => (
            <OfferCard key={o.id} offer={o} onEdit={handleEdit} onDelete={removeOffer} />
          ))}
        </div>
      )}
    </div>
  );
}
