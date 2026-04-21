<template>
  <div class="order-management">
    <h1>Order Management</h1>
    
    <div class="filters">
      <select v-model="statusFilter" @change="filterOrders">
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="processing">Processing</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>

    <table class="order-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Items</th>
          <th>Total</th>
          <th>Status</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in filteredOrders" :key="order.orderId">
          <td>{{ order.orderId }}</td>
          <td>{{ order.customer?.name || order.customerName }}</td>
          <td>{{ order.items?.length || 0 }} items</td>
          <td>${{ (order.total || 0).toFixed(2) }}</td>
          <td>
            <span :class="'status-' + order.status">
              {{ order.status }}
            </span>
          </td>
          <td>{{ new Date(order.createdAt).toLocaleDateString() }}</td>
          <td>
            <button @click="viewOrder(order)" class="view-btn">View</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'OrderList',
  data() {
    return {
      orders: [],
      statusFilter: ''
    }
  },
  computed: {
    filteredOrders() {
      if (!this.statusFilter) return this.orders
      return this.orders.filter(o => o.status === this.statusFilter)
    }
  },
  mounted() {
    this.fetchOrders()
  },
  methods: {
    fetchOrders() {
      fetch('/orders')
        .then(response => response.json())
        .then(data => {
          this.orders = data.orders || []
        })
        .catch(error => console.error('Error fetching orders:', error))
    },
    viewOrder(order) {
      this.$router.push(`/order/${order.orderId}`)
    },
    filterOrders() {
      // Computed property handles filtering
    }
  }
}
</script>

<style scoped>
.order-management {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.filters {
  margin-bottom: 20px;
}

.filters select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.order-table {
  width: 100%;
  border-collapse: collapse;
}

.order-table th, .order-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.order-table th {
  background-color: #0046be;
  color: white;
}

.status-pending { color: orange; font-weight: bold; }
.status-processing { color: blue; font-weight: bold; }
.status-completed { color: green; font-weight: bold; }
.status-cancelled { color: red; font-weight: bold; }

.view-btn {
  background-color: #0046be;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
</style>