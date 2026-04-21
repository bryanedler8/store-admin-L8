<template>
  <div class="product-management">
    <h1>Product Management</h1>
    <button @click="addProduct" class="add-btn">+ Add New Product</button>
    
    <div class="filters">
      <input v-model="searchTerm" placeholder="Search products..." @input="filterProducts">
      <select v-model="categoryFilter" @change="filterProducts">
        <option value="">All Categories</option>
        <option value="Laptops">Laptops</option>
        <option value="Smartphones">Smartphones</option>
        <option value="Audio">Audio</option>
        <option value="Gaming">Gaming</option>
        <option value="TVs">TVs</option>
      </select>
    </div>

    <table class="product-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Name</th>
          <th>Brand</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Rating</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in filteredProducts" :key="product.id">
          <td>{{ product.id }}</td>
          <td><img :src="product.image_url" :alt="product.name" width="50"></td>
          <td>{{ product.name }}</td>
          <td>{{ product.brand }}</td>
          <td>{{ product.category }}</td>
          <td>${{ product.price.toFixed(2) }}</td>
          <td :class="{ 'low-stock': product.quantity_available < 10 }">
            {{ product.quantity_available }}
          </td>
          <td>⭐ {{ product.rating }}</td>
          <td>
            <button @click="editProduct(product)" class="edit-btn">Edit</button>
            <button @click="deleteProduct(product)" class="delete-btn">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  data() {
    return {
      products: [],
      searchTerm: '',
      categoryFilter: ''
    }
  },
  computed: {
    filteredProducts() {
      let filtered = this.products
      if (this.searchTerm) {
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          p.brand.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      }
      if (this.categoryFilter) {
        filtered = filtered.filter(p => p.category === this.categoryFilter)
      }
      return filtered
    }
  },
  mounted() {
    this.fetchProducts()
  },
  methods: {
    fetchProducts() {
      fetch('/products')
        .then(response => response.json())
        .then(data => {
          this.products = data
        })
        .catch(error => console.error('Error fetching products:', error))
    },
    addProduct() {
      this.$router.push('/product/new')
    },
    editProduct(product) {
      this.$router.push(`/product/${product.id}`)
    },
    deleteProduct(product) {
      if (confirm(`Delete ${product.name}?`)) {
        fetch(`/products/${product.id}`, { method: 'DELETE' })
          .then(() => {
            this.fetchProducts()
            alert('Product deleted successfully')
          })
          .catch(error => console.error('Error deleting product:', error))
      }
    },
    filterProducts() {
      // Computed property handles filtering
    }
  }
}
</script>

<style scoped>
.product-management {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.add-btn {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.filters input, .filters select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  flex: 1;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
}

.product-table th, .product-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.product-table th {
  background-color: #0046be;
  color: white;
}

.low-stock {
  color: red;
  font-weight: bold;
}

.edit-btn {
  background-color: #ffc107;
  color: #000;
  margin-right: 5px;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.edit-btn, .delete-btn {
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
</style>