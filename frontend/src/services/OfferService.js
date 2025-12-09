let offers = [
  { id: "1", companyId: "1", title: "Frontend Developer", description: "React + JS" },
];

export const getOffers = (companyId) => 
  new Promise(res => setTimeout(() => res(offers.filter(o => o.companyId === companyId)), 300));

export const createOffer = (offer) => {
  const newOffer = { ...offer, id: Date.now().toString() };
  offers.push(newOffer);
  return new Promise(res => setTimeout(() => res(newOffer), 300));
};

export const updateOffer = (offer) => {
  offers = offers.map(o => (o.id === offer.id ? offer : o));
  return new Promise(res => setTimeout(() => res(offer), 300));
};

export const deleteOffer = (id) => {
  offers = offers.filter(o => o.id !== id);
  return new Promise(res => setTimeout(() => res(), 300));
};