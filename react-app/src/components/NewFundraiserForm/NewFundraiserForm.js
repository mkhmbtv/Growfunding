import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createFundraiser } from "../../store/fundraisers";

const NewFundraiserForm = () => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [goalAmount, setGoalAmount] = useState(null);
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    const fundraiser = {
      userId: user.id,
      name,
      city,
      description,
      image,
      goalAmount,
    }
    const data = await dispatch(createFundraiser(fundraiser));

    if (data) {
      setErrors(data)
    } else {
      history.push('/')
    }
  }

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file)
  };

  return (
    <div>
      <h1>Start Fundraising</h1>
      {errors.length > 0 && 
        errors.map((error) => <div key={error}>{error}</div>)
      }
      <form className="flex flex-col" onSubmit={onSubmit}>
        <label>
          Name
          <input
            type="text"
            placeholder="Name of your fundraiser"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          City
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label>
          State
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </label>
        <label>
          Choose an image
          <input
            type="file"
            onChange={updateFile}
          />
        </label>
        <label>
          Describe your fundraiser
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          <input
            type="number"
            placeholder="Enter a goal amount"
            value={goalAmount}
            onChange={(e) => setGoalAmount(e.target.value)}
          />
        </label>
        <button type="submit">Create Fundraiser</button>
      </form>
    </div>
  );
};

export default NewFundraiserForm;