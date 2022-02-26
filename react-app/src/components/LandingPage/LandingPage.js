import { Link } from "react-router-dom";
import background from "../../images/hero.jpg"

const LandingPage = () => {
  
  return (
    <div>
      <header 
        className="h-[85vh] bg-cover bg-center opacity-90 relative"
        style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${background})`}}
      >
        <div className="absolute top-[35%] left-24">
          <h1 className="mb-11">
            <span className="block text-5xl font-black text-white mb-4 w-2/3 leading-tight">
              Trusted fundraising for all of life's moments
            </span>
            <span className="text-2xl font-extrabold text-white">Get help. Give kindness. Start right now.</span>
          </h1>
          <Link className='py-3 px-6 bg-primary rounded text-lg text-white w-full font-extrabold
              hover:bg-green-500 duration-200' 
              to='/new-fundraiser'>Start Fundraising</Link>
        </div>
      </header>
    </div>
  )
};

export default LandingPage