
export async function findproducts() {
  try {
    let answer = await fetch('https://fakestoreapi.com/products');

    if (!answer.ok) {
      throw new Error("It was not possible to load the products.");
    }

    let product= await answer.json();
    return product;

  } catch (erro) {
    console.log(erro.message);
    return [];
  }
}