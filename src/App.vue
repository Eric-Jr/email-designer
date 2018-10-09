<template>
  <div id="app">
    <main id="email-designer">
      <section>
        <router-view/>
      </section>
      
      <workspace></workspace>
      
    </main>
  </div>
</template>

<script>
import workspace from './components/workspace/work-space.vue'

export default {
  name: 'App',
  components : {
    workspace
  },
  data () {
    return {

    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#email-designer {
  display: flex;
  flex-flow: row wrap;

}

#email-designer > * {
  flex: 1 1 50%;
}
</style>
