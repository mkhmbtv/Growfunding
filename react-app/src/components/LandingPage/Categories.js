import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCategories } from "../../store/categories";

const Icon = ({ name }) => {
  return (
    <>
      {
        {
          'Animals': <ion-icon name="paw-outline"></ion-icon>,
          'Creative': <ion-icon name="color-palette-outline"></ion-icon>,
          'Community': <ion-icon name="trail-sign-outline"></ion-icon>,
          'Education': <ion-icon name="book-outline"></ion-icon>,
          'Medical': <ion-icon name="fitness-outline"></ion-icon>,
          'Sports': <ion-icon name="football-outline"></ion-icon>,
          'Travel': <ion-icon name="airplane-outline"></ion-icon>,
          'Wishes': <ion-icon name="star-half-outline"></ion-icon>
        }[name]
      }
    </>
  );
};


const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.byId);
  const categoriesIds = useSelector(state => state.categories.allIds);

  useEffect(() => {
    if (categoriesIds.length > 0) return;
    dispatch(getCategories());
  }, [dispatch, categoriesIds.length]);

  return (
    <div className="bg-neutral-light p-16">
      <h2 className="mb-12 text-2xl font-black text-center">Browse by fundraising category</h2>
      <div className="grid grid-cols-4 gap-y-7 justify-items-center">
        {categoriesIds.map(categoryId => (
          <Link key={categoryId} to={`/f/${categories[categoryId].name.toLowerCase()}`}>
            <div className="flex flex-col items-center">
              <span className="text-primary text-4xl"><Icon name={categories[categoryId].name} /></span>
              <span className="ml-2 duration-200 hover:text-primary">{categories[categoryId].name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
};

export default Categories;