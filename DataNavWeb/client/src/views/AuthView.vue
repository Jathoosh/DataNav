<template>
  <div class="flexVertical">
    <div class="flexHorizontal">

      <br>

      <img src="../assets/logo.png" alt="logo" width="150" height="150">

      <form>
        <div class="formGroup">
          <label for="numServer">Numéro de la baie du serveur</label>
          <input type="text" v-model="numServer" class="formControl" id="numServer" placeholder="Baie n°XXXXXXX">
        </div>

        <div class="formGroup">
          <label for="serverRoad">Allée du serveur</label>
          <input type="text" v-model="serverRoad" class="formControl" id="serverRoad" placeholder="XXXXXX">
        </div>

        <button type="submit" class="btn btn-primary" :disabled="codeState ==='loading'" v-on:click="codeGeneration">Générer un code</button>
      </form>

      <div class="formGroup">
          <label for="serverRoad">Code d'accès</label>
          <p class="formControl" id="token">{{ token }}</p>
          <p v-if="codeState === 'error'" style="color: red">Erreur lors de la génération du code</p>
      </div>

      <br><br>

    </div>

  </div>
</template>

<script>
export default {
    name: 'AuthView',
    data() {
        return {
          numServer: '',
          serverRoad: ''
        }
    },
    props: {
        loginState: {
            type: String,
            required: true,
            validator: function (value) {
                return ['not logged in', 'loading', 'logged in', 'error'].indexOf(value) !== -1
            }
        },
        token: {
            type: String,
            required: true
        },
        codeState: {
            type: String,
            required: true,
            validator: function (value) {
                return ['no code', 'loading', 'Code Obtained', 'error'].indexOf(value) !== -1
            }
        }
    },
    mounted() {
      if (this.loginState !== 'logged in') {
        this.$router.push('/');
      }
    },
    methods: {
        codeGeneration() {
            this.$emit('codeGeneration', {numServer: this.numServer, serverRoad: this.serverRoad});
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.flexVertical{
  display: flex;
  justify-content: center;
  position: absolute;
  margin: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 85%;
  height: 85%;
}

.flexHorizontal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #F0F0F0;
}

.formGroup {
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

button {
    padding: 10px 25px;
    font-size: 24px;
    color: #FFFFFF;
    background-color: #0390BF;
    border: none;
    border-radius: 2px;
    cursor: pointer;
}
button:hover {
    background-color: #036E8C;
}
button:disabled {
    background-color: #D9D9D9;
    cursor: not-allowed;
}
.formGroup,button {
    margin-top: 30px;
}
label {
    font-size: 16px;
}
input {
    width: 100%;
    font-size: 20px;
}
#token {
    width: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    color: #6f6f6f;
}

p {
    margin: 0;
}

.formControl{
  border : solid 3px #D9D9D9;
  height : 40px;
  border-radius: 2px;
}

</style>
