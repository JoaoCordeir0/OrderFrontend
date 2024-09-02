<template>    
    <div class="mt-2 w-full">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="">
                <div class="overflow-y-hidden bg-white border-2 rounded-xl border-gray px-5 py-5 mt-2">              
                    <div class="flex flex-wrap">                                                
                        <div class="w-full grid grid-cols-6 gap-4">                    
                            <div class="col-start-1 col-end-8 ...">
                                <p class="text-gray-500 font-semibold text-xl"> <span class="border-b-2">Products</span>
                                    <span v-if="!infoLoadedProduct">
                                        <Spinner />
                                    </span>
                                </p>
                            </div>
                            <div class="col-end-10 col-span-2 ...">                                
                                <a href="#" v-on:click="showModalProductAdd" class="bg-blue-600 text-white rounded-md py-1 px-3">Add &nbsp; <font-awesome-icon :icon="['fas', 'plus']" /></a>
                            </div>                
                        </div>
                    </div>                          
                    <table class="leading-normal mt-5 w-full">
                        <thead>
                            <tr>
                                <th class="px-5 text-start border-b-2">ID</th>
                                <th class="px-5 text-start border-b-2">Name</th>        
                                <th class="px-5 text-start border-b-2">Value</th>             
                                <th class="px-5 text-center border-b-2">Actions</th>                                                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in products">
                                <td class="px-5 py-4 text-sm bg-white border-b border-gray-200">
                                    <p class="text-gray-900 whitespace-nowrap">{{ item.id }}</p>
                                </td>
                                <td class="px-5 py-4 text-sm bg-white border-b border-gray-200">
                                    <p class="text-gray-900 whitespace-nowrap">{{ item.productName }}</p>
                                </td>                                
                                <td class="px-5 py-4 text-sm bg-white border-b border-gray-200">
                                    <p class="text-gray-900 whitespace-nowrap"><b>R$ {{ item.value.toFixed(2) }}</b></p>
                                </td>    
                                <td class="px-5 py-4 text-sm text-center bg-white border-b border-gray-200">
                                    <div class="sm:inline-block">                                        
                                        <button v-on:click="showProduct(item.id)" title="View product" class="bg-gray-900 text-white rounded p-2 ps-3 pe-3 me-2 w-10">
                                            <font-awesome-icon :icon="['fas', 'eye']" />
                                        </button>        
                                        <button v-on:click="deleteProduct(item.id)" title="Delete product" class="bg-red-600 text-white rounded p-2 ps-3 pe-3 me-2 w-10">
                                            <font-awesome-icon :icon="['fas', 'trash-can']" />
                                        </button>                                                
                                    </div>    
                                </td>                                                               
                            </tr>
                        </tbody>
                    </table>                                                     
                </div>
            </div>
            
            <div>
                <div class="overflow-y-hidden bg-white border-2 rounded-xl border-gray px-5 py-5 mt-2">              
                    <div class="flex flex-wrap">                                                
                        <div class="w-full grid grid-cols-6 gap-4">                    
                            <div class="col-start-1 col-end-8 ...">
                                <p class="text-gray-500 font-semibold text-xl"> <span class="border-b-2">Orders</span>
                                    <span v-if="!infoLoadedOrder">
                                        <Spinner />
                                    </span>
                                </p>
                            </div>
                            <div class="col-end-10 col-span-2 ...">                                
                                <a href="#" v-on:click="showModalOrderAdd" class="bg-blue-600 text-white rounded-md py-1 px-3">Add &nbsp; <font-awesome-icon :icon="['fas', 'plus']" /></a>
                            </div>                
                        </div>
                    </div>                              
                    <table class="leading-normal mt-5 w-full">
                        <thead>
                            <tr>
                                <th class="px-5 text-start border-b-2">ID</th>
                                <th class="px-5 text-start border-b-2">Client name</th>        
                                <th class="px-5 text-center border-b-2">Payment status</th>   
                                <th class="px-5 text-center border-b-2">Actions</th>                                                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in orders">
                                <td class="px-5 py-4 text-sm bg-white border-b border-gray-200">
                                    <p class="text-gray-900 whitespace-nowrap">{{ item.id }}</p>
                                </td>
                                <td class="px-5 py-4 text-sm bg-white border-b border-gray-200">
                                    <p class="text-gray-900 whitespace-nowrap">{{ item.clientName }}</p>
                                </td>                                
                                <td class="px-5 py-4 text-sm bg-white border-b border-gray-200">
                                    <p class="text-gray-900 whitespace-nowrap text-center">
                                        <span v-if="item.paid" ><font-awesome-icon class="fa-xl" :icon="['fas', 'thumbs-up']" /></span>    
                                        <span v-else><font-awesome-icon class="fa-xl" :icon="['fas', 'thumbs-down']" /></span>
                                    </p>
                                </td>                                                           
                                <td class="px-5 py-4 text-sm text-center bg-white border-b border-gray-200">
                                    <div class="sm:inline-block">                                        
                                        <button v-on:click="loadOrder(item.id)" title="View order" class="bg-gray-900 text-white rounded p-2 ps-3 pe-3 me-2 w-10">
                                            <font-awesome-icon :icon="['fas', 'eye']" />
                                        </button>         
                                        <button v-on:click="deleteOrder(item.id)" title="Delete order" class="bg-red-600 text-white rounded p-2 ps-3 pe-3 me-2 w-10">
                                            <font-awesome-icon :icon="['fas', 'trash-can']" />
                                        </button>                                                 
                                    </div>    
                                </td>                                                               
                            </tr>
                        </tbody>
                    </table>                                                     
                </div>
           </div>
        </div>
    </div>

    <!-- Modal de adição de produtos -->
    <Modal v-show="isModalProductAddVisible" @some-event="showModalProductAdd">
        <template #header>
            <p class="text-xl">Adding products</p>
        </template>
        <template #body>
            <div class="px-5 py-5 mt-0">
                <form @submit.prevent="">
                    <label class="block">
                        <span class="text-sm text-gray-700">Product name <span class="text-red-500 font-semibold">*</span></span>
                        <input type="text" class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
                            v-model="product_name" />
                    </label>    
                    <label class="block mt-2">
                        <span class="text-sm text-gray-700">Product value <span class="text-red-500 font-semibold">*</span></span>
                        <input type="text" class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
                            v-model="product_value" />
                    </label>                        
                </form>
                <div class="flex justify-end">
                    <button v-on:click="saveProduct()" type="button" class="px-12 py-2 mt-3 text-sm text-center text-white bg-gray-900 rounded-md focus:outline-none font-bold">                                    
                        <font-awesome-icon :icon="['fas', 'floppy-disk']" /> &nbsp; Salvar                                   
                    </button>                    
                </div>            
            </div>                     
        </template>
    </Modal>

    <!-- Modal de edição de produtos -->
    <Modal v-show="isModalProductEditVisible" @some-event="showModalProductEdit">
        <template #header>
            <p class="text-xl">Edit product</p>
        </template>
        <template #body>
            <div class="px-5 py-5 mt-0">
                <form @submit.prevent="">
                    <label class="block">
                        <span class="text-sm text-gray-700">Product Id</span>
                        <input type="text" disabled class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
                            v-model="product_id" />
                    </label>    
                    <label class="block mt-2">
                        <span class="text-sm text-gray-700">Product name <span class="text-red-500 font-semibold">*</span></span>
                        <input type="text" class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
                            v-model="product_name" />
                    </label>    
                    <label class="block mt-2">
                        <span class="text-sm text-gray-700">Product value <span class="text-red-500 font-semibold">*</span></span>
                        <input type="text" class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
                            v-model="product_value" />
                    </label>                        
                </form>
                <div class="flex justify-end">
                    <button v-on:click="saveProduct()" type="button" class="px-12 py-2 mt-3 text-sm text-center text-white bg-gray-900 rounded-md focus:outline-none font-bold">                                    
                        <font-awesome-icon :icon="['fas', 'floppy-disk']" /> &nbsp; Editar                                   
                    </button>                    
                </div>            
            </div>                     
        </template>
    </Modal>

    <!-- Modal de adição de pedidos -->
    <Modal v-show="isModalOrderAddVisible" @some-event="showModalOrderAdd">
        <template #header>
            <p class="text-xl">Criação e edição de eventos</p>
        </template>
        <template #body>
            <div class="px-5 py-5 mt-0">
                <form @submit.prevent="">
                    <label class="block">
                        <span class="text-sm text-gray-700">Order <span class="text-red-500 font-semibold">*</span></span>
                        <select v-model="order" class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full">
                            <option value="0">Create new</option>    
                            <option v-for="item in orders" v-bind:value="item.id">{{ item.clientName }}</option>                        
                        </select>
                    </label>  
                    <div v-if="order == 0" class="">
                        <label class="block mt-2">
                            <span class="text-sm text-gray-700">Client name <span class="text-red-500 font-semibold">*</span></span>
                            <input type="text" class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
                                v-model="order_cli_name" />
                        </label>   
                        <label class="block mt-2">
                            <span class="text-sm text-gray-700">Client email <span class="text-red-500 font-semibold">*</span></span>
                            <input type="email" class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
                                v-model="order_cli_email" />
                        </label>    
                        <label class="block mt-2">
                            <span class="text-sm text-gray-700">Payment status <span class="text-red-500 font-semibold">*</span></span>
                            <select v-model="order_paid" class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full">
                                <option value="0">Not paid</option>    
                                <option value="1">Paid</option>                        
                        </select>
                    </label> 
                    </div>     
                    <label class="block mt-2">
                        <span class="text-sm text-gray-700">Product <span class="text-red-500 font-semibold">*</span></span>
                        <select v-model="order_product" class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full">                            
                            <option value="0">Select the product</option>   
                            <option v-for="item in products" v-bind:value="item.id">{{ item.productName }}</option>                        
                        </select>
                    </label>                           
                    <label class="block mt-2">
                        <span class="text-sm text-gray-700">Amount <span class="text-red-500 font-semibold">*</span></span>
                        <input type="number" class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
                            v-model="order_amount" />
                    </label>                                  
                </form>
                <div class="flex justify-end">
                    <button v-on:click="saveOrder()" type="button" class="px-12 py-2 mt-3 text-sm text-center text-white bg-gray-900 rounded-md focus:outline-none font-bold">                                    
                        <font-awesome-icon :icon="['fas', 'floppy-disk']" /> &nbsp; Salvar                                   
                    </button>                    
                </div>            
            </div>                     
        </template>
    </Modal>

    <!-- Modal de detalhes do pedido -->
    <Modal v-show="isModalOrderDetailsVisible" @some-event="showModalOrderDetails">
        <template #header>
            <p class="text-xl">Order details</p>
        </template>
        <template #body>
            <div v-if="infoLoadedOrderDetails" class="px-5 py-5 mt-0">
                <div class="">
                    <p class="mb-2"><b>Order ID:</b> {{ ordersDetails.id }}</p>
                    <hr>                    
                    <p class="mt-2 mb-2 flex"><b class="mt-2 w-40">Client name:</b> <input type="text" class="block w-full ms-2 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800" v-model="order_cli_name" /></p>
                    <hr>
                    <p class="mt-2 mb-2 flex"><b class="mt-2 w-40">Client email:</b> <input type="text" class="block w-full ms-2 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800" v-model="order_cli_email" /></p>
                    <hr>
                    <p class="mt-2 mb-2 flex"><b class="mt-2 w-40">Paid:</b>
                        <select v-model="order_paid" class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ms-2 w-full">
                            <option value="0">Not paid</option>    
                            <option value="1">Paid</option>                        
                        </select>
                    </p>
                    <hr>
                    <p class="mt-2 mb-2 flex"><b class="mt-2 w-40">Total value:</b> <input type="text" class="block w-full ms-2 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800" :value="'R$ ' + ordersDetails.totalValue.toFixed(2)" disabled/></p>                    
                    <hr>
                    <p class="mt-2 mb-2"><b>Items:</b></p>
                </div>
                <table class="leading-normal w-full">
                    <thead>
                        <tr>                            
                            <th class="px-5 text-center border-b-2">Product ID</th>        
                            <th class="px-5 text-start border-b-2">Product Name</th>   
                            <th class="px-5 text-center border-b-2">Product Value</th>
                            <th class="px-5 text-center border-b-2">Amount</th>                                                                
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in ordersDetails.items">
                            <td class="px-5 py-4 text-sm bg-white border-b border-gray-200">
                                <p class="text-gray-900 text-center whitespace-nowrap">{{ item.productId }}</p>
                            </td>
                            <td class="px-5 py-4 text-sm bg-white border-b border-gray-200">
                                <p class="text-gray-900 whitespace-nowrap">{{ item.productName }}</p>
                            </td>                                
                            <td class="px-5 py-4 text-sm bg-white border-b border-gray-200">
                                <p class="text-gray-900 text-center whitespace-nowrap">R$ {{ item.unitValue.toFixed(2) }}</p>
                            </td>  
                            <td class="px-5 py-4 text-sm bg-white border-b border-gray-200">
                                <p class="text-gray-900 text-center whitespace-nowrap">{{ item.amount }}</p>
                            </td>                                                         
                        </tr>
                    </tbody>
                </table>

                <button v-on:click="editOrder(ordersDetails.id)" type="button" class="px-12 py-2 mt-5 text-sm text-center text-white bg-gray-900 rounded-md focus:outline-none font-bold float-end">                                    
                    <font-awesome-icon :icon="['fas', 'floppy-disk']" /> &nbsp; Editar                                   
                </button>        
            </div>   
            <div v-else class="px-5 py-5 mt-0 flex justify-center">
                <Spinner />
            </div>         
        </template>
    </Modal>
