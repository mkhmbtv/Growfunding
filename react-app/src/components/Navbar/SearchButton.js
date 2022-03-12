import { useEffect, useRef, useState } from "react";
import SearchBar from "../SearchBar";

const SearchButton = () => {
  const [showSearch, setShowSearch] = useState(false);
  const ref = useRef();

  const openSearchBar = () => {
    if (showSearch) return;
    setShowSearch(true);
  };

  useEffect(() => {
    if (!showSearch) return;
    function closeSearchBar(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowSearch(false);
      }
    }
    document.addEventListener('click', closeSearchBar);
    return () => document.removeEventListener('click', closeSearchBar);
  }, [showSearch]);

  return (
    <div ref={ref}>
      <button onClick={openSearchBar}>
        <div className="flex items-center">
          <span className="text-lg flex items-center justify-center mr-1.5">
            <ion-icon name="search-outline"></ion-icon>
          </span>
          Search
        </div>
      </button>
      {showSearch && (
        <SearchBar />
      )}
    </div>
  )
};

export default SearchButton;