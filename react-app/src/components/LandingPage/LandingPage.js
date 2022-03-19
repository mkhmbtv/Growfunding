import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFundraisers, getFundraisersOrder } from "../../store/fundraisers";
import Fundraiser from "../Fundraiser";
import Categories from "./Categories";
import background from "../../images/hero.jpg";

const LandingPage = () => {
  const dispatch = useDispatch();
  const fundraisers = useSelector(state => state.fundraisers.byId);
  const topFundraisersIds = useSelector(state => state.fundraisers.order);

  useEffect(() => {
    (async () => {
      await dispatch(getFundraisers());
      await dispatch(getFundraisersOrder());
    })()
  }, [dispatch]);

  return (
    <div>
      <header 
        className="h-[85vh] bg-cover bg-center opacity-90 relative"
        style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${background})`}}
      >
        <div className="absolute top-[35%] left-28">
          <h1 className="mb-11">
            <span className="block text-5xl font-black text-white mb-4 w-2/3 leading-tight">
              Better fundraising for better future
            </span>
            <span className="text-2xl font-extrabold text-white">
              Make things happen. Start right now.
            </span>
          </h1>
          <Link className='py-4 px-6 bg-primary rounded text-lg text-white w-full font-extrabold
              hover:bg-green-500 duration-200' 
              to='/new-fundraiser'
          >
            Start Fundraising
          </Link>
        </div>
      </header>
      <div className="px-28 py-16">
        <h2 className="mb-8 text-2xl font-black">Top Fundraisers</h2>
        <div className="grid grid-cols-layout gap-8">
          {topFundraisersIds.slice(0, 3).map(id => (
            <Fundraiser key={id} fundraiser={fundraisers[id]} />
          ))}
        </div>
      </div>
      <Categories />
      <div className="py-16">
        <h3 className="text-center text-2xl font-light mb-4">Ready to start fundraising?</h3>
        <div className="text-center">
          <Link className='py-4 px-6 bg-primary rounded text-lg text-white font-extrabold
              hover:bg-green-500 duration-200 mt-6 mb-4 inline-block w-fit'
            to='/new-fundraiser'
          >
            Start Fundraising
          </Link>
        </div>
      </div>
    </div>
  )
};

export default LandingPage