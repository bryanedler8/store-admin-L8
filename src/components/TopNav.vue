<template>
  <nav>
    <div class="logo">
      <img src="/best-buy-logo.png" alt="Best Buy Admin">
      <span>Best Buy Admin Portal</span>
    </div>
    <ul>
      <li><router-link to="/">Dashboard</router-link></li>
      <li><router-link to="/products">Products</router-link></li>
      <li><router-link to="/orders">Orders</router-link></li>
      <li><router-link to="/inventory">Inventory</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'TopNav'
}
</script>

<style scoped>
nav {
  background-color: #0046be;
  color: white;
  padding: 15px 30px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo img {
  height: 40px;
}

.logo span {
  font-size: 20px;
  font-weight: bold;
}

nav ul {
  display: flex;
  list-style: none;
  gap: 20px;
  margin: 0;
  padding: 0;
}

nav ul li a {
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

nav ul li a:hover, nav ul li a.router-link-active {
  background-color: #ffd700;
  color: #0046be;
}
</style>