import { useEffect, useState } from "react";
import "./LazyLoader.css";

export const LazyLoader = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.punkapi.com/v2/beers?page=${page}&per_page=10`
        );
        if (response.ok) {
          const data = await response.json();
          if (isMounted) {
            console.log(data);
            setData((prevData) => [...prevData, ...data]);
          }
        } else {
          throw new Error("Error in fetching data");
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();

    return () => {
      isMounted = false;
    };
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="wrapper">
      {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
      {loading && <div>Loading...</div>}
    </div>
  );
};
