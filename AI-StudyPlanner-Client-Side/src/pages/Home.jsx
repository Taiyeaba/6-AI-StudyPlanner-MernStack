import React from 'react';
import HeroSection from './HeroSection';
import HowItWorks from './HowItWorks';
import FAQSection from './FAQSection';
import Testimonials from './Testimonials';




const Home = () => {
  return (
    <div>
     <HeroSection/>
   
   <HowItWorks/>
   <Testimonials/>
   <FAQSection/>
 
    </div>
  );
};

export default Home;