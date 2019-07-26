var navBar = new Vue({
  el: '#navBar',
  data: {
    firstname: "Josep",
    lastname: "Cruz",
    nombreApp: "TEST APP"
  }
})

// "PRODUCT" COMPONENT

Vue.component('product', {
  props: {
      premium: {
        type: Boolean,
        required: true
      },
  },
  template: `
  <div class="product">
  
  <div class="product-image">
    <img :src="image" :alt="altText" :title="altText"/>
  </div>

  <div class="product-info">
    <h1>{{ title }}</h1>
    <p v-show="showDescription">{{ description }} </p>

    <p>{{ sale }} </p>

    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
    
    <ul>
        <li v-for="size in sizes">{{ size }} </li>
    </ul>

    <div 
      v-for="(variant, index) in variants" 
      :key="variant.variantId" 
      class="color-box" 
      :style="{ backgroundColor: variant.variantColor }" 
      @mouseover="updateProduct(index)">
    </div>

      
    <p v-if="inStock">Este producto está en stock</p>
    <p v-else :class="{lineThrought: !inStock}">Este producto no está en stock</p>

    <p v-if="onSale">En venta!</p>

    <p>Gastos de envío: {{ shipping }} </p>

    <a :href="link" target="_blank">Más productos como éste</a>
    <div>
      <button @click="addToCart" :disabled="!inStock" :class="{disabledButton: !inStock}">{{ addTextCarrito }}</button>
      <button class="restToCart" @click="restToCart">{{ restAddCarrito }}</button>
    </div>
  </div>
  
  </div>
  `,
  data(){
    return {
      product: "Pareja de calcetines",
      brand: 'Nike',
      description: "Un par de divertidos calcetines",
      selectedVariant: 0,
      altText: "A pair of Socks",
      link: "http://www.google.com",
      showDescription: true,
      onSale: true,
      details: ["80% algodón", "20% polyester", "Otros materiales"],
      sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      addTextCarrito: "Añadir",
      restAddCarrito: "Eliminar",
      onSale: true,
      variants: [
        {
          variantId: 2234,
          variantColor: "green",
          variantImage: "./assets/vmSocks-green.jpg",
          variantQuantity: 10
        },
        {
          variantId: 2235,
          variantColor: "blue",
          variantImage: "./assets/vmSocks_blue.jpg",
          variantQuantity: 0
        }
      ]
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
    },
    restToCart() {
      this.$emit('rest-to-cart', this.variants[this.selectedVariant].variantId) 
    },
    updateProduct(index) {
      this.selectedVariant = index
      console.log(index)
    }
  },
  computed: {
    title() { 
      return this.product + ' ' + this.brand
    },
    image() {
      return this.variants[this.selectedVariant].variantImage
    }, 
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity
    },
    sale(){
      if(this.onSale){
        return this.product + ' ' + this.brand + ' a la venta'
      }
      return this.product + ' ' + this.brand + ' no están a la venta'
    },
    shipping() {
      if(this.premium){
        return "Envío Gratuito"
      }else{
        return 2.99
      }
    }
  }
})

// APP ROOT
var app = new Vue({
  el: '#app',
  data: {
    premium: true,
    cart: [],
  },
  methods: {
    updateCart(id) {
      this.cart.push(id)
    },
    removeCart(id){
      for(var i = this.cart.length - 1; i >= 0; i--) {
        if (this.cart[i] === id) {
           this.cart.splice(i, 1);
        }
      }
    }
  }
})


// "PRODUCT DETAILS" COMPONENT
Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `
})

var app2 = new Vue({
  el: '#app-2',
  data: {
    message: 'You loaded this page on ' + new Date().toLocaleString(),
    seen: true
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  },
})


Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})


var app3 = new Vue({
  el: '#app-3',
  data: {
    groceryList: [
      { id: 0, text: 'Vegetables' },
      { id: 1, text: 'Cheese' },
      { id: 2, text: 'Whatever else humans are supposed to eat' }
    ]
  },
})

