import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getQueryResults } from "../../store/search";
import Fundraiser from "../Fundraiser";

const SearchResults = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const fundraisers = useSelector(state => state.search.results);
  
  useEffect(() => {
    dispatch(getQueryResults(location.search.slice(1)));
  }, [dispatch, location.search,]);

  if (!fundraisers) return null;

  const keyword = new URLSearchParams(location.search).get('q');
  
  return (
    <div className="px-28 pt-10 pb-20">
      <h3 className="mb-3">
        {fundraisers.length > 0 ? `Search results for "${keyword}":`
          : `No results for "${keyword}"`}
      </h3>
      {fundraisers.length > 0 && (
        <div className="grid grid-cols-layout gap-8">
          {fundraisers.map(fundraiser => (
            <Fundraiser key={fundraiser.id} fundraiser={fundraiser} />
          ))}
        </div>
      )}
    </div>
  )
};

export default SearchResults;