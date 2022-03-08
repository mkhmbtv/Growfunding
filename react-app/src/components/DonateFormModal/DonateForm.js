import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { donate, getOneFundraiser } from "../../store/fundraisers";

const DonateForm = ({ fundraiserId, handleClose }) => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const [amount, setAmount] = useState('');
  const [comment, setComment] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [errors, setErrors] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const donation = {
      userId: user.id,
      fundraiserId,
      amount,
      comment,
      anonymous,
    };
    
    const data = await dispatch(donate(donation));
    
    if (data) {
      setErrors(data);
    } else {
      handleClose();
      dispatch(getOneFundraiser(fundraiserId));
    }
  };

  if (!user) return (
    <Redirect to="/login" />
  );

  console.log(fundraiserId)

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h2>Donate</h2>
        <div className="mb-4">
          {errors.map((error, ind) => (
            <div className='text-rose-700' key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label className="block" htmlFor="amount">Donation amount</label>
          <input
            name="amount"
            type="number"
            placeholder="Enter your donation"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label className="block" htmlFor="comment">Add a message (optional)</label>
          <input
            name="comment"
            type="text"
            placeholder="Your message"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <label>
          <input
            name="anonymous"
            type="checkbox"
            defaultChecked={anonymous}
            onChange={() => setAnonymous(!anonymous)}
          />
          Don't display my name publicly on the campaign.
        </label>
        <div>
          <button type="submit">
            Donate now
          </button>
        </div>
      </form>
    </div>
  );
};

export default DonateForm;