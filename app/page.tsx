import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (

    <div
      className="min-h-screen bg-fixed bg-no-repeat bg-cover overflow-y-scroll"
      style={{
        backgroundImage:
          "url('')",
      }}>
      

    <header className="bg-[#1e1e1e] text-white px-8 py-3 flex items-center justify-between shadow-md">
{/*logo section*/}
      <div className="flex items-center gap-3">
        <img
          src="" 
          alt="Logo"
          className="h-12 w-auto"
        />
        
      </div>

{/*navigation*/}
      <nav>
        <ul className="flex gap-8 text-sm font-light tracking-widest">
          <li className="cursor-pointer hover:text-gray-400 transition">HOME</li>
          <li className="cursor-pointer hover:text-gray-400 transition">ABOUT US</li>
          <li className="cursor-pointer hover:text-gray-400 transition">ANVESHAN</li>
          <li className="cursor-pointer hover:text-gray-400 transition">EVENTS</li>
          <li className="cursor-pointer hover:text-gray-400 transition">OUR TEAM</li>
        </ul>
      </nav>
    </header>


        <h1 className="absolute top-10 text-3xl md:text-4xl font-bold">
        Maths <span className="text-purple-400">N</span> Tech Club
        </h1>

    

    <div className="bg-black text-white min-h-screen overflow-y-scroll">

{/*who are we*/}
      <section className="h-screen flex items-center justify-center px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl">

          <div>
            <h2 className="text-4xl font-bold mb-4">
              Who are <span className="text-purple-400">We?</span>
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We are the official knowledge club of National Institute of Technology,Durgapur. Established in 2009, the aim of our club is to create a platform
              that encourages one to structure their love and passion for mathematics in theworld of technology. It is our goal to strike the perfect balance of Maths and
              Technology by hosting regular events, webinars and workshops that inspire oneto explore new fields and innovations.
            </p>
            <a
              href="#"
              className="text-purple-400 hover:underline font-medium"
            >
              Know More About Us
            </a>
          </div>

          <div className="flex justify-center">
            <img
              src="" alt="about us"
              className="w-72 h-auto"
            />
          </div>
        </div>
      </section>

{/*meet the team*/}
      <section className="h-screen flex items-center justify-center px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl">
          
          <div className="flex justify-center order-2 md:order-1">
            <img
              src="" alt="team members"
              className="w-80 h-auto"
            />
          </div>


          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold mb-4">
              Meet the <span className="text-purple-400">people</span> making it happen
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Be it the smallest achievements or the largest accomplishments, it requires
              the support and dedication of every member of the team. All our endeavors are
              nothing but a display of the united ambition of our small squad. Here at the
              Math Club, this dynamic gang gets behind it all.
            </p>
            <a
              href="#"
              className="text-purple-400 hover:underline font-medium"
            >
              Meet the people making it happen
            </a>
          </div>
        </div>
      </section>
    </div>

{/*footer*/}
    <footer className="bg-black text-gray-300 py-10 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Get In Touch</h2>
          <p className="mt-2 text-lg">Maths & Tech Club</p>
          <p className="text-sm">NIT Durgapur</p>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-white mt-1" />
              <span>
                : Mahatma Ganndhi Avenue, <br />
                A-Zone, Durgapur, West Bengal,<br />
                Durgapur: 713209
              </span>
            </li>
            <li className="flex items-center gap-3">
              <FontAwesomeIcon icon={faPhone} className="text-white" />
              <a href="tel:+918887684257" className="hover:text-white">
              +91 88876 84257(President)
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FontAwesomeIcon icon={faEnvelope} className="text-white" />
              <a href="mailto:mnitcclub@gmail.com" className="hover:text-white">
                mntcnitd@gmail.com
              </a>
            </li>
          </ul>
          
          <div className="flex gap-4 mt-4 text-xl">
            <a href="#" className="hover:text-white">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#" className="hover:text-white">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" className="hover:text-white">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Other Pages</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Anveshan</a></li>
            <li><a href="#" className="hover:text-white">Events</a></li>
            <li><a href="#" className="hover:text-white">Our Team</a></li>
            <li><a href="#" className="hover:text-white">About Us</a></li>
          </ul>
        </div>
      </div>

      
      <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-700 pt-4">
        © All rights reserved by MNTC
      </div>
    </footer>
  </div>
  );
}