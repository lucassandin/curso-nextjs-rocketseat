import { useRouter } from 'next/router';

// static generation using fallback property
export default function Category({ products }) {
    const router = useRouter();

    // quando tem a opção fallback como true
    // a router retorna uma opção de fallback 
    // por estar esperando uma resposta
    if (router.isFallback) {
        return <p>Carregando...</p>
    }

    return (
        <div>

            <h1>{router.query.slug}</h1>

            {products && products.map(p => {
            return (
              <li key={p.id}>
                {p.title}
              </li>
            )
          })}
        </div>
        
    )
}

// método para geração de páginas dinâmicas
// retorna um objeto para captura de path
export const getStaticPaths = async () => {
    const response = await fetch(`http://localhost:3333/categories`);
    const categories = await response.json();

    const paths = categories.map(category => {
        return {
            params: { slug: category.id }
        }
    })

    return {
        paths: paths,
        // tenta criar a página estática que foi gerada após o build
        // por exemplo: um novo produto adicionado após o build do app
        // então o fallback, possibilita a criação dessa página que
        // era para ter sido gerado no build, após o build.
        fallback: true
    }
}

export const getStaticProps = async (context) => {
    const { slug } = context.params;

    const response = await fetch(`http://localhost:3333/products?category_id=${slug}`);
    const products = await response.json();
    
    return {
        props: {
            products
        },
        // reload this page in step by 60 seconds
        revalidate: 60
    }
}