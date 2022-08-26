import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import { Link, useParams } from 'react-router-dom';
import ProductPrice from 'components/ProductPrice';
import { Product } from 'types/product';
import axios from 'axios';
import { useEffect, useState } from 'react';

import './styles.css';
import { BASE_URL } from 'util/requests';

type UrlParams = {
    productId: string;
}

const ProductDetails = () => {

    const { productId } = useParams<UrlParams>();

    const [product, setProduct] = useState<Product>();
    
    useEffect(() => {

        axios.get(`${BASE_URL}/products/${productId}`)
            .then(response => {
                setProduct(response.data);
            });

    }, [productId]); // o useEffect oberva o valor em colchetes; qdo ele é aterado, o useEffect é chamado novamente
    
    return (
        <div className="product-details-container">
            <div className="base-card  product-details-card">
                <Link to="/products" >
                    <div className="goback-container">
                        <ArrowIcon />
                        <h2>VOLTAR</h2>
                    </div>
                </Link>
                
                <div className="row">
                    <div className="col-xl-6">
                        <div className="img-container">
                            <img src={ product?.imgUrl } alt={ product?.name } />
                        </div>

                        <div className="name-price-container">
                            <h1>{ product?.name }</h1>
                            { product && <ProductPrice price={ product?.price } /> } {/* só será renderizado se o 'product' não for undefined */}
                        </div>
                    </div>

                    <div className="col-xl-6">
                        <div className="description-container">
                            <h2>Descrição do produto</h2>
                            <p>{ product?.description }</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
