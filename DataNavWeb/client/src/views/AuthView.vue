<template>
  <div class="flexVertical">
    <div class="flexHorizontal">

      <br>

      <img src="../assets/logo.png" alt="logo" width="150" height="150">

      <form>
        <div class="formGroup">
          <label for="numServer">Numéro de la baie du serveur</label>
          <input type="text" v-model="numServer" class="formControl" id="numServer" placeholder="Baie n°00139731...">
        </div>

        <div class="formGroup">
          <label for="serverRoad">Allée du serveur</label>
          <input type="text" v-model="serverRoad" class="formControl" id="serverRoad" placeholder="Allée Gutenberg">
        </div>

        <button type="submit" class="btn btn-primary" v-on:click="codeGeneration">Générer un code</button>
      </form>

      <div class="formGroup">
          <label for="serverRoad">Code d'accès</label>
          <input type="text" v-model="token" class="formControl" id="token" placeholder="Token">
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.flexVertical{
  display: flex;
  justify-content: center;
}

.flexHorizontal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 95%;
    height: 100%;
    background-color: #F0F0F0;
}

.formGroup {
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
}

button {
    padding: 10px 25px;
    font-size: 24px;
    color: #FFFFFF;
    background-color: #0390BF;
    border: none;
    border-radius: 2px;
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
p {
    color : #0390BF;
}

.formControl{
  border : solid 3px #D9D9D9;
  height : 40px;
  border-radius: 2px;
}

</style>
