var app = new Vue({
    el: '#app',
    data: {
        products: [{
                id: 1594105377907,
                title: '愛文芒果', // 商品名稱 - string
                category: '水果', //商品分類 - string
                content: '濃郁的香氣及滑順的口感', //商品敘述 - string
                description: '果皮鮮紅', //商品說明 - string
                // sugar: 13,
                // sugarValue: '65%',
                imageUrl: 'https://images.unsplash.com/photo-1587486936739-78df7470c7e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60', //商品圖片 - string
                enabled: 'true', //是否上架 - boolean
                origin_price: 790, //原價 - number(integer)
                price: 600, //售價 - number(integer)
                unit: '斤', //單位 - string
                sugar: {
                    value: 13,
                    percent: '65%'
                },

            },
            {
                id: 1594105601148,
                title: '金煌芒果',
                category: '水果',
                content: '清爽的香氣及Q彈的口感',
                description: '果皮金黃',
                // sugar: 15,
                // sugarValue: '75%',
                imageUrl: 'https://images.unsplash.com/photo-1560452460-10e6cffc2153?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
                enabled: 'true',
                origin_price: 600,
                price: 450,
                unit: '斤',
                sugar: {
                    value: 15,
                    percent: '75%'
                },

            }
        ],
        tempData: [], //暫存要處理的商品資料
    },
    methods: {
        openModal(action, item) {
            switch (action) {
                case 'new':
                    this.tempData = {};
                    $('#productModal').modal('show');
                    break;
                case 'edit':
                    //this.tempData = Object.assign({}, item); //如果是編輯狀態，就新增一個空物件，將item丟進去做處理，然後賦值給this.tempData
                    this.tempData = JSON.parse(JSON.stringify(item));//改用深拷貝
                    $('#productModal').modal('show');
                    break;
                case 'delete':
                    $('#deleteModal').modal('show');
                    this.tempData = Object.assign({}, item);
                    break;
                default:
                    break;
            }
        },
        deleteItem() {
            //console.log(this.tempData);
            let id = this.tempData.id;
            this.products.forEach((item, index) => {
                if (item.id == id) { //如果產品陣列裡面項目的id跟點擊項目的id相同
                    this.products.splice(index, 1); //刪除該項
                    this.tempData = {};
                }
            });
            $('#deleteModal').modal('hide'); //刪除完，關閉視窗
        },
        updateItem() { //用有無id判斷有無帶入item
            if (this.tempData.id) { //有，就在產品列表找到該筆取代舊的
                this.products.forEach((item, index) => {
                    if (item.id == this.tempData.id) {
                        this.products[index] = this.tempData;
                    }
                })
            } else { //沒有，就新增push
                const id = new Date().getTime();
                let sugar = this.tempData.sugar.value;
                function percent(sugar) {
                    let total = 20;
                    let num = Math.round(sugar / total * 100) + "%";
                    return num //整數百分比
                };
                let value = percent(sugar);
                this.tempData.sugar.percent = value;
                console.log(this.tempData.sugar);
                this.tempData.id = id;
                this.products.push(this.tempData);

            }
            this.tempData = {};
            $('#productModal').modal('hide');

        },

    }

})