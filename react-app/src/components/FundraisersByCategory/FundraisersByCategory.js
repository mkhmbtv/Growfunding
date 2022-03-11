import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getFundraisersByCategory } from "../../store/fundraisers";
import Fundraiser from "../Fundraiser";

const FundraisersByCategory = () => {
  let { category } = useParams();
  category = category.charAt(0).toUpperCase() + category.slice(1);

  const dispatch = useDispatch();
  const fundraisers = useSelector(state => state.fundraisers.byId);
  const byCategory = Object.values(fundraisers).filter(f => f.category.name === category);

  useEffect(() => {
    dispatch(getFundraisersByCategory(category));
  }, [dispatch, category]);

  if (!fundraisers) return null;
  
  return (
    <div className="px-28 pt-10 pb-20">
      <h2 className="mb-8 text-3xl font-black">{category}</h2>
      <div className="grid grid-cols-layout gap-8">
        {byCategory.map(fundraiser => (
          <Fundraiser key={fundraiser.id} fundraiser={fundraiser} />
        ))}
      </div>
    </div>
  )
};

export default FundraisersByCategory;