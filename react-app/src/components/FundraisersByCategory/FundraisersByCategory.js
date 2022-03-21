import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCategories } from "../../store/categories";
import Fundraiser from "../Fundraiser";

const FundraisersByCategory = () => {
  let { category } = useParams();
  category = category.charAt(0).toUpperCase() + category.slice(1);

  const dispatch = useDispatch();
  const searchedCategory = useSelector(state => Object.values(state.categories.byId).find(c => c.name === category));
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (searchedCategory) {
      setIsLoaded(true);
    }
  }, [searchedCategory]);

  if (!isLoaded) return null;
  
  return (
    <div className="px-28 pt-10 pb-20">
      <h2 className="mb-8 text-3xl font-black">{category}</h2>
      <div className="grid grid-cols-layout gap-8">
        {searchedCategory.fundraisers.map(fundraiserId => (
          <Fundraiser key={fundraiserId} fundraiserId={fundraiserId} />
        ))}
      </div>
    </div>
  )
};

export default FundraisersByCategory;