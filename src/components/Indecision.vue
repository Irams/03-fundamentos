<template>
    <img v-if="img" :src="img" alt="bg">
    <div class="bg-dark"></div>
    <div class="indecision-container">
        <input type="text"
               v-model="question"
               >
        <p>Recuerda terminar con un signo de interrogación (?)</p>

        <div v-if="validQuestion">
            <h2>{{question}}</h2>
            <h1 >{{answer}}</h1>
        </div>
    </div>
  
</template>

<script>
export default {
    data(){
       return{
           question: null,
           answer: null,
           img: null,
           validQuestion: false,
           translateAnswer: null
       } 
    },
    methods: {
        async getAnswer(){
            this.answer = 'Pensando...'

            const {answer, image} = await fetch('https://yesno.wtf/api').then(resp => resp.json())
 
            this.answer = answer === 'yes' ? 'Si!' : 'No!'
            this.img = image
        },
    },
    watch: {
        question(value, oldValue){

            this.validQuestion = false

            if(!value.includes('?')) return

            this.validQuestion = true
            
            //TODO: realizar peticion http
            this.getAnswer()

        }
    }
}
</script>

//el scope aplica estos estilos solo a este componente
<style scoped>

    img, .bg-dark {
        height: 100vh;
        left: 0px;
        max-height: 100%;
        max-width: 100%;
        position: fixed;
        top: 0px;
        width: 100vw;
    }

    .bg-dark {
        background-color: rgba(0, 0, 0, 0.4);
    }

    .indecision-container {
        position: relative;
        z-index: 99;
    }
    
    input {
        width: 250px;
        padding: 10px 15px;
        border-radius: 5px;
        border: none;
    }
    input:focus {
        outline: none;
    }

    p {
        color: white;
        font-size: 20px;
        margin-top: 15px;
    }

    h1, h2 {
        color: white;
    }
    
    h2 {
        margin-top: 150px;
    }

</style>