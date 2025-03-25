import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../store/Search';
import { Search } from 'lucide-react';
import './SearchInput.css';

const SearchInput = () => {
  const navigate = useNavigate();
  const { searchItem, setSearchItem } = useSearch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Searching for:', searchItem.keyword);
    try {
      const response = await fetch(`https://f1-server-1.onrender.com/api/v1/product/search/${searchItem.keyword}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Search results:', data);
      setSearchItem({ ...searchItem, result: data });
      navigate('/searcher');
    } catch (error) {
      console.error('Failed to fetch search results:', error);
    }
  };

  return (
    <div className="search-container">
      <form className="search-form" role="search" onSubmit={handleSubmit}>
        <input
          type="search"
          className="form-control search-input"
          placeholder="Search for products..."
          aria-label="search"
          value={searchItem.keyword}
          onChange={(e) => setSearchItem({ ...searchItem, keyword: e.target.value })}
        />
        <button type="submit" className="btn search-btn">
          <Search size={24} />
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
