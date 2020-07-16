var app = new Vue({
    el: '#app',
    data: {
        message: '一直跑不出來',
        products: [{
            id: 1594105377907,
            title: '愛文芒果', // 商品名稱 - string
            category: '水果', //商品分類 - string
            content: '濃郁的香氣及滑順的口感', //商品敘述 - string
            description: '果皮鮮紅', //商品說明 - string
            imageUrl: 'https://images.unsplash.com/photo-1587486936739-78df7470c7e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60', //商品圖片 - string
            enabled: 'true', //是否上架 - boolean
            origin_price: 790, //原價 - number(integer)
            price: 600, //售價 - number(integer)
            unit: '斤', //單位 - string
            sugar: {
                value: 13,
                percentValue: '65%'
            }
        }, {
            id: 1594105601148,
            title: '金煌芒果',
            category: '水果',
            content: '清爽的香氣及Q彈的口感',
            description: '果皮金黃',
            imageUrl: 'https://images.unsplash.com/photo-1560452460-10e6cffc2153?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
            enabled: 'true',
            origin_price: 600,
            price: 450,
            unit: '斤',
            sugar: {
                value: 15,
                percentValue: '75%'
            }

        }],
        tempData: {
            sugar:{}
        },
    },
    methods: {
        openModal(action, item) {
            switch (action) {
                case 'new':
                    $('#productModal').modal('show');
                    this.tempData = { // 給新的參考路徑，並定義第二層物件的屬性
                        sugar: {
                            value: 0,
                            percentValue: 0,
                        },
                    };
                    break;
                case 'edit': //編輯
                    $('#productModal').modal('show');
                    //this.tempData = Object.assign({}, item); // 物件淺拷貝
                    this.tempData = JSON.parse(JSON.stringify(item)); //物件深拷貝
                    // console.log(this.tempData.sugar.value);
                    break;
                case 'delete':
                    $('#deleteModal').modal('show');
                    //this.tempData = Object.assign({}, item);
                    this.tempData = JSON.parse(JSON.stringify(item)); //物件深拷貝
                    break;

                default:
                    break;
            }
        },
        deleteItem() {
            //console.log(this.tempData);
            let id = this.tempData.id;
            this.products.forEach((item, index) => {
                if (item.id == id) {
                    this.products.splice(index, 1);
                    this.tempData = {};
                }
            });
            $('#deleteModal').modal('hide');
        },
        updateItem() {
            if (this.tempData.id) { // （有id -> 編輯產品
                this.products.forEach((item, index) => {
                    if (item.id === this.tempData.id){
                        this.products[index] = this.tempData;
                        this.$set(this.products, index, this.tempData); // 強制雙向綁定
                    }
                        
                });
            } else { //沒有，就新增一筆
                this.tempData.id = new Date().getTime();
                this.products.push(this.tempData);
                this.tempData = {
                    sugar: {},
                };
            }
            $("#productModal").modal("hide");

        },
        progress(item) {
            return Math.round(item.sugar.value / 20 * 100) + '%';
        },


    },

});