</template>
  
<script lang="ts">
import { defineComponent, ref } from "vue"
import Spinner from "../components/Spinner.vue"
import Swal from "sweetalert2"
import { productAdd, productDelete, productDetails, productEdit, productList } from "../hooks/useProduct"
import { orderAdd, orderDelete, orderDetails, orderEdit, orderList } from "../hooks/useOrder"
import Modal from "../components/Modal.vue"
import { Toast } from "../hooks/useToast"

export default defineComponent({
    async setup() {           
        const infoLoadedProduct = ref(false)       
        const infoLoadedOrder = ref(false)       
        const infoLoadedOrderDetails = ref(false)       
        const products = ref()       
        const orders = ref() 
        const ordersDetails = ref()
        const isModalOrderDetailsVisible = ref(false)
        const isModalProductAddVisible = ref(false)
        const isModalOrderAddVisible = ref(false)
        const isModalProductEditVisible = ref(false)
        const product_id = ref()
        const product_name = ref("")
        const product_value = ref("")
        const order = ref(0)
        const order_cli_name = ref("")
        const order_cli_email = ref("")      
        const order_paid = ref(0)
        const order_product = ref(0)
        const order_amount = ref(0)  

        return {               
            infoLoadedProduct,
            infoLoadedOrder,
            infoLoadedOrderDetails,
            products,
            orders,
            ordersDetails,
            isModalOrderDetailsVisible,
            isModalProductAddVisible,
            isModalOrderAddVisible,
            isModalProductEditVisible,
            product_id,
            product_name,
            product_value,
            order,
            order_cli_name,
            order_cli_email,
            order_paid,
            order_product,
            order_amount,
        }
    },    
    methods: {
        async loadProducts() {
            const result = await productList()
            this.products = result
            this.infoLoadedProduct = true
        },
        async loadOrders() {
            const result = await orderList()
            this.orders = result
            this.infoLoadedOrder = true
        },
        async loadOrder(id) {
            this.showModalOrderDetails()
            const result = await orderDetails(id)
            this.ordersDetails = result          
            this.order_cli_name = this.ordersDetails.clientName
            this.order_cli_email = this.ordersDetails.clientEmail 
            this.order_paid = this.ordersDetails.paid ? 1 : 0
            this.infoLoadedOrderDetails = true            
        },  
        async showProduct(id) {
            const result = await productDetails(id)
            
            this.showModalProductEdit()                        
            this.product_id = id
            this.product_name = result['productName']
            this.product_value = result['value']            
        },
        async saveProduct() {
            if (this.product_name == '' || this.product_name == null) {
                Toast().fire({icon:'warning', title:'Enter the product name!'})
                return
            }
            if (this.product_value == '' || this.product_value == null || this.validValue(this.product_value)) {
                Toast().fire({icon:'warning', title:'Enter the product value!'})
                return
            }

            if (this.product_id != '' && this.product_id != null) {
                const result = await productEdit({
                    'id': this.product_id,
                    'productName': this.product_name,
                    'value': this.product_value.replace(',', '.'),
                })
                
                if (result.message.indexOf('success') != -1) {
                    Toast().fire({icon:'success', title:'Updated product!'})
                    this.loadProducts()
                } else {
                    Toast().fire({icon:'error', title:'Error when update product!'})
                }
                this.isModalProductEditVisible = false
            } else {
                const result = await productAdd({
                    'productName': this.product_name,
                    'value': this.product_value.replace(',', '.'),
                })
                
                if (result.message.indexOf('success') != -1) {
                    Toast().fire({icon:'success', title:'Registered product!'})
                    this.loadProducts()
                } else {
                    Toast().fire({icon:'error', title:'Error when registering product!'})
                }
                this.isModalProductAddVisible = false
            }                        
        },
        async saveOrder() {
            if (this.order == 0) {
                if (this.order_cli_name == '' || this.order_cli_name == null) {
                    Toast().fire({icon:'warning', title:'Enter the client name!'})
                    return
                }
                if (this.order_cli_email == '' || this.order_cli_email == null) {
                    Toast().fire({icon:'warning', title:'Enter the client email!'})
                    return
                }
            }
            if (this.order_product == null || this.order_product < 1) {
                Toast().fire({icon:'warning', title:'Enter the product!'})
                return
            }
            if (this.order_amount == null || this.order_amount < 1) {
                Toast().fire({icon:'warning', title:'Enter the amount!'})
                return
            }
            const result = await orderAdd({
                'orderId': this.order,
                'clientName': this.order_cli_name,
                'clientEmail': this.order_cli_email,                
                'paid': this.order_paid == 1 ? true : false,
                'productId': this.order_product,
                'amount': this.order_amount,                
            })            
            if (result.message.indexOf('success') != -1) {
                Toast().fire({icon:'success', title:'Registered order!'})
                this.loadOrders()
            } else {
                Toast().fire({icon:'error', title:'Error when registering order!'})
            }
            this.isModalOrderAddVisible = false
        },
        async editOrder(id) {
            if (this.order_cli_name == '' || this.order_cli_name == null) {
                Toast().fire({icon:'warning', title:'Enter the client name!'})
                return
            }
            if (this.order_cli_email == '' || this.order_cli_email == null) {
                Toast().fire({icon:'warning', title:'Enter the client email!'})
                return
            }                        
            const result = await orderEdit({
                'id': id,
                'clientName': this.order_cli_name,
                'clientEmail': this.order_cli_email,
                'creationDate': (new Date()).toISOString(),
                'paid': this.order_paid == 1 ? true : false             
            })            
            if (result.message.indexOf('success') != -1) {
                Toast().fire({icon:'success', title:'Updated order!'})
                this.loadOrders()
            } else {
                Toast().fire({icon:'error', title:'Error when registering order!'})
            }
            this.isModalOrderDetailsVisible = false
        },
        async deleteProduct(id) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await productDelete(id)
                    this.loadProducts()
                    Toast().fire({icon:'success', title:'Product deleted!'})
                }
            });                     
        },
        async deleteOrder(id) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await orderDelete(id)
                    Toast().fire({icon:'success', title:'Order deleted!'})
                    this.loadOrders()
                }
            });                     
        },
        validValue(value) {
            const regex = /^\d+(\.\d{1,2})?$/;            
            if (regex.test(value)) {
                return false
            }
            return true
        },
        showModalOrderDetails() {
            this.isModalOrderDetailsVisible = !this.isModalOrderDetailsVisible
        },
        showModalProductAdd() {
            this.isModalProductAddVisible = !this.isModalProductAddVisible
            this.product_name = ''
            this.product_value = ''
        },
        showModalProductEdit() {
            this.isModalProductEditVisible = !this.isModalProductEditVisible
            this.product_id = ''
            this.product_name = ''
            this.product_value = ''
        },
        showModalOrderAdd() {
            this.isModalOrderAddVisible = !this.isModalOrderAddVisible
            this.order = 0
            this.order_cli_name = ''
            this.order_cli_email = ''
            this.order_paid = 0
            this.order_product = 0
            this.order_amount = 0
        },
    },
    beforeMount() {
        this.loadProducts()
        this.loadOrders()
    },
    components: { Spinner, Modal }
})
</script>
  