import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import OfferCard from "../components/offers/OfferCard";
import OfferForm from "../components/offers/OfferForm";
import { useOffers } from "../hooks/useOffers";
import { useAuth } from "../context/AuthContext";

export default function CompanyOffersPage() {
  const { user } = useAuth();

  const [companyId, setCompanyId] = useState(null);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  /**
   * ---------------------------------------
   * Validación de usuario y empresa
   * ---------------------------------------
   */
  useEffect(() => {
    if (user === null) return; // esperar a que cargue el contexto

    if (!user) {
      toast.error("Debes iniciar sesión.");
      return;
    }

    if (user.user_type !== "company") {
      toast.error("Solo las empresas pueden gestionar ofertas.");
      return;
    }

    if (!user.company?.id) {
      toast.error("Empresa no válida.");
      return;
    }

    setCompanyId(user.company.id);
  }, [user]);

  /**
   * ---------------------------------------
   * Hook de ofertas (solo cuando hay companyId)
   * ---------------------------------------
   */
  const {
    offers,
    loading,
    addOffer,
    editOffer,
    removeOffer,
  } = useOffers(companyId);

  /**
   * ---------------------------------------
   * Acciones
   * ---------------------------------------
   */
  const handleEdit = (offer) => {
    setEditing(offer);
    setShowForm(true);
  };

  const handleSubmit = (offer) => {
    if (offer.id) {
      editOffer(offer);
      toast.success("Oferta actualizada");
    } else {
      addOffer(offer);
      toast.success("Oferta creada");
    }

    setShowForm(false);
    setEditing(null);
  };

  if (!companyId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Cargando empresa...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0f0f0f] p-6 pt-28">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Gestión de Ofertas
          </h1>

          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
          >
            Crear Oferta
          </button>
        </div>

        {/* FORMULARIO */}
        {showForm && (
          <OfferForm
            initial={editing}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditing(null);
            }}
          />
        )}

        {/* LISTADO */}
        {loading ? (
          <p className="text-gray-500 dark:text-gray-400 text-center mt-12">
            Cargando ofertas...
          </p>
        ) : offers.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center mt-12">
            No has creado ofertas todavía.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {offers.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                onEdit={handleEdit}
                onDelete={removeOffer}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
