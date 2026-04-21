<template>
  <div class="product-form">
    <h1>{{ isEdit ? 'Edit Product' : 'Add New Product' }}</h1>
    <form @submit.prevent="saveProduct">
      <div class="form-group">
        <label>Name:</label>
        <input v-model="product.name" required>
      </div>
      <div class="form-group">
        <label>Brand:</label>
        <input v-model="product.brand" required>
      </div>
      <div class="form-group">
        <label>Category:</label>
        <select v-model="product.category" required>
          <option value="Laptops">Laptops</option>
          <option value="Smartphones">Smartphones</option>
          <option value="Audio">Audio</option>
          <option value="Gaming">Gaming</option>
          <option value="TVs">TVs</option>
        </select>
      </div>
      <div class="form-group">
        <label>Price:</label>
        <input type="number" step="0.01" v-model="product.price" required>
      </div>
      <div class="form-group">
        <label>Description:</label>
        <textarea v-model="product.description" rows="4" required></textarea>
      </div>
      <div class="form-group">
        <label>SKU:</label>
        <input v-model="product.sku" required>
      </div>
      <div class="form-group">
        <label>Quantity Available:</label>
        <input type="number" v-model="product.quantity_available" required>
      </div>
      <div class="form-group">
        <label>Image URL:</label>
        <input v-model="product.image_url" required>
      </div>
      <div class="form-group">
        <label>Rating:</label>
        <input type="number" step="0.1" min="0" max="5" v-model="product.rating">
      </div>
      <div class="form-group">
        <label>Specifications (JSON):</label>
        <textarea v-model="specificationsText" rows="6" placeholder='{"processor": "Intel i7", "ram": "16GB"}'></textarea>
      </div>
      <div class="form-actions">
        <button type="submit" class="save-btn">Save</button>
        <button type="button" @click="cancel" class="cancel-btn">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ProductForm',
  data() {
    return {
      product: {
        id: null,
        name: '',
        brand: '',
        category: '',
        price: 0,
        description: '',
        sku: '',
        quantity_available: 0,
        image_url: '',
        rating: 0,
        specifications: {}
      },
      isEdit: false
    }
  },
  computed: {
    specificationsText: {
      get() {
        return JSON.stringify(this.product.specifications, null, 2)
      },
      set(value) {
        try {
          this.product.specifications = JSON.parse(value)
        } catch(e) {
          // Invalid JSON, ignore
        }
      }
    }
  },
  mounted() {
    const id = this.$route.params.id
    if (id && id !== 'new') {
      this.isEdit = true
      this.fetchProduct(id)
    }
  },
  methods: {
    fetchProduct(id) {
      fetch(`/products/${id}`)
        .then(response => response.json())
        .then(data => {
          this.product = data
        })
        .catch(error => console.error('Error fetching product:', error))
    },
    saveProduct() {
      const url = this.isEdit ? `/products/${this.product.id}` : '/products'
      const method = this.isEdit ? 'PUT' : 'POST'
      
      fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.product)
      })
        .then(response => response.json())
        .then(() => {
          alert(this.isEdit ? 'Product updated!' : 'Product created!')
          this.$router.push('/products')
        })
        .catch(error => console.error('Error saving product:', error))
    },
    cancel() {
      this.$router.push('/products')
    }
  }
}
</script>

<style scoped>
.product-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input, .form-group select, .form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.save-btn {
  background-color: #28a745;
  color: white;
}

.cancel-btn {
  background-color: #6c757d;
  color: white;
}
</style>