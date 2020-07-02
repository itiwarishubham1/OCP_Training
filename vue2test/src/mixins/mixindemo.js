export const mixindemo={
  data () {
    return {
      message:'',
      FirstName:'',
      Lastname:'',
      Age:'',
      count:0,
      arr:[],
      msg: 'Welcome to Employee Portal'
    }
  },
  methods : {
    addElement(){
      this.arr.push({count:this.count++,FirstName:this.FirstName,Lastname:this.Lastname,Age:this.Age});
      console.log(this.arr);
      this.FirstName='';
      this.Lastname='';
      this.Age='';
      console.log(this.msg.toUpperCase());
      return this.arr;

  },
  saveData(){
    alert(this.arr);
  },
  deleteData(index){
    this.arr.splice(index, 1);
  }
},
  filters:{
    toUpperCase(value) {
              return value.toUpperCase();
        }
  }
}