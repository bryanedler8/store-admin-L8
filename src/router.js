import { createWebHistory, createRouter } from "vue-router";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import OrderList from "./components/OrderList";
import OrderDetail from "./components/OrderDetail";

const routes = [
  { path: "/", redirect: "/products" },
  { path: "/products", component: ProductList },
  { path: "/product/:id", component: ProductForm },
  { path: "/orders", component: OrderList },
  { path: "/order/:id", component: OrderDetail },
  { path: "/inventory", component: ProductList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;