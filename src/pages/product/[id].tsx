// import { useRouter } from 'next/router'
import { GetStaticProps } from 'next'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product'
import { stripe } from '../../lib/stripe'

export default function Success() {
  // const { query } = useRouter()

  return (
    <ProductContainer>
      <ImageContainer></ImageContainer>

      <ProductDetails>
        <h1>Camiseta X</h1>
        <span>R$ 79,99</span>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero unde
          provident ut fugiat possimus. Quae incidunt at est officia, culpa
          assumenda blanditiis vel quidem nihil illum, pariatur tenetur, eaque
          quam!
        </p>

        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expannd: ['default_price'],
  })

  return {
    props: {},
    revalidate: 60 * 60 * 1, // 1 hour save in chache
  }
}
