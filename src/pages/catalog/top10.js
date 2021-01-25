export default function Top10({ products }) {
    return (
        <div>
            <h1>Top10</h1>

            <ul>
          {products && products.map(p => {
            return (
              <li key={p.id}>
                {p.title}
              </li>
            )
          })}
        </ul>
        </div>
    )
}

export const getStaticProps = async (context) => {
    const response = await fetch('http://localhost:3333/products');
    const products = await response.json();
    
    return {
        props: {
            products
        },
        // reload this page in step by 5 seconds
        revalidate: 5
    }
}