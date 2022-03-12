import { Link } from "react-router-dom";
import moment from 'moment';

const Fundraiser = ({ fundraiser }) => {
  const getDonationsSum = () => {
    let sum = 0;
    fundraiser.donations.forEach(f => {
      sum += f.amount;
    });
    return sum;
  };

  const getPercentage = () => {
    return (getDonationsSum() / fundraiser.goal_amount) * 100;
  };
  
  if (!fundraiser) return null;
  
  return (
    <div className="rounded overflow-hidden shadow-md">
      <Link to={`/fundraisers/${fundraiser.id}`}>
        <img className="h-48 w-full object-cover" src={fundraiser.image_url} alt="" />
        <div className="p-4">
          <div className="text-primary text-sm font-black">
            {fundraiser.city.toUpperCase()}, {fundraiser.state.toUpperCase()}
          </div>
          <div className="font-black mb-2">{fundraiser.name}</div>
          <p className="mb-4">{fundraiser.description.slice(0, 80)}...</p>
          <p className="text-sm text-grey-dark mb-2">
            {fundraiser.donations.length > 0
              ? `Last donation ${moment(fundraiser.donations.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))[fundraiser.donations.length - 1].created_at).fromNow()}`
              : 'No donations yet'
            }
          </p>
          <div className="h-1 w-full mb-2"
            style={getPercentage() >= 100 ? { background: "#2f9e44" }
              : {background: `linear-gradient(to right, #2f9e44 ${getPercentage()}%, #e2e8f0 ${getPercentage()}%)`}}/>
          <div>
            <strong>${getDonationsSum().toLocaleString()} raised</strong> of ${fundraiser.goal_amount.toLocaleString()}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Fundraiser;