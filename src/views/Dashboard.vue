<template>    
    <div class="mt-2 w-full">
        <div class="grid grid-cols-2 gap-4">
            <div>
                <div class="bg-white border-2 rounded-xl border-gray px-5 py-5 mt-2">              
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
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in products">
                                <td class="px-5 py-4 text-sm bg-white border-b border-gray-200">
                                    <p class="text-gray-900 whitespace-nowrap">{{ item.Id }}</p>
                                </td>
                                <td class="px-5 py-4 text-sm bg-white border-b border-gray-200">
                                    <p class="text-gray-900 whitespace-nowrap">{{ item.ProductName }}</p>
                                </td>                                
                                <td class="px-5 py-4 text-sm bg-white border-b border-gray-200">
                                    <p class="text-gray-900 whitespace-nowrap"><b>R$ {{ item.Value.toFixed(2) }}</b></p>
                                </td>                                                               
                            </tr>
                        </tbody>
                    </table>                                                     
                </div>
            </div>
            
            <div>
                <div class="bg-white border-2 rounded-xl border-gray px-5 py-5 mt-2">              
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
                                    <p class="text-gray-900 whitespace-nowrap">{{ item.Id }}</p>
                                </td>
                                <td class="px-5 py-4 text-sm bg-white border-b border-gray-200">
                                    <p class="text-gray-900 whitespace-nowrap">{{ item.ClientName }}</p>
                                </td>                                
                                <td class="px-5 py-4 text-sm bg-white border-b border-gray-200">
                                    <p class="text-gray-900 whitespace-nowrap text-center">
                                        <span v-if="item.Paid" ><font-awesome-icon class="fa-xl" :icon="['fas', 'thumbs-up']" /></span>    
                                        <span v-else><font-awesome-icon class="fa-xl" :icon="['fas', 'thumbs-down']" /></span>
                                    </p>
                                </td>                                                           
                                <td class="px-5 py-4 text-sm text-center bg-white border-b border-gray-200">
                                    <div class="sm:inline-block">                                        
                                        <button v-on:click="loadOrder(item.Id)" title="View order" class="bg-gray-900 text-white rounded p-2 ps-3 pe-3 me-2 w-10">
                                            <font-awesome-icon :icon="['fas', 'eye']" />
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
                            v-model="add_product_name" />
                    </label>    
                    <label class="block mt-2">
                        <span class="text-sm text-gray-700">Product value <span class="text-red-500 font-semibold">*</span></span>
                        <input type="text" class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
                            v-model="add_product_value" />
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
                        <select v-model="add_order" class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full">
                            <option value="0">Create new</option>    
                            <option v-for="item in orders" v-bind:value="item.Id">{{ item.ClientName }}</option>                        
                        </select>
                    </label>  
                    <div v-if="add_order == 0" class="">
                        <label class="block mt-2">
                            <span class="text-sm text-gray-700">Client name <span class="text-red-500 font-semibold">*</span></span>
                            <input type="text" class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
                                v-model="add_order_cli_name" />
                        </label>   
                        <label class="block mt-2">
                            <span class="text-sm text-gray-700">Client email <span class="text-red-500 font-semibold">*</span></span>
                            <input type="email" class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
                                v-model="add_order_cli_email" />
                        </label>    
                    </div>     
                    <label class="block mt-2">
                        <span class="text-sm text-gray-700">Product <span class="text-red-500 font-semibold">*</span></span>
                        <select v-model="add_order_product" class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full">                            
                            <option value="0">Select the product</option>   
                            <option v-for="item in products" v-bind:value="item.Id">{{ item.ProductName }}</option>                        
                        </select>
                    </label>       
                    <label class="block mt-2">
                        <span class="text-sm text-gray-700">Payment status <span class="text-red-500 font-semibold">*</span></span>
                        <select v-model="add_order_paid" class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full">
                            <option value="0">Not paid</option>    
                            <option value="1">Paid</option>                        
                        </select>
                    </label> 
                    <label class="block mt-2">
                        <span class="text-sm text-gray-700">Amount <span class="text-red-500 font-semibold">*</span></span>
                        <input type="number" class="block w-full mt-1 border-gray-300 rounded-md focus:border-gray-800 focus:ring focus:ring-opacity-40 focus:ring-gray-800"
                            v-model="add_order_amount" />
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
                    <p class="mb-2"><b>Order ID:</b> {{ ordersDetails.Id }}</p>
                    <hr>
                    <p class="mt-2 mb-2"><b>Client name:</b> {{ ordersDetails.ClientName }}</p>
                    <hr>
                    <p class="mt-2 mb-2"><b>Client email:</b> {{ ordersDetails.ClientEmail }}</p>
                    <hr>
                    <p class="mt-2 mb-2"><b>Paid:</b> &nbsp;
                        <span v-if="ordersDetails.Paid" ><font-awesome-icon class="fa-xl" :icon="['fas', 'thumbs-up']" /></span>    
                        <span v-else><font-awesome-icon class="fa-xl" :icon="['fas', 'thumbs-down']" /></span>
                    </p>
                    <hr>
                    <p class="mt-2 mb-2"><b>Total value:</b> R$ {{ ordersDetails.TotalValue.toFixed(2) }}</p>
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
                        <tr v-for="item in ordersDetails.ItemsOrder">
                            <td class="px-5 py-4 text-sm bg-white border-b border-gray-200">
                                <p class="text-gray-900 text-center whitespace-nowrap">{{ item.ProductId }}</p>
                            </td>
                            <td class="px-5 py-4 text-sm bg-white border-b border-gray-200">
                                <p class="text-gray-900 whitespace-nowrap">{{ item.ProductName }}</p>
                            </td>                                
                            <td class="px-5 py-4 text-sm bg-white border-b border-gray-200">
                                <p class="text-gray-900 text-center whitespace-nowrap">R$ {{ item.UnitValue.toFixed(2) }}</p>
                            </td>  
                            <td class="px-5 py-4 text-sm bg-white border-b border-gray-200">
                                <p class="text-gray-900 text-center whitespace-nowrap">{{ item.Amount }}</p>
                            </td>                                                         
                        </tr>
                    </tbody>
                </table>      
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
import { productAdd, productList } from "../hooks/useProduct"
import { orderAdd, orderDetails, orderList } from "../hooks/useOrder"
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
        const add_product_name = ref("")
        const add_product_value = ref("")
        const add_order = ref(0)
        const add_order_cli_name = ref("")
        const add_order_cli_email = ref("")      
        const add_order_paid = ref(0)
        const add_order_product = ref(0)
        const add_order_amount = ref(0)  

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
            add_product_name,
            add_product_value,
            add_order,
            add_order_cli_name,
            add_order_cli_email,
            add_order_paid,
            add_order_product,
            add_order_amount,
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
            this.ordersDetails = result[0]            
            this.infoLoadedOrderDetails = true            
        },  
        async saveProduct() {
            if (this.add_product_name == '' || this.add_product_name == null) {
                Toast().fire({icon:'warning', title:'Enter the product name!'})
                return
            }
            if (this.add_product_value == '' || this.add_product_value == null) {
                Toast().fire({icon:'warning', title:'Enter the product value!'})
                return
            }
            const result = await productAdd({
                'ProductName': this.add_product_name,
                'Value': this.add_product_value.replace(',', '.'),
            })
            
            if (result.status == 'success') {
                Toast().fire({icon:'success', title:'Registered product!'})
                this.loadProducts()
            } else {
                Toast().fire({icon:'error', title:'Error when registering product!'})
            }
            this.isModalProductAddVisible = false
        },
        async saveOrder() {
            if (this.add_order == 0) {
                if (this.add_order_cli_name == '' || this.add_order_cli_name == null) {
                    Toast().fire({icon:'warning', title:'Enter the client name!'})
                    return
                }
                if (this.add_order_cli_email == '' || this.add_order_cli_email == null) {
                    Toast().fire({icon:'warning', title:'Enter the client email!'})
                    return
                }
            }
            if (this.add_order_product == null || this.add_order_product < 1) {
                Toast().fire({icon:'warning', title:'Enter the product!'})
                return
            }
            if (this.add_order_amount == null || this.add_order_amount < 1) {
                Toast().fire({icon:'warning', title:'Enter the amount!'})
                return
            }
            const result = await orderAdd({
                'OrderId': this.add_order,
                'ClientName': this.add_order_cli_name,
                'ClientEmail': this.add_order_cli_email,                
                'Paid': this.add_order_paid,
                'ProductId': this.add_order_product,
                'Amount': this.add_order_amount
            })
            if (result.status == 'success') {
                Toast().fire({icon:'success', title:'Registered order!'})
                this.loadOrders()
            } else {
                Toast().fire({icon:'error', title:'Error when registering order!'})
            }
            this.isModalOrderAddVisible = false
        },
        showModalOrderDetails() {
            this.isModalOrderDetailsVisible = !this.isModalOrderDetailsVisible
        },
        showModalProductAdd() {
            this.isModalProductAddVisible = !this.isModalProductAddVisible
            this.add_product_name = ''
            this.add_product_value = ''
        },
        showModalOrderAdd() {
            this.isModalOrderAddVisible = !this.isModalOrderAddVisible
            this.add_order = 0
            this.add_order_cli_name = ''
            this.add_order_cli_email = ''
            this.add_order_paid = 0
            this.add_order_product = 0
            this.add_order_amount = 0
        },
    },
    beforeMount() {
        this.loadProducts()
        this.loadOrders()
    },
    components: { Spinner, Modal }
})
</script>
  