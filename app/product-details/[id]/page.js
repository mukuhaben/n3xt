import SingleProductPage from "@/components/pages/SingleProductPage"

export default function ProductDetail({ params }) {
  return <SingleProductPage productId={params.id} />
}
