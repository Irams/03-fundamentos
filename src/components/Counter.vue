<template>
    <h2>{{customTitle}}</h2>
    <p>{{counter}} <sup>2</sup> = {{squareCounter}}</p> 
 <div>
   <!-- <button v-on:click="increase">+1</button> -->
   <button @click="increase">+1</button>
   <!-- <button v-on:click="decrease">-1</button> -->
   <button @click="decrease">-1</button>
 </div>
</template>

<script>
export default {
  props: {
    title: String,
    start: {
      default: 10,
      type: Number,
      // require: true,
      validator (value){
        return value >= 0
      }
    }
  },
  //name: 'Patito'
  data(){
    return{
      counter: this.start
    }
  },
  methods: {
    getSquareValue(){
      // console.log('getSquareValue');
      return this.counter * this.counter
    },
    increase(){
      // console.log('increase');
      this.counter++
    },
    decrease(){
      // console.log('decrease');
      this.counter--
    }
  },
  computed: {
    squareCounter() {
      // console.log('computed squareCouter');
      return this.counter * this.counter
    },
    customTitle(){
      // Primera opción (if):
      // if (this.title === undefined){
      //   return 'Counter'
      // }else{
      //   return this.title
      // }

      // Segunda opción (ternario):
      // return this.title ? this.title : 'Counter'

      // Tercera opción:
      return this.title || 'Counter'
    }
  }
  

}

</script>

<style>

button{
  background-color: #64bb87;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  margin: 0 5px;
  padding: 5px 15px;
  transition: 03s ease-in-out;
}

button:hover{
  background-color: #5aa67b;
  transition: 0.3s ease-in-out;
}

</style>