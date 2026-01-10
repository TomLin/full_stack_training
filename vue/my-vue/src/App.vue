<script setup>
import { RouterLink, RouterView } from 'vue-router' // 這樣下面 template 才能用 <RouterLink> 和 <RouterView>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/routerParams">TestView</RouterLink>
        <!-- 下面的動態參數 123，就會被傳遞到 TestWithIdView 去使用-->
        <!-- to 前面沒有冒號，表示傳遞的是url字串 -->
        <RouterLink to="/routerParams/123">TestView with ID</RouterLink>
        <!-- 下面的參數，就會被傳遞到 RouterQueryView 去使用-->
        <!-- :to 前面多了冒號後，表示傳遞的是一個物件 -->
        <RouterLink :to="{ name: 'routerQueryName', query: { keyword: 'switch', page: 5 } }"
          >Router Query</RouterLink
        >
        <RouterLink :to="{ name: 'nestedRoutes' }">Nested Routes</RouterLink>
        <RouterLink :to="{ name: 'lifeCycle' }">Life Cycle</RouterLink>
        <RouterLink :to="{ name: 'reactiveVariable' }">Reactive Variable</RouterLink>
        <RouterLink to="/bindExample">Bind Example</RouterLink>
        <RouterLink to="/ifExample">If Example</RouterLink>
        <RouterLink to="/forExample">For Example</RouterLink>
        <RouterLink to="/eventExample">Event Example</RouterLink>
        <RouterLink to="/computedExample">Computed Example</RouterLink>
        <RouterLink to="/watchExample">Watch Example</RouterLink>
        <RouterLink to="/componentExample">Component Example</RouterLink>
        <RouterLink to="/envExample">Env Example</RouterLink>
        <RouterLink to="/piniaExample">Pinia Example</RouterLink>
        <RouterLink to="/axiosExample">Axios Example</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
