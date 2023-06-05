<template>
    <div class="flex-horizontal">
        <div class="flex-vertical">
            <img src="../assets/logo.png" alt="logo" width="150" height="150">
            <p v-if="loginState === 'error'" style="color: red">Nom d'utilisateur ou mot de passe incorrect</p>
            <form>
                <div class="form-group">
                    <label for="username">Nom d'utilisateur</label>
                    <input type="email" v-model="username" class="form-control" id="username" placeholder="Email" required>
                </div>
                <div class="form-group">
                    <label for="password">Mot de passe</label>
                    <input type="password" v-model="password" class="form-control" id="password" placeholder="Mot de passe" required>
                </div>
                <button :disabled="loginState === 'loading'" type="submit" class="btn btn-primary" v-on:click="login">Se connecter</button>
            </form>
        </div>
        <div class="v-line"></div>
        <div class="flex-vertical back-image">
            <div class="flex-vertical back-transparency">
                <img src="../assets/Datanav_Texte.png" alt="logo" width="50%">
                <div class="h-line"></div>
                <p><strong>NAVIGUEZ FACILEMENT DANS<br> LES MEANDRES DE VOTRE DATACENTER</strong></p>
                <p>- Votre guide d'orientation fiable et intuitif</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoginView',
    data() {
        return {
            username: '',
            password: ''
        }
    },
    props: {
        loginState: {
            type: String,
            required: true,
            validator: function (value) {
                return ['not logged in', 'loading', 'logged in', 'error'].indexOf(value) !== -1
            }
        }
    },
    methods: {
        login() {
            this.$emit('login', {username: this.username, password: this.password});
        }
    }
}
</script>

<style scoped>
.flex-vertical {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
.flex-horizontal {
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 85%;
    height: 85%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #F0F0F0;
}
.back-image {
    background-image: url('../assets/background.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #F0F0F0;
}
.back-transparency {
    background-color: rgba(255, 255, 255, 0.85);
    width: 100%;
    height: 100%;
}
.form-group {
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.v-line {
    width: 1px;
    height: 100%;
    background-color: #0390BF;
}
.h-line {
    width: 70%;
    height: 1px;
    background-color: #000000;
    margin-top: 20px;
    margin-bottom: 10px;
}
button {
    padding: 10px 25px;
    font-size: 24px;
    color: #FFFFFF;
    background-color: #0390BF;
    border: none;
    cursor: pointer;
}
button:hover {
    background-color: #036E8C;
}
button:disabled {
    background-color: #BFBFBF;
    cursor: not-allowed;
}
.form-group,button {
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
</style>