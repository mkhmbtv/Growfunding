import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOneFundraiser } from "../../store/fundraisers";
import DonationBox from "./DonationBox";
import DonateFormModal from "../DonateFormModal";
import moment from 'moment';

const FundraiserDetail = () => {
  const { id } = useParams();
  
  const dispatch = useDispatch();
  const fundraiser = useSelector(state => state.fundraisers.byId[id]);

  useEffect(() => {
    dispatch(getOneFundraiser(id));
  }, [dispatch, id]);

  const getDonationsSum = () => {
    let sum = 0;
    fundraiser.donations.forEach(f => {
      sum += f.amount;
    });
    return sum;
  };

  if (!fundraiser || !fundraiser.donations ||!fundraiser.organizer) return null;

  return (
    <div className="mx-20 mt-8">
      <h1 className="text-3xl font-bold mb-4">{fundraiser.name}</h1>
      <div className="grid grid-cols-6 gap-6 grid-rows-[412px_auto]" style={{alignItems: "start"}}>
        <div className="col-span-4 row-span-1 h-full w-full">
          <img className="h-full w-full object-cover" src={fundraiser.image_url} alt="" />
        </div>
        <DonationBox fundraiser={fundraiser} sum={getDonationsSum()}/>
        <div className="col-span-4 mr-8 mb-20">
          <div className="flex items-center mb-4">
            <div className="flex items-center text-primary text-5xl mr-2">
              <ion-icon name="leaf-outline"></ion-icon>
            </div>
            <div>
              <span className="block">
                {fundraiser.organizer.first_name} {fundraiser.organizer.last_name} is organizing this fundraiser.
              </span>
              <span>{fundraiser.city}, {fundraiser.state}</span>
            </div>
          </div>
          <div className="border-t border-b border-gray-400 py-4 mb-6">
            <h3>
              <span className="inline-block after:pr-4 after:border-r after:border-grey-light">{moment(fundraiser.created_at).fromNow()}</span>
              <Link className="ml-4" to={`/fundraisers/${fundraiser.category.name.toLowerCase()}`}>
                {fundraiser.category.name}
              </Link>
            </h3>
          </div>
          <div className="mb-6 pb-12">
            <p>{fundraiser.description}</p>
          </div>
          <div className="flex items-center justify-between pb-10 mb-12 border-b border-gray-400">
            <span className="w-1/2">Please donate, if you want to support this cause.</span>
            <div className="w-1/3">
              <DonateFormModal fundraiserId={fundraiser.id} />
            </div>
          </div>
          <div>
            <h2 className="font-black text-2xl mb-8">Words of support ({fundraiser.donations.length})</h2>
              <ul>
              {fundraiser.donations.map(d => (
                <li className="flex items-start mb-10" key={d.id}>
                  <div className="flex text-primary text-5xl mr-2">
                    <ion-icon name="leaf-outline"></ion-icon>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-extrabold">
                      {d.anonymous ? `Anonymous donated $${d.amount}` : `${d.donor.first_name} ${d.donor.last_name} donated $${d.amount}`}
                    </span>
                    <span className="mb-4">{d.comment}</span>
                    <span className="text-sm text-grey-light">{moment(d.created_at).fromNow()}</span>
                  </div>
                </li>
              ))}
              </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundraiserDetail;