Vue.component('cart-count', {
    props: ['count'],
    template: '<div class="cart_icon__total">{{count}}</div>'
});

Vue.component('modal-cart', {
    data: function () {
        return {
            textCartIsEmpty: 'cart empty',
        }
    },
    methods: {
        removeProduct: function (key) {
            this.removeElement(this.cart, key);
        },
        removeElement: function (array, elem) {
            var index = array.indexOf(elem);
            if (index > -1) {
                array.splice(index, 1);
            }
        },
    },
    props: ['cart', 'products'],
    template: '    <div class="modal_cart">\n' +
        '        <div class="modal_cart__products" v-if="cart.length > 0">\n' +
        '            <div class="class_modal_cart_products__list" v-for="key in cart">\n' +
        '                <div class="class_modal_cart__products__list_item">\n' +
        '                    <p>{{products[key].name}}</p>\n' +
        '                    <p>{{products[key].price}}</p>\n' +
        '                    <p><button @click="removeProduct(key)">Remove</button> </p>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="modal_cart__products_total__price">\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div v-else>\n' +
        '            <p>{{textCartIsEmpty}}</p>\n' +
        '        </div>\n' +
        '    </div>'
});

Vue.component('google-maps', {
    data: function () {
        return {
            key: '',
        }
    },
    template: '<div id="map"></div>'
});

Vue.component('login', {
    data: function () {
        return {
            login: '',
            password: '',
        }
    },
    methods: {
        getData: function () {
            alert(this.login);
            alert(this.password);
        }
    },
    template: '<form>\n' +
        '        <label>Login: <input type="text" v-model="login" name="name"></label>\n' +
        '        <label>Password: <input type="password" v-model="password" name="password"></label>\n' +
        '        <input type="submit" @click="getData()" name="submit">\n' +
        '    </form>'
});

Vue.component('register', {
    data: function () {
        return {
            login: '',
            password: '',
            password2: '',
            error: '',
        }
    },
    methods: {
        getData: function () {
            this.validate();
            return false;
        },
        validate: function () {
            if (this.password == this.password2) {
                this.error = 'Ok';
            } else {
                this.error = 'Try again please';
            }
        }
    },
    template: '<form>\n' +
        '        <label>Login: <input type="text" v-model="login" name="name"></label>\n' +
        '        <label>Password: <input type="password" v-model="password" name="password"></label>\n' +
        '        <label>Password2: <input type="password" v-model="password2" name="password2"></label>\n' +
        '        <input type="submit" @click="getData()" name="submit">{{error}}\n' +
        '    </form>'
});

var shop = new Vue({
    el: '#shop',
    data: {
        currency: '$',
        cart: [],
        cartPrice: 0,
        favorite: [],
        textBtnAddToCart: 'addToCart',
        textBtnAddToFavorite: 'AddToFavorite',
        textBtnRemoveFromFavorite: 'RemoveFromFavorite',
        products: [
            {
                id: 1,
                image: '/1.png',
                name: 'Product 1',
                description: 'lorem ipsum, lorem upsum',
                price: 110,
            },
            {
                id: 2,
                image: '/2.png',
                name: 'Product 2',
                description: 'lorem ipsum, lorem upsum',
                price: 210,
            },
            {
                id: 3,
                image: '/3.png',
                name: 'Product 3',
                description: 'lorem ipsum, lorem upsum',
                price: 310,
            }
        ]
    },
    methods: {
        removeElement: function (array, elem) {
            var index = array.indexOf(elem);
            if (index > -1) {
                array.splice(index, 1);
            }
        },
        addToFavorite: function (id) {
            if (this.checkFavorite(id) == false) {
                this.favorite.push(id);
            } else {
                this.removeElement(this.favorite, id);
            }
            console.log(this.favorite);
        },
        checkFavorite: function (key) {
            index = this.favorite.indexOf(key);
            if (index > -1) {
                return true;
            } else {
                return false;
            }
        },

        checkProductInCart: function (key) {
            let index = this.cart.findIndex(x => x.id === key);
            if (index > -1) {
                return true;
            } else {
                return false;
            }
        },

        addToCart: function (id) {
            if (this.checkProductInCart(id) === false) {
                var obj = {};
                obj[id] = 1;
                this.cart.push(obj);
                console.log(this.cart);
                console.log('+');
                console.log(this.cart[id]);
            } else {
                var obj = {};
                obj[id]++;
                this.cart.push(obj);
                console.log('-');
            }
        },

        cartCount: function () {
            return this.cart.length;
        },
        cartProducts: function (id = null) {
            // console.log(this.cart);
        },
        cartTotalPrice: function () {
            let price = 0;
            if (this.cart.length > 0) {
                this.cart.forEach((value, index) => {
                    price = price + parseInt(this.products[value]['price']);
                });
            }
            return price + this.currency;
        }
    }
});