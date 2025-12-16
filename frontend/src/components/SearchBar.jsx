import React from 'react';
import { Search, MapPin, Sparkles, X } from "lucide-react";

export default function SearchBar({
  search,
  location,
  setSearch,
  setLocation,
  onSearch,
}) {
  return (
    <form 
      onSubmit={onSearch} 
      className="max-w-4xl mx-auto"
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-2 flex flex-col md:flex-row gap-2 border border-white/20">
        {/* Campo de búsqueda de trabajo */}
        <div className="flex-1 relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors duration-200" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cargo o palabra clave..."
            className="
              w-full
              pl-12
              pr-4
              py-4
              rounded-xl
              border-0
              text-gray-900
              placeholder-gray-400
              bg-gray-50
              focus:bg-white
              focus:outline-none
              focus:ring-2
              focus:ring-orange-500/20
              transition-all
              duration-200
              text-sm
              font-medium
            "
          />
          {search && (
            <div className="absolute inset-y-0 right-3 flex items-center">
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Separador vertical en desktop */}
        <div className="hidden md:block w-px bg-gray-200 self-stretch my-2" />

        {/* Campo de ubicación */}
        <div className="flex-1 relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <MapPin className="w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors duration-200" />
          </div>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Ciudad o región..."
            className="
              w-full
              pl-12
              pr-4
              py-4
              rounded-xl
              border-0
              text-gray-900
              placeholder-gray-400
              bg-gray-50
              focus:bg-white
              focus:outline-none
              focus:ring-2
              focus:ring-orange-500/20
              transition-all
              duration-200
              text-sm
              font-medium
            "
          />
          {location && (
            <div className="absolute inset-y-0 right-3 flex items-center">
              <button
                type="button"
                onClick={() => setLocation("")}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Botón de búsqueda */}
        <button
          type="submit"
          className="
            relative
            inline-flex
            items-center
            justify-center
            gap-2
            px-8
            py-4
            rounded-xl
            text-sm
            font-bold
            text-white
            bg-gradient-to-r
            from-orange-500
            to-red-500
            shadow-lg
            shadow-orange-500/30
            hover:shadow-xl
            hover:shadow-orange-500/40
            hover:scale-[1.02]
            active:scale-[0.98]
            transition-all
            duration-300
            overflow-hidden
            group
            whitespace-nowrap
          "
        >
          <span className="relative z-10">Buscar empleos</span>
          <Sparkles className="w-4 h-4 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
          
          {/* Efecto de brillo animado */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </button>
      </div>

      {/* Sugerencias rápidas (opcional) */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <span className="text-sm text-white/80 font-medium">Búsquedas populares:</span>
        {["Mesero", "Vendedor", "Asistente", "Cajero"].map((term) => (
          <button
            key={term}
            type="button"
            onClick={() => setSearch(term)}
            className="
              text-xs
              font-medium
              px-3
              py-1.5
              rounded-full
              bg-white/20
              hover:bg-white/30
              backdrop-blur-sm
              text-white
              border
              border-white/30
              transition-all
              duration-200
              hover:scale-105
            "
          >
            {term}
          </button>
        ))}
      </div>
    </form>
  );
}