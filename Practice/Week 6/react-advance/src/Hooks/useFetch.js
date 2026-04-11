import { useEffect, useState } from "react";

export function useFetch(url) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!url) return;

    (async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(json.products || []);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [url]);

  return data;
}
