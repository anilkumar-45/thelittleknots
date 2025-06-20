
import { useState, useEffect } from 'react';
import { Product, ProductImage, DatabaseProduct, DatabaseProductImage } from '@/types/Product';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useSupabaseProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Transform database product to our Product type
  const transformProduct = (dbProduct: DatabaseProduct, images: DatabaseProductImage[]): Product => {
    const productImages: ProductImage[] = images
      .filter(img => img.product_id === dbProduct.id)
      .sort((a, b) => a.display_order - b.display_order)
      .map(img => ({
        id: img.id,
        product_id: img.product_id,
        image_url: img.image_url,
        is_primary: img.is_primary,
        display_order: img.display_order,
        created_at: img.created_at
      }));

    const primaryImage = productImages.find(img => img.is_primary);
    
    return {
      id: dbProduct.id,
      name: dbProduct.name,
      price: dbProduct.price,
      description: dbProduct.description,
      category: dbProduct.category as 'keytags' | 'accessories' | 'toys',
      in_stock: dbProduct.in_stock,
      created_at: dbProduct.created_at,
      updated_at: dbProduct.updated_at,
      images: productImages,
      primary_image_url: primaryImage?.image_url || productImages[0]?.image_url
    };
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      // Fetch products and images without authentication since we're using public access
      const [productsResult, imagesResult] = await Promise.all([
        supabase.from('products').select('*').order('created_at', { ascending: false }),
        supabase.from('product_images').select('*').order('display_order', { ascending: true })
      ]);

      if (productsResult.error) {
        console.error('Products fetch error:', productsResult.error);
        setProducts([]);
        return;
      }
      if (imagesResult.error) {
        console.error('Images fetch error:', imagesResult.error);
        // Continue with products even if images fail
      }

      const transformedProducts = productsResult.data.map(product => 
        transformProduct(product, imagesResult.data || [])
      );

      setProducts(transformedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
      toast({
        title: "Info",
        description: "Products are temporarily unavailable",
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      // Try to upload to storage bucket
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Storage upload error:', error);
        throw new Error('Failed to upload image to storage');
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error('Error in uploadImage:', error);
      throw error;
    }
  };

  const addProduct = async (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      // Insert product
      const { data: product, error: productError } = await supabase
        .from('products')
        .insert({
          name: productData.name,
          price: productData.price,
          description: productData.description,
          category: productData.category,
          in_stock: productData.in_stock
        })
        .select()
        .single();

      if (productError) {
        console.error('Product insert error:', productError);
        throw productError;
      }

      // Insert images if any
      if (productData.images && productData.images.length > 0) {
        const imageInserts = productData.images.map((img, index) => ({
          product_id: product.id,
          image_url: img.image_url,
          is_primary: index === 0, // First image is primary
          display_order: index
        }));

        const { error: imagesError } = await supabase
          .from('product_images')
          .insert(imageInserts);

        if (imagesError) {
          console.error('Images insert error:', imagesError);
          // Don't throw here, product was created successfully
        }
      }

      await fetchProducts();
      
      toast({
        title: "Success",
        description: "Product added successfully",
      });
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateProduct = async (productId: string, productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      // Update product
      const { error: productError } = await supabase
        .from('products')
        .update({
          name: productData.name,
          price: productData.price,
          description: productData.description,
          category: productData.category,
          in_stock: productData.in_stock
        })
        .eq('id', productId);

      if (productError) {
        console.error('Product update error:', productError);
        throw productError;
      }

      // Delete existing images
      await supabase
        .from('product_images')
        .delete()
        .eq('product_id', productId);

      // Insert new images if any
      if (productData.images && productData.images.length > 0) {
        const imageInserts = productData.images.map((img, index) => ({
          product_id: productId,
          image_url: img.image_url,
          is_primary: index === 0,
          display_order: index
        }));

        const { error: imagesError } = await supabase
          .from('product_images')
          .insert(imageInserts);

        if (imagesError) {
          console.error('Images update error:', imagesError);
          // Don't throw here, product was updated successfully
        }
      }

      await fetchProducts();
      
      toast({
        title: "Success",
        description: "Product updated successfully",
      });
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: "Error",
        description: "Failed to update product. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      // Delete product (images will be deleted automatically due to CASCADE)
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) {
        console.error('Product delete error:', error);
        throw error;
      }

      await fetchProducts();
      
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
    refetch: fetchProducts
  };
};
