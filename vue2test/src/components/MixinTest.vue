<template>
    <div>
        <h1>{{msg }}</h1>
        <table style="width:100%">
  <tr>
    <th>FirstName</th>
    <th>Lastname</th> 
    <th>Age</th>
  </tr>
  <tr v-for="(a,index) in arr" :key="a.count">
    <td id="fname">{{a.FirstName | toUpperCase}}</td>
    <td id="lname">{{a.Lastname | toUpperCase}}</td> 
    <td id="age">{{a.Age}}</td>
    
    <td><input type="submit" @click="deleteData(index)" value="Delete"/></td>
  </tr>
</table>
    </div>
        
</template>
    <script>
    import {mixindemo} from '@/mixins/mixindemo'
    export default {
        mixins : [mixindemo]
    }
    </script>
    <style scoped>
h1, h2 {
  font-weight: normal;
}
</style>