import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { getOneFundraiser, deleteFundraiser, cancelDonation } from "../../store/fundraisers";
import DonationBox from "./DonationBox";
import DonateFormModal from "../DonateFormModal";
import EditFundraiserModal from "../EditFundraiserModal";
import EditDonationModal from "../EditDonationModal";
import PageNotFound from "../PageNotFound";
import moment from 'moment';

const FundraiserDetail = () => {
  const { id } = useParams();
  const [notFound, setNotFound] = useState(false);
  
  const dispatch = useDispatch();
  const history = useHistory();
  const fundraiser = useSelector(state => state.fundraisers.byId[id]);
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    if (fundraiser) return;
    const fetchFundraiser = async () => {
      const data = await dispatch(getOneFundraiser(id));
      if (data.message) {
        setNotFound(true);
      }
    }
    fetchFundraiser();
  }, [dispatch, id, fundraiser]);

  const onDelete = () => {
    dispatch(deleteFundraiser(fundraiser.id));
    history.push('/');
  };

  const getDonationsSum = () => {
    let sum = 0;
    fundraiser.donations.forEach(f => {
      sum += f.amount;
    });
    return sum;
  };

  if (notFound) return (
    <PageNotFound />
  );

  if (!fundraiser || !fundraiser.donations ||!fundraiser.organizer) return null;

  return (
    <div className="mx-28 mt-8">
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
              <span className="inline-block after:pr-4 after:border-r after:border-grey-light">Created {moment(fundraiser.created_at).fromNow()}</span>
              <Link className="ml-4" to={`/fundraisers/${fundraiser.category.name.toLowerCase()}`}>
                {fundraiser.category.name}
              </Link>
            </h3>
          </div>
          <div className="mb-6 pb-12">
            <p>{fundraiser.description}</p>
          </div>
          <div className="flex items-center justify-between pb-10 mb-10 border-b border-gray-400">
            <span className="w-1/2">Please donate, if you want to support this cause.</span>
            <div className="w-1/3">
              <DonateFormModal fundraiserId={fundraiser.id} />
            </div>
          </div>
          {user && user.id === fundraiser.organizer.id && (
            <div className="flex mb-12 gap-8">
              <div className="w-1/2">
                <EditFundraiserModal fundraiser={fundraiser} />
              </div>
              <div className="w-1/2">
                <button className="py-3 border border-rose-500 rounded text-rose-500 w-full font-extrabold
                hover:bg-rose-500 hover:text-white duration-200"
                  onClick={onDelete}
                >
                  Delete Fundraiser
                </button>
              </div>
            </div>
          )}
          <div>
            <h2 className="font-black text-2xl mb-8">Words of support ({fundraiser.donations.length})</h2>
              <ul>
              {fundraiser.donations.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)).map(d => (
                <li className="flex items-start mb-10" key={d.id}>
                  <div className="flex text-primary text-5xl mr-2">
                    <ion-icon name="leaf-outline"></ion-icon>
                  </div>
                  <div className="flex-[0_0_92%] flex-col">
                    <span className="font-extrabold">
                      {d.anonymous ? `Anonymous donated $${d.amount}` : `${d.donor.first_name} ${d.donor.last_name} donated $${d.amount}`}
                    </span>
                    <span className="block mb-4">{d.comment}</span>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-grey-light">{moment(d.created_at).fromNow()}</span>
                      {user && user.id === d.donor.id && (
                        <div>
                          <EditDonationModal donation={d} />
                          <button 
                            className="border-b border-rose-500 hover:bg-rose-500 hover:text-white duration-200 px-1"
                            onClick={() => dispatch(cancelDonation(d.id))}
                            >Delete
                          </button>
                        </div>
                      )}
                    </div>
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