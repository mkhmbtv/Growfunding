import { useHistory } from "react-router-dom";


const PageNotFound = () => {
  const history = useHistory();

  return (
    <div className="px-28 pt-10 h-[66vh]">
      <button
        className="border border-primary rounded font-bold px-6 py-1 hover:bg-[#e6f6ef] 
          text-primary duration-200 mb-4" 
        onClick={() => history.push('/')}>
          Home
      </button>
      <h1 className="font-black text-4xl mb-4">Page not found</h1>
      <p>We're sorry, but that page cannot be found. Please check the link URL and try again.</p>
    </div>
  );
};

export default PageNotFound;