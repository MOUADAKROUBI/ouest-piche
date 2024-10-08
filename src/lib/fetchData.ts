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