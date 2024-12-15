'use client';

import React, { useContext, useEffect, useState } from 'react'
import SingleProduct from '@/UI/singleCardProduct';
import { MyWixClient, WixClientContext } from '@/Contexts/wixContext';
import { collections, products } from '@wix/stores';
import ProductCartSkeleton from '@/UI/productCartSkeleton';

export default function Likes() {
  const wixClient = useContext<MyWixClient>(WixClientContext);
  const [products, setProducts] = useState<{product: products.Product, collection: collections.Collection & collections.CollectionNonNullableFields}[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedProducts: string[] = JSON.parse(localStorage.getItem('savedProducts') ?? '[]');

    async function fetchSavedProducts() {
      setLoading(true);
      try {
        if (savedProducts.length > 0) {
          const products = await Promise.all(savedProducts.map(productId => wixClient.products.getProduct(productId)));
          const collections = await Promise.all(products.map(product => wixClient.collections.getCollection(product.product?.collectionIds[0]!)));
          setProducts(products.map((product, index) => ({
            product: product.product!,
            collection: collections[index],
          })));
          setLoading(false)
        }
      } catch (error) {
        console.error(error);
        setError('Erreur lors de la récupération des produits');
      } finally {
        setLoading(false);
      }
    }
  
    fetchSavedProducts();
  }, [wixClient.collections, wixClient.products])

  if (error) {
    return (
      <div className="error-message">
        {error}
      </div>
    )
  }

  if (!products.length && !loading) {
    return <h2>Aucun produit enregistré</h2>;
  }
  
  return (
    <div>
      <ul className="collection-list-product shop-page likes-wrap">
        {
          loading ? (
            <ProductCartSkeleton len={3} />
          ) : (
            products.map( ({product, collection}) => (
              <SingleProduct key={product?._id} data={product!} collectionName={collection.name!} />
            ))
          )
        }
      </ul>
    </div>
  )
}
