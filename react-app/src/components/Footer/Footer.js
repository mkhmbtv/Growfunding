import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t">
      <ul className="pt-10 mx-16 pb-20 flex justify-between">
        <li>
          <Link to='/' exact={true} className='font-logo text-xl text-primary'>
            GrowFunding
          </Link>
        </li>
        <li>
          <p className="text-grey-medium">Created by Mirkhat Makhambetov &copy; 2022</p>
        </li>
        <li>
          <a className="text-2xl duration-200 hover:text-primary" href='https://github.com/mkhmbtv'>
            <ion-icon name="logo-github"></ion-icon>
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;