// src/hooks/useOffers.js
import { useState, useEffect } from "react";
import * as offerService from "../services/OfferService"; // tu archivo actual

export const useOffers = (companyId) => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOffers = async () => {
    if (!companyId) return;
    setLoading(true);
    try {
      const data = await offerService.getOffers(companyId);
      setOffers(data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
    setLoading(false);
  };

  const addOffer = async (offer) => {
    try {
      const newOffer = await offerService.createOffer({ ...offer, companyId });
      setOffers(prev => [...prev, newOffer]);
    } catch (error) {
      console.error("Error creating offer:", error);
    }
  };

  const editOffer = async (offer) => {
    try {
      const updated = await offerService.updateOffer(offer);
      setOffers(prev => prev.map(o => (o.id === updated.id ? updated : o)));
    } catch (error) {
      console.error("Error updating offer:", error);
    }
  };

  const removeOffer = async (id) => {
    try {
      await offerService.deleteOffer(id);
      setOffers(prev => prev.filter(o => o.id !== id));
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, [companyId]);

  return { offers, loading, addOffer, editOffer, removeOffer, fetchOffers };
};
