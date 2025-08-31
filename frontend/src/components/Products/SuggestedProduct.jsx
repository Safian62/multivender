import React, { useEffect, useState } from "react";
import styles from "../../styles/style";
import ProductCard from "../Route/productCard/productCard";
import { useSelector } from "react-redux";

const SuggestedProduct = ({ data }) => {
  const {allProducts} = useSelector((state)=> state.products)
  const [date, setDate] = useState();
  useEffect(() => {
    const d =
      allProducts && allProducts.filter((i) => i.category === data.category);
    setDate(d);
  },[]);
  return (
    <div>
      {data ? (
        <div className={`${styles.section}`}>
          <h2
            className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
          >
            Related Product
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5 xl:gap-7 mb-12">
            {
                date && date.map((i,index)=>(
                    <ProductCard data={i} key={index}/>
                ))
            }
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProduct;
