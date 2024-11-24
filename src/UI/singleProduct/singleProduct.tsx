import { fetchSingleP } from "@/lib/fetchData";
import { Details } from "./details";

interface Props { 
  readonly id: string
}

export default async function SingleProductContent({ id }: Props) {
  const { product, collection } = await fetchSingleP(id);

  if (!product) return <p>produit non trouvé</p>

  return <Details product={product} collection={collection} />;
}