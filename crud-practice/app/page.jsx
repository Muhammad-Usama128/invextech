import axios from "axios";
import Card from "../components/ui/Card";
export default async function Home() {
  let data = [];
  let Error = null;

  try {
    // const response = await axios.get("https://fakestoreapi.com/products", {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "User-Agent": "Mozilla/5.0",
    //   },
    // });
    // data = await response.data;
    console.log("NONE");
  } catch (error) {
    console.error("Error fetching products:", error);
    Error = error;
  }
  return (
    <div>
      {Error && <p>Error: {Error.message}</p>}
      {!Error && (
        <ul className="flex justify-center items-center gap-5 flex-wrap mt-10  mx-10">
          {data.length === 0 ? (
            <p className="text-3xl text-center">No products found</p>
          ) : (
            data.map((product) => <Card key={product.id} product={product} />)
          )}
        </ul>
      )}
    </div>
  );
}
