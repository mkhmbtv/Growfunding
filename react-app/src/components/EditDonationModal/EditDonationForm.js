import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeDonation } from "../../store/fundraisers";

const EditDonationForm = ({ donation, handleClose }) => {
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(donation.amount);
  const [comment, setComment] = useState(donation.comment);
  const [anonymous, setAnonymous] = useState(donation.anonymous);
  const [errors, setErrors] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...donation,
      amount,
      comment,
      anonymous,
    };

    const data = await dispatch(changeDonation(payload));
    if (data.errors) {
      setErrors(data.errors);
    } else {
      handleClose();
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={onSubmit}>
        <h2 className='text-center text-4xl mb-5 font-black'>Change your donation</h2>
        <div className="mb-4">
          {errors.map((error, ind) => (
            <div className='text-rose-700' key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label className="block" htmlFor="amount">Donation amount</label>
          <input
            className="p-2 border focus:outline-none rounded-sm mb-4 w-full"
            name="amount"
            type="number"
            placeholder="Enter your donation"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label className="block" htmlFor="comment">Add a message (optional)</label>
          <textarea
            className='p-2 border focus:outline-none rounded-sm mb-4 w-full'
            name="comment"
            rows={5}
            placeholder="Your message"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <label>
          <input
            className="mr-2"
            name="anonymous"
            type="checkbox"
            defaultChecked={anonymous}
            onChange={() => setAnonymous(!anonymous)}
          />
          Don't display my name publicly on the campaign.
        </label>
        <div>
          <button
            className='py-3 mt-8 border border-primary rounded text-primary w-full font-extrabold'
            type="submit">
            Donate
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDonationForm;