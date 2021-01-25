import { Title } from '../../styles/pages/Home';

export default function ServerSide({ products }) {

  return (
    <div>
      <section>
        <Title>Products</Title>
        <h4>Server side fetch</h4>
        <ul>
          {products && products.map(p => {
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
    const response = await fetch(`http://localhost:3333/products`);
    const products = await response.json();

    return {
        props: {
            products
        }
    }
}