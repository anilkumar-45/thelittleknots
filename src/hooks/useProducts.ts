
import { useState, useEffect } from 'react';
import { Product } from '@/types/Product';
import { useSupabaseProducts } from './useSupabaseProducts';

export const useProducts = () => {
  const { products: supabaseProducts, loading: supabaseLoading, addProduct: addSupabaseProduct, updateProduct: updateSupabaseProduct, deleteProduct: deleteSupabaseProduct } = useSupabaseProducts();

  const addProduct = (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    return addSupabaseProduct(product);
  };

  const updateProduct = (id: string, product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    return updateSupabaseProduct(id, product);
  };

  const deleteProduct = (id: string) => {
    return deleteSupabaseProduct(id);
  };

  return {
    products: supabaseProducts,
    loading: supabaseLoading,
    addProduct,
    updateProduct,
    deleteProduct
  };
};
