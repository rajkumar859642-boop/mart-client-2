import Slider1 from "../../assets/home/slider1.webp"
import Slider2 from "../../assets/home/slider2.webp"
import Slider3 from "../../assets/home/slider3.webp"
import Slider from 'react-slick';

const Hero = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className="overflow-hidden h-[30vh] md:h-[82vh] mt-32">
            <Slider {...settings}>
                <div className=" h-[30vh] md:h-screen">
                    <img src={Slider1} alt="slider1" />

                </div>
                <div className=" h-screen">
                    <img src={Slider2} alt="slider2" />
                </div>
                <div className=" h-screen">
                    <img src={Slider3} alt="slider3" />

                </div>

            </Slider>
        </div>
    )
}

export default Hero