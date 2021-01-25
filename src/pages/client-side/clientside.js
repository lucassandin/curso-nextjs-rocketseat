import { useEffect, useState } from 'react';
import { Title } from '../../styles/pages/Home';

export default function ClientSide() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
      fetch(`http://localhost:3333/recommended`).then(r => {
          r.json().then(data => {
            setProducts(data);
          });
      });
  }, []);


  return (
    <div>
      <section>
        <Title>Products</Title>
        <h4>Client side fetch</h4>
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