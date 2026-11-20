export let cart = []

export function loadCart001() {
  let cartCount = document.getElementById('cartCount');
  if (!cartCount) return;
  let totallyy= cart.reduce((soma, item) => soma + item.amount, 0);
  cartCount.innerText = totallyy;
}





export function addCart(productID){
  let itemExistes = cart.find(item=> item.id === productID)
  
  if (itemExistes){
    itemExistes.amount++
  }else {
    cart.push({id: productID, amount:1})
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  
  loadCart001()
}

export function loadCart() {
  let data = localStorage.getItem("cart");
  if (data) {
    cart.push(...JSON.parse(data));
 
 loadCart001()
  }
}

export function decrease (productID){
  let index = cart.findIndex(item => item.id === productID)
  if(index === -1)return;
  
  if (cart [index].amount >1 ){
    cart[index].amount --;
  }else{cart.splice(index,1)}
  
  localStorage.setItem("cart", JSON.stringify(cart));
  
  loadCart001()
}
export function increase (productID){
  let index = cart.findIndex(item => item.id === productID)
  if(index === -1)return;
  cart[index].amount ++;
  
  localStorage.setItem("cart", JSON.stringify(cart));
  
  loadCart001()
  
}
  
  export function removeProduct (productID){
    let index = cart.findIndex((item)=> item.id === productID)
    if ( index === -1)return;
    cart.splice(index,1)
    localStorage.setItem("cart", JSON.stringify(cart));
    
    loadCart001()
  }