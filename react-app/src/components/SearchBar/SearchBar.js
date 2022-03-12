import { useState } from "react";
import { useDispatch } from "react-redux";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchWord, setSearchWord] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <div className="absolute top-0 left-0 h-36 w-full bg-white flex items-center">
      <form className="w-full mx-28" onSubmit={onSubmit}>
        <div className="flex pb-2">
          <span className="text-lg flex items-center justify-center mr-1.5">
            <ion-icon name="search-outline"></ion-icon>
          </span>
          <h3 className="font-extrabold text-lg">Search GrowFunding</h3>
        </div>
        <input
          className="w-full py-1 px-2"
          type="text"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          placeholder="Search fundraisers by name, location or organizer"
        />
      </form>
    </div>
  )
};

export default SearchBar;