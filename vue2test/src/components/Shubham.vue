<template>
  <div>
    <h1>{{msg}}</h1>
    <h2>Today's Date : {{myDate | changeDate }}</h2>
    <input v-model="FirstName" placeholder="FirstName" />
    <input v-model="Lastname" placeholder="Lastname" />
    <input v-model="Age" placeholder="Age" />
    <button @click="addElement()">Add</button>
    <button @click="saveAllData()">Save All</button>
    <p>
      <b>Browser Support: {{ message }}</b>
    </p>
    <table style="width:100%; border-width: 5px;">
      <tr>
        <th>FirstName</th>
        <th>Lastname</th>
        <th>Age</th>
      </tr>
      <tr style="border-style: dotted;border-width: 5px;" v-for="(a,index) in arr" :key="a.count">
        <td id="fname">{{a.FirstName }}</td>
        <td id="lname">{{a.Lastname }}</td>
        <td id="age">{{a.Age}}</td>
        <td>
          <input type="submit" @click="saveData(index)" value="Save" />
          <input type="submit" @click="deleteData(index)" value="Delete" />
        </td>
      </tr>
      <p>Registered Users</p>
      <tr>
        <th>FirstName</th>
        <th>Lastname</th>
        <th>Age</th>
      </tr>
      <tr v-for="a in empList" :key="a.count">
        <td id="fname">{{a.FirstName }}</td>
        <td id="lname">{{a.Lastname }}</td>
        <td id="age">{{a.Age}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
//import {mixindemo} from '@/mixins/mixindemo'
export default {
  //mixins : [mixindemo]
  data() {
    return {
      myDate: new Date().toISOString().slice(0, 10),
      message: "",
      FirstName: "",
      Lastname: "",
      Age: "",
      count: 0,
      arr: [],
      db: null,
      ready: false,
      employee: [],
      empList: [],
      msg: "Welcome to Employee Portal",
      url: null
    };
  },
  async created() {
    this.isSupport();
    await this.addAllData();
    this.db = await this.getDb();
    this.employee = await this.getEmp();
    this.ready = true;
  },
  methods: {
    async getEmp() {
      return new Promise((resolve, reject) => {
        let trans = this.db.transaction(["employee"], "readonly");
        trans.oncomplete = e => {
          resolve(employee);
        };

        let store = trans.objectStore("employee");
        let employee = [];

        store.openCursor().onsuccess = e => {
          let cursor = e.target.result;
          if (cursor) {
            employee.push(cursor.value);
            cursor.continue();
          }
        };
      });
    },
    async getDb() {
      return new Promise((resolve, reject) => {
        let request = window.indexedDB.open("Amiti", 1);

        request.onerror = e => {
          console.log("Error opening db", e);
          reject("Error");
        };

        request.onsuccess = e => {
          resolve(e.target.result);
        };

        request.onupgradeneeded = e => {
          console.log("onupgradeneeded");
          let db = e.target.result;
          let objectStore = db.createObjectStore("employee", {
            autoIncrement: true,
            keyPath: "id"
          });
        };
      });
    },
    addElement() {
      this.arr.push({
        count: this.count++,
        FirstName: this.FirstName,
        Lastname: this.Lastname,
        Age: this.Age
      });
      this.FirstName = "";
      this.Lastname = "";
      this.Age = "";
      return this.arr;
    },
    saveData(index) {
      const data = {
        count: this.count,
        FirstName: this.FirstName,
        Lastname: this.Lastname,
        Age: this.Age
      };
      axios
        .post("https://amiti-2407e.firebaseio.com/users.json", this.arr[index])
        .then(res => console.log(res))
        .catch(error => console.log(error));
    },
    saveAllData() {
      for (let index in this.arr) {
        axios
          .post(
            "https://amiti-2407e.firebaseio.com/users.json",
            this.arr[index]
          )
          .then(res => console.log(res))
          .catch(error => console.log(error));
      }
    },
    async addAllData() {
      axios.get("https://amiti-2407e.firebaseio.com/users.json").then(res => {
        const data = res.data;
        console.log(data);
        for (let key in data) {
          const emp = data[key];
          const e = {
            count: emp.count,
            FirstName: emp.FirstName,
            Lastname: emp.Lastname,
            Age: emp.Age
          };
          console.log("Employee: " + e);
          this.empList.push(e);
          this.addEmpToDB(emp);
        }
      });
    },
    async getAllData() {
      for(let i in this.empList){
        console.log("DATA "+i);
      }
    },
    async addEmpToDB(emp) {
      return new Promise((resolve, reject) => {
        let trans = this.db.transaction(["employee"], "readwrite");
        trans.oncomplete = e => {
          console.log(e);
          resolve();
        };
        let store = trans.objectStore("employee");
        store.add(emp);
      });
    },
    deleteData(index) {
      this.arr.splice(index, 1);
    },
    isSupport() {
      let o =
        window.indexedDB ||
        window.mozIndexedDB ||
        window.webkitIndexedDB ||
        window.msIndexedDB;

      if (!o) {
        console.log("Your Browser does not support IndexedDB");
        this.message = "Your Browser does not support IndexedDB";
      } else {
        console.log("Supports");
        this.message = "Your Browser does support IndexedDB";
      }
    }
  }
};
</script>
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #4244b9;
}
#fname {
  color: #4244b9;
}
#lname {
  color: #72b942;
}
#age {
  color: #fa0303;
}
</style>
