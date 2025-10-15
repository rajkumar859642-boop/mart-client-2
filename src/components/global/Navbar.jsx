import { Link } from "react-router-dom"
import Logo from "../../assets/home/logo.png"
import Shopbtn from "../../assets/home/shopping-cart.png"

const Navbar = () => {
    return (
        <nav className="flex fixed top-0 left-0 right-0 z-10 bg-white  justify-between p-5 items-center md:px-20 shadow">
            <Link to="/">
                <img src={Logo} alt="D-Mart Logo" className="md:h-16 h-14" />
            </Link>
            <Link to={'/my-order'}>
            <img src={Shopbtn} alt="D-Mart Logo" className="md:h-10 h-10" />
            </Link>
        </nav>
    )
}

export default Navbar