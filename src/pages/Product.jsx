import React from 'react'
import Helmet from '../components/Helmet'
import {Section, SectionBody, SectionTitle} from '../components/Section'
import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard'
import productData from '../assets/fake-data/products'
import { useParams } from 'react-router-dom'
import ProductView from '../components/ProductView'
import { useEffect } from 'react'

const Product = props => {
  const {slug} = useParams()
  const product = productData.getProductBySlug(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [product])
  
const relatedProducts = productData.getProducts(8)

  return (
    <div className="container">
      <div className="main">
        <Helmet title={slug}>
          <Section>
            <SectionBody>
              <ProductView product = {product}/>
            </SectionBody>
          </Section>
          <Section>
            <SectionTitle>
              Khám phá thêm
            </SectionTitle>
            <SectionBody>
            <Grid
                col={4}
                mdCol={2}
                smCol={1}
                gap={20}
                >
                {
                  relatedProducts.map((item,index)=>(
                    <ProductCard 
                    key={index}
                    img01={item.image01}
                    img02={item.image02}
                    name={item.title}
                    price={Number(item.price)}
                    slug={item.slug}
                    />
                  ))
                }
                </Grid>
            </SectionBody>
          </Section>
        </Helmet>
      </div>
    </div>
  )
}

export default Product