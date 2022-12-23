import React from 'react';

import Link from 'next/link';
// import Image from 'next/image';
import { urlFor } from '../lib/client';

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <Link href={`/product/${slug.current}`}>
      <div className="product-card">
        <img
          src={urlFor(image && image[0])}
          width={250}
          height={250}
          alt="product-image"
          className="product-image"
        />
        <p className="product-name">{name}</p>
        <p className="product-price">{`$${price}`}</p>
      </div>
    </Link>
  );
};

export default Product;
