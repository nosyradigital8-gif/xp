// FILE PATH: src/hooks/useShop.ts
// Place this file at: src/hooks/useShop.ts
import { useState, useMemo } from 'react';
import { Product } from '@/data/shopData';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

export interface ShopFilters {
  selectedCategory: string;
  searchQuery: string;
  sortBy: SortOption;
  showInStock: boolean;
}

export interface UseShopReturn extends ShopFilters {
  filtered: Product[];
  setSelectedCategory: (v: string) => void;
  setSearchQuery: (v: string) => void;
  setSortBy: (v: SortOption) => void;
  setShowInStock: (v: boolean) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

export const useShop = (products: Product[]): UseShopReturn => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showInStock, setShowInStock] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // In-stock filter
    if (showInStock) {
      result = result.filter(p => p.inStock);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'featured':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

    return result;
  }, [products, selectedCategory, searchQuery, sortBy, showInStock]);

  const clearFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('featured');
    setShowInStock(false);
  };

  const hasActiveFilters =
    selectedCategory !== 'All' || searchQuery.trim() !== '' || showInStock;

  return {
    filtered,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    showInStock,
    setShowInStock,
    clearFilters,
    hasActiveFilters,
  };
};
