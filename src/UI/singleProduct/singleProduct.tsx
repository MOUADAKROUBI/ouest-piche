import { fetchSingleP } from "@/lib/fetchData";
import { Details } from "./details";

export default async function SingleProductContent({ id }: { id: string }) {
  const { product, collection } = await fetchSingleP(id);

  if (!product) {
    return <p>product not fount</p>
  }

  return (
    <>
      <Details product={product} collection={collection} />
    </>
  );
}