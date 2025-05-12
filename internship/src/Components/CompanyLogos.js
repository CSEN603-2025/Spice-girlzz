import React from 'react';
import './CompanyLogos.css'; // optional if you're styling
import { FaAmazon, FaSlack, FaGoogle, FaCcVisa, FaNetflix } from 'react-icons/fa';



function CompanyLogos() {
  return (
    <div className="company-logos">
      <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Google-flutter-logo.svg" alt="Bard" />
      <img src="https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg" alt="Slack" />
      <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" />
      <img src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Visa_2021.svg" alt="Visa" />
      <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" />
    </div>

    
  );
}

export default CompanyLogos;
