import { wixClientServer } from "./wixClientServer";

export async function fetchCollections(limit: number) {
  try {
    const client = await wixClientServer();
    const response = await client.collections.queryCollections().limit(limit).find();

    return response.items;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching collections");
  }
}

export async function fetchProducts(limit: number, skipProductId?: string) {
  try {
    const client = await wixClientServer();
    const response = await client.products.queryProducts().ne('_id', skipProductId || '').limit(limit).find();
    return response.items;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching products");
  }
}

export async function fetchSingleP(id: string) {
  try {
    const client = await wixClientServer();
    const response = await client.products.getProduct(id);
    const collection= await client.collections.getCollection(
      response.product?.collectionIds[0] || ""
    );

    return { product: response.product, collection: collection };
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching single product");
  }
}

export async function fetchProductsByQuery(query: string, limit: number) {
    try {
        const client = await wixClientServer();
        const category = (
            await client.collections
            .queryCollections()
            .eq("name", query.replaceAll("-", " "))
            .limit(limit)
            .find()
        ).items[0];
        const products = (
            await client.products
            .queryProducts()
            .eq("collectionIds", category._id)
            .find()
        ).items;

        return products;
    } catch (error) {
        console.log(error);
        throw new Error("error fetching products my query")
    }
}

export async function fetchBestSellersProducts() {
    try {
        const client = await wixClientServer();
        const listAvailableAlgorithms = (await client.recommendations.listAvailableAlgorithms()).availableAlgorithms;
        console.log(listAvailableAlgorithms)
        const recommendedProducts = client.recommendations.getRecommendation([
            {
              _id: 'ba491fd2-b172-4552-9ea6-7202e01d1d3c',
              appId: listAvailableAlgorithms[3].appId,
            }
        ]);

        return recommendedProducts;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching recommendations products");
    }
}

export async function fetchSameCategoriesProducts(catalogItemId: string) {
    try {
        const client = await wixClientServer();
        const listAvailableAlgorithms = (await client.recommendations.listAvailableAlgorithms()).availableAlgorithms;

        const recommendedProducts = client.recommendations.getRecommendation([
            {
              _id: '68ebce04-b96a-4c52-9329-08fc9d8c1253',
              appId: listAvailableAlgorithms[0].appId,
            }
        ], {
          items: [
            {
              catalogItemId: catalogItemId,
              appId: listAvailableAlgorithms[0].appId,
            }
          ]
        });

        return recommendedProducts;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching recommendations products");
    }
}

export async function fetchFrequentlyViewedProducts() {
    try {
        const client = await wixClientServer();
        const listAvailableAlgorithms = (await client.recommendations.listAvailableAlgorithms()).availableAlgorithms;

        const recommendedProducts = client.recommendations.getRecommendation([
            {
              _id: '5dd69f67-9ab9-478e-ba7c-10c6c6e7285f',
              appId: listAvailableAlgorithms[2].appId,
            }
        ]);
        console.log((await recommendedProducts).recommendation?.items)

        return recommendedProducts;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching recommendations products");
    }
}