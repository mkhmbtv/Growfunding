import DonateFormModal from "../DonateFormModal";

const DonationBox = ({ fundraiser, sum }) => {
  const getPercentage = () => {
    return (sum / fundraiser.goal_amount) * 100;
  };

  const topDonations = fundraiser.donations.slice(0, 3).sort((a, b) => b.amount - a.amount);

 
  return (
    <div className="col-span-2 h-fit sticky top-20 p-6 border rounded-sm shadow-xl" style={{ alignSelf: "start" }}>
      <div className="font-black text-2xl mb-3">
        ${sum.toLocaleString()}  <span className="text-base text-grey-light font-normal">raised of ${fundraiser.goal_amount.toLocaleString()} goal</span>
      </div>
      <div className="h-1 w-full mb-2"
        style={getPercentage() >= 100 ? { background: "#2f9e44" }
          : { background: `linear-gradient(to right, #2f9e44 ${getPercentage()}%, #e2e8f0 ${getPercentage()}%)` }}
      />
      <div className="text-grey-light mb-2">{fundraiser.donations.length} donations</div>
      <div className="mb-4">
        <DonateFormModal fundraiserId={fundraiser.id} />
      </div>
      {fundraiser.donations.length > 0 && (
        <>
          <h2 className="text-center text-lg font-black text-amber-500 mb-4">Top Donations</h2>
          <ul>
            {topDonations.map(donation => (
              <li className="flex items-center mb-2 border-b pb-2 last:border-b-0" key={donation.id}>
                <div className="flex items-center text-primary text-4xl mr-1">
                  <ion-icon name="leaf-outline"></ion-icon>
                </div>
                <div>
                  <span className="block">{donation.anonymous ? 'Anonymous' : `${donation.donor.first_name} ${donation.donor.last_name}`}</span>
                  <span className="text-sm font-bold">${donation.amount}</span>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
 
};

export default DonationBox