/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product'
import { stripe } from '../../lib/stripe'
import Stripe from 'stripe'
import Image from 'next/image'
import { useRouter } from 'next/router'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}

export default function Success({ product }: ProductProps) {
  // const { query } = useRouter()
  const { isFallback } = useRouter()

  if (isFallback) {
    return 'Loading...'
  }

  function handlerBuyProduct() {
    console.log(product.defaultPriceId)
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} alt="" width={520} height={480} />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>

        <button onClick={handlerBuyProduct}>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  if (!params) {
    return {
      notFound: true,
    }
  }

  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format((price.unit_amount as number) / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour save in chache
  }
}
