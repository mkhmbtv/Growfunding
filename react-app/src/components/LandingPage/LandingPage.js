import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFundraisers } from "../../store/fundraisers";
import Fundraiser from "../Fundraiser";
import Categories from "./Categories";
import background from "../../images/hero.jpg";

const LandingPage = () => {
  const dispatch = useDispatch();
  const fundraiserIds = useSelector(state => state.fundraisers.allIds);

  useEffect(() => {
    if (fundraiserIds.length > 0) return;
    dispatch(getFundraisers());
  }, [dispatch, fundraiserIds]);

  return (
    <div>
      <header 
        className="h-[85vh] bg-cover bg-center opacity-90 relative"
        style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${background})`}}
      >
        <div className="absolute top-[35%] left-24">
          <h1 className="mb-11">
            <span className="block text-5xl font-black text-white mb-4 w-2/3 leading-tight">
              Trusted fundraising for all of life's moments
            </span>
            <span className="text-2xl font-extrabold text-white">Get help. Give kindness. Start right now.</span>
          </h1>
          <Link className='py-3 px-6 bg-primary rounded text-lg text-white w-full font-extrabold
              hover:bg-green-500 duration-200' 
              to='/new-fundraiser'>Start Fundraising</Link>
        </div>
      </header>
      <div className="px-40 py-16">
        <h2 className="mb-8 text-2xl font-black">Top Fundraisers</h2>
        <div className="grid grid-cols-layout gap-8">
          {fundraiserIds.slice(0, 3).map(id => (
            <Fundraiser key={id} id={id} />
          ))}
        </div>
      </div>
      <Categories />
    </div>
  )
};

export default LandingPage