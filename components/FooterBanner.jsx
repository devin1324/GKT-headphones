import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';

const FooterBanner = ({
  footerBanner: {
    LargeText1,
    LargeText2,
    saleTime,
    discount,
    smallText,
    product,
    buttonText,
    image,
    midText,
    desc,
  },
}) => {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{LargeText1}</h3>
          <h3>{LargeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
        </div>
        <img src={urlFor(image)} className="footer-banner-image" alt="Image" />
      </div>
    </div>
  );
};

export default FooterBanner;
