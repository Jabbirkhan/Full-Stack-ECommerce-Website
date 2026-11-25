import { Link, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faSquareLinkedin, faYoutube } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {

  const location = useLocation();

  if (location.pathname === '/login' || location.pathname === '/forget-password' || location.pathname === '/verify-email' || location.pathname === '/privacy-policy' || location.pathname === '/terms-of-service') {
    return null;
  }

  const scrollToTop = () => {
    window.onscroll({ top: 0, left: 0, behavior: "smooth" });
  }

  return (
    <footer className='flex flex-col justify-center items-center gap-4 text-gray-500 w-full border-t-2 mt-10 py-5 px-[5%]'>
      <div className="w-[100%]">
        <ul className="flex flex-col sm:flex-row justify-around items-start gap-3">
          <Link to='/about' onClick={scrollToTop} className="hover:text-blue-400 transition-all duration-100">About Us</Link>
          <Link to='/contact' onClick={scrollToTop} className="hover:text-blue-400 transition-all duration-100">Contact</Link>
          <Link to='/about' onClick={scrollToTop} className="hover:text-blue-400 transition-all duration-100">FAQ</Link>
          <Link to='/privacy-policy' onClick={scrollToTop} className="hover:text-blue-400 transition-all duration-100">Privacy Policy</Link>
          <Link to='/terms-of-service' onClick={scrollToTop} className="hover:text-blue-400 transition-all duration-100">Terms of Service</Link>
        </ul>
      </div>
      <div className="flex items-center gap-5">
        <Link to='https://www.instagram.com' className="text-xl hover:text-blue-400 transition-all duration-150" target="_blank"><abbr title="Instagram"><FontAwesomeIcon icon={faInstagram} /></abbr></Link>
        <Link to='https://www.youtube.com' className="text-xl hover:text-blue-400 transition-all duration-150" target="_blank"><abbr title="YouTube"><FontAwesomeIcon icon={faYoutube} /></abbr></Link>
        <Link to='https://www.linkedIn.com' className="text-xl hover:text-blue-400 transition-all duration-150" target="_blank"><abbr title="LinkedIn"><FontAwesomeIcon icon={faSquareLinkedin} /></abbr></Link>
      </div>
      <div className="text-xs sm:text-base">@ 2024 TrendyCart. All right reserved.</div>
    </footer>
  )
}

export default Footer
