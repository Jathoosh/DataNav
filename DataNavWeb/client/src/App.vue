<template>
  <div>
    <RouterView
      @login="login"
      @codeGeneration="codeGeneration"
      :username="username"
      :company="company"
      :loginState="loginState"
      :codeState="codeState"
      :token="token"
    />
  </div>
</template>

<script>
import loginFunc from '../api/login.js'
import codeGenerator from '../api/codeGenerator.js'

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      username: '',
      company: '',
      loginState: "not logged in",
      codeState: "no code",
      token: "code d'authentification"
    }
  },
  methods: {
    async login(data) {
      this.loginState = "loading";
      const res = await loginFunc(data);
      if (res.status === 200) {
        this.username = res.data.username;
        this.company = res.data.company;
        this.loginState = "logged in";
        this.$router.push('/auth-code');
      }
      else {
        this.loginState = "error";
        setTimeout(() => {
          this.loginState = "not logged in";
        }, 3000);
      }
    },
    async codeGeneration(data) {
      this.codeState = "loading";
      const res = await codeGenerator(data);
      if (res.status === 200) {
        this.token = res.data.token;
        this.codeState = "Code Obtained";
      }
      else {
        this.codeState = "error";
        setTimeout(() => {
          this.codeState = "no code";
        }, 3000);
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Cera Pro, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
html{
  height: 100%;
}
body{
  height: 100%;
  margin:0px;
}
</style>
