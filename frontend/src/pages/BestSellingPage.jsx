import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import styles from "../styles/style";
import ProductCard from "../components/Route/productCard/productCard";
import { useSelector } from "react-redux";

const BestSellingPage = () => {
  const {allProducts} = useSelector((state)=> state.products)
  const [data, setData] = useState([]);
 useEffect(() => {
  if (allProducts && allProducts.length > 0) {
    const sorted = [...allProducts].sort((a, b) => b.sold - a.sold);
    setData(sorted);
  }
}, [allProducts]); 


  return (
    <div>
      <Header activeHeading={2} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2  md:gap-6 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5 xl:gap-7 mb-12 ">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
        {data && data.length === 0 ? (
          <h1 className="text-center w-full pb-[110px] text-2xl">
            No Products Found!
          </h1>
        ) : null}
      </div>
    </div>
  );
};

export default BestSellingPage;
