import { addCart, cart, loadCart, removeProduct, decrease,increase } from './cart.js';
import { findproducts } from './api.js';




function shows(product) {
    return`
  <div class="produ001" data-id="${product.id}">
     <div class="img-wrap">
        <img src="${product.image}" alt="${product.title}">
     </div>
        <h3>${product.title}</h3>
        <p>${product.price} MT</p>
        <p>${product.category}</p>
        <button data-id="${product.id}">Add</button>
    </div> `
}


function showModal(product) {
  document.getElementById("productModalContent").innerHTML = `
    <img src="${product.image}" alt="${product.title}">
    <h2>${product.title}</h2>
    <p class="modal-price">${product.price} $</p>
    <p class="modal-rating">⭐ ${product.rating.rate} (${product.rating.count} reviews)</p>
    <p class="modal-description">${product.description}</p>
    <button data-id="${product.id}">Add to Cart</button>
  `;

  document.getElementById("productModal").classList.add("open");
  document.getElementById("productModalOverlay").classList.add("open");
}



let productC = document.getElementById("product")
let search = document.getElementById("search")
let filCtg = document.getElementById("filCtg")
let order =
    document.getElementById("order")






async function start() {
    productC.innerHTML = `<div class="spinner"></div>`;

    let products = await findproducts();

    if (products.length === 0) {
      productC.innerHTML = "<p>Could not load products. Please try again later.</p>";
      return;
    }

    productC.innerHTML = products.map(product => shows(product)).join("")

    

    
    
    
    search.addEventListener("input", function() {
        let value001 = search.value.toLowerCase()
        
        let filter001 =
            
            products.filter(function(product) {
                return product.title.toLowerCase().includes(value001)
            });
        productC.innerHTML = filter001.map(product => shows(product)).join("")
    })
    
    
    let categorias = [...new Set(products.map(product => product.category))];
    
    
    categorias.forEach(function(cat) {
        filCtg.innerHTML += `<option value="${cat}">${cat}</option>`;
    });
    
    
    
    filCtg.addEventListener("change", function() {
        let value002 = filCtg.value;
        
        let filtr;
        
        if (value002 === "alot of") {
            filtr = products;
        } else {
            filtr = products.filter(function(product) {
                return product.category === value002;
            });
        }
        
        productC.innerHTML = filtr.map(product => shows(product)).join("");
    });
    
    
    
    order.addEventListener("change", function() {
        let value003 = order.value
        let ordered = [...products]
        
        if (value003 === "asc") {
            ordered.sort((a, b) => a.price - b.price)
        } else if (value003 === "desc") {
            ordered.sort((a, b) => b.price - a.price)
        }
        productC.innerHTML = ordered.map(product => shows(product)).join("")
    });
    
    
    
    
    

      productC.addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
        let id = Number(event.target.dataset.id);
        addCart(id);
        console.log(cart);
        showsCart001()
        return;
    }

    let card = event.target.closest(".produ001");
    if (card) {
        let id = Number(card.dataset.id);
        
        let productClicked= products.find(p => p.id === id);
        showModal(productClicked);
    }
})

    
    
    
    
        document.getElementById ("cart").addEventListener("click", function (event ){
            let btnDecrease  = event.target.closest(".btn-decrease")
            
            let btnIncrease = event.target.closest(".btn-increase");
            
            let btnRemove = event.target.closest(".btn-remove")
            
            
        if (btnDecrease) {
        decrease(Number(btnDecrease.dataset.id));
        showsCart001();
    }
    
    if (btnIncrease) {
        increase(Number(btnIncrease.dataset.id));
        showsCart001();
    }

    if (btnRemove) {
        removeProduct(Number(btnRemove.dataset.id));
        showsCart001();
    }
        
        
        
    });
    
    
    
    
    
    function showsCart001() {
        let cartDiv = document.getElementById("cart");
        
        cartDiv.innerHTML = cart.map(function(itemCart) {
            let productCompleted = products.find(p => p.id === itemCart.id);
            
            return `
       <div class="itemCarrinho">
        <img src="${productCompleted.image}" alt="${productCompleted.title}" class="cart-item-img">
        <div class="cart-item-info">
          <span>${productCompleted.title}</span>
          <span>${itemCart.amount}x — ${productCompleted.price * itemCart.amount} $</span>
        </div>
        <button class="btn-decrease" data-id="${itemCart.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
         <button class="btn-increase" data-id="${itemCart.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
        <button class="btn-remove" data-id="${itemCart.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
      </div>
    `;
        }).join("");
        
        
        let totally = cart.reduce(function(accumulated, itemCart) {
            let productAccumulated = products.find(p => p.id === itemCart.id)
            return accumulated + (productAccumulated.price * itemCart.amount)
            
        }, 0)
        document.getElementById("totally").innerText = "Totally: " + totally + " $";
        
        
        
    }
    
    document.getElementById("cartTrigger").addEventListener("click", function(e) {
    e.preventDefault();
    document.getElementById("cartSection").classList.add("open");
    document.getElementById("cartOverlay").classList.add("open");
});

document.getElementById("closeCart").addEventListener("click", function() {
    document.getElementById("cartSection").classList.remove("open");
    document.getElementById("cartOverlay").classList.remove("open");
});

document.getElementById("cartOverlay").addEventListener("click", function() {
    document.getElementById("cartSection").classList.remove("open");
    document.getElementById("cartOverlay").classList.remove("open");
});

document.getElementById("closeModal").addEventListener("click", function() {
    document.getElementById("productModal").classList.remove("open");
    document.getElementById("productModalOverlay").classList.remove("open");
});

document.getElementById("productModalOverlay").addEventListener("click", function() {
    document.getElementById("productModal").classList.remove("open");
    document.getElementById("productModalOverlay").classList.remove("open");
});


    loadCart()
    showsCart001()
}
start();