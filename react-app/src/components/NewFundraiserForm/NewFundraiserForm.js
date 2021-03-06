import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createFundraiser } from "../../store/fundraisers";
import { getCategories } from "../../store/categories";

const NewFundraiserForm = () => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [goalAmount, setGoalAmount] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const history = useHistory();

  const categories = useSelector(state => state.categories.byId);
  const categoriesIds = useSelector(state => state.categories.allIds);

  useEffect(() => {
    if (categoriesIds.length > 0) return;
    dispatch(getCategories());
  }, [dispatch, categoriesIds]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const fundraiser = {
      userId: user.id,
      categoryId,
      name,
      city,
      state,
      description,
      image,
      goalAmount,
    }
    const data = await dispatch(createFundraiser(fundraiser));

    if (!data.errors) {
      history.push(`/fundraisers/${data.id}`);
    } else {
      setErrors(data.errors);
    }
  }

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file)
  };

  return (
    <div className="flex flex-col items-center h-full pt-14 pb-20">
      <h1 className="text-4xl font-black mb-8">Start Fundraising</h1>
      <div className="mb-4">
        {errors.map((error, ind) => (
          <div className='text-rose-700' key={ind}>{error}</div>
        ))}
      </div>
      <div className="flex justify-center w-3/5">
        <form className="w-11/12" onSubmit={onSubmit}>
          <span>Where do you live?</span>
          <div className="flex">
            <input
              className='p-2 border focus:outline-none rounded-sm mb-4 mr-4 w-full'
              type="text"
              name="city"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <input
              className='p-2 border focus:outline-none rounded-sm mb-4 w-full'
              type="text"
              name="state"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor='category_id'>What are you fundraising for?</label>
            <select
              className='p-2.5 border focus:outline-none rounded-sm mb-4 w-full bg-white'
              name='category_id'
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              
            >
              <option value='' disabled>Choose a category</option>
              {categoriesIds.map(categoryId => (
                <option key={categoryId} value={categoryId}>
                  {categories[categoryId].name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="goal_amount">How much do you like to raise?</label>
            <input
              className='p-2 border focus:outline-none rounded-sm mb-4 w-full'
              type="number"
              name="goal_amount"
              placeholder="Enter a goal amount"
              value={goalAmount}
              onChange={(e) => setGoalAmount(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="w-max inline-block px-4 py-2 mb-4 border 
            border-primary rounded text-primary font-medium cursor-pointer">
              Add a cover image
              <input
                className="hidden"
                type="file"
                onChange={updateFile}
              />
            </label>
          </div>
          <div className="flex flex-col">
            <label htmlFor="name">Title</label>
            <input
              className='p-2 border focus:outline-none rounded-sm mb-4 w-full'
              type="text"
              name="name"
              placeholder="Fundraiser title"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description">Tell your story</label>
            <textarea
              className='p-2 border focus:outline-none rounded-sm mb-8 w-full'
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={8}
              required
            />
          </div>
          <button
            className='px-4 py-2 bg-primary rounded text-white font-extrabold
            hover:bg-green-500 duration-200'
            type="submit"
          >
            Create Fundraiser
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewFundraiserForm;