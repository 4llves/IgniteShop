// import { useRouter } from 'next/router'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product'

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
