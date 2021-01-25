import { Title } from '../styles/pages/Home'

export default function Home({ recommendedProducts }) {


  return (
    <div>
      <section>
        <Title>Products</Title>
        <ul>
          {recommendedProducts && recommendedProducts.map(p => {
            return (
              <li key={p.id}>
                {p.title}
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

export const getServerSideProps = async () => {
  const response = await fetch('http://localhost:3333/recommended');
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts
    }
  }
}
