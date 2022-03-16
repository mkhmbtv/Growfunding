import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { editFundraiser, getCategories } from "../../store/fundraisers";

const EditFundraiserForm = ({ fundraiser, handleClose }) => {
  const [name, setName] = useState(fundraiser.name);
  const [city, setCity] = useState(fundraiser.city);
  const [state, setState] = useState(fundraiser.state);
  const [description, setDescription] = useState(fundraiser.description);
  const [image, setImage] = useState(fundraiser.image_url);
  const [goalAmount, setGoalAmount] = useState(fundraiser.goal_amount);
  const [categoryId, setCategoryId] = useState(fundraiser.category.id);
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const categories = useSelector(state => state.fundraisers.categories)

  useEffect(() => {
    if (categories.length > 0) return;
    dispatch(getCategories());
  }, [dispatch, categories]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      id: fundraiser.id,
      userId: fundraiser.organizer.id,
      categoryId,
      name,
      city,
      state,
      description,
      image,
      goalAmount,
    }
    const data = await dispatch(editFundraiser(payload));

    if (!data.errors) {
      handleClose();
    } else {
      setErrors(data.errors);
    }
  }

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-black mb-8">Edit Fundraiser</h1>
      <div className="mb-4">
        {errors.map((error, ind) => (
          <div className='text-rose-700' key={ind}>{error}</div>
        ))}
      </div>
      <div className="flex justify-center">
        <form className="w-full" onSubmit={onSubmit}>
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
              className='p-2 border focus:outline-none rounded-sm mb-4 w-full bg-white'
              name='category_id'
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value='' disabled>Choose a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
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
              Change a cover image
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
          <div className="text-center">
            <button
              className='px-4 py-2 bg-primary rounded text-white font-extrabold
              hover:bg-green-500 duration-200'
              type="submit"
            >
              Edit Fundraiser
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFundraiserForm;