import { fetchCollections, fetchProducts } from "@/lib/fetchData";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await fetchCollections(100);
  const categoriesNames = categories.map((col) => col.name);
  const routesCate: MetadataRoute.Sitemap = categoriesNames.map((category) => ({
    url: `/shop/${category?.replaceAll(" ", "-")}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const products = await fetchProducts(100);
  const productsEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `/shop/${product._id}`,
    lastModified: new Date(product.lastUpdated!),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: "/",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...routesCate,
    ...productsEntries,
  ];
}
