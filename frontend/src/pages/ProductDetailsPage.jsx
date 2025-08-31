import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductDetails from "../components/Products/ProductDetails.jsx";
import { useParams, useSearchParams } from "react-router-dom";
import SuggestedProduct from "../components/Products/SuggestedProduct.jsx";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../redux/actions/product";

const ProductDetailsPage = () => {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.products);
  const { allEvents } = useSelector((state) => state.events);

  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");
  const { id } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    if (eventData !== null) {
      const data = allEvents.find((i) => i._id === id);
      setData(data);
    } else {
      const data = allProducts.find((i) => i._id === id);
      setData(data);
    }
  }, [allProducts, allEvents]);

  return (
    <div>
      <Header /> 
      <ProductDetails data={data} />
      {!eventData && <>{data && <SuggestedProduct data={data} />}</>}
      <Footer className="mb-10 " />
    </div>
  );
};

export default ProductDetailsPage;
