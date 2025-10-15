const Footer = () => {
  return (
    <footer className="bg-white text-center text-sm py-6 md:py-8 border-t mt-6 md:mt-8 px-5">
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-gray-700 text-xs sm:text-sm">
        <a href="#" className="hover:underline whitespace-nowrap">FAQs</a> |
        <a href="#" className="hover:underline whitespace-nowrap">Privacy Policy</a> |
        <a href="#" className="hover:underline whitespace-nowrap">Pricing, Delivery, Return and Refund Policy</a> |
        <a href="#" className="hover:underline whitespace-nowrap">Terms and Conditions</a> |
        <a href="#" className="hover:underline whitespace-nowrap">Contact Us</a> |
        <a href="#" className="hover:underline whitespace-nowrap">About Us</a> |
        <a href="#" className="hover:underline whitespace-nowrap">Pickup Points</a> |
        <a href="#" className="hover:underline whitespace-nowrap">Disclaimer</a>
      </div>

      <p className="mt-4 text-gray-700 text-sm sm:text-base">
        Download DMart Ready Mobile App Now!!
      </p>

      <div className="flex justify-center gap-3 sm:gap-4 mt-4">
        <a href="#">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Get it on Google Play"
            className="h-10 sm:h-12 w-auto"
          />
        </a>
        <a href="#">
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="Download on the App Store"
            className="h-10 sm:h-12 w-auto"
          />
        </a>
      </div>

      <p className="mt-4 sm:mt-6 text-gray-500 text-xs sm:text-sm">
        Copyright © 2023 Avenue E-Commerce Limited (AEL). All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;