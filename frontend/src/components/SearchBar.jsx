import React from 'react';
import { Input } from '../components/ui/input';
import { Button } from './ui/Button';

export default function SearchBar({ search, location, setSearch, setLocation, onSearch }) {
  return (
    <form onSubmit={onSearch} className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow-lg">
        <Input
          type="text"
          placeholder="¿Qué trabajo buscas?"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Input
          type="text"
          placeholder="Ubicación"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="sm:w-48"
        />
        <Button type="submit" className="sm:w-32">
          Buscar
        </Button>
      </div>
    </form>
  );
}
