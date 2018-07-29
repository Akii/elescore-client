<template>
  <div class="text-center">
    <div :class="[{'grade--small': small}, classes]">{{ grade }}</div>
  </div>
</template>
<script>
export default {
  name: 'FacilityGrade',
  props: {
    'downtime': { type: Number, required: true },
    'small': { type: Boolean, default: false }
  },
  computed: {
    classes () {
      let gradeClass = 'grade--' + this.grade
      return ['rounded-circle', 'grade', gradeClass]
    },
    grade () {
      let daysDown = this.downtime / 1440

      if (daysDown < 1) {
        return 1
      }

      if (daysDown <= 1.5) {
        return 2
      }

      if (daysDown <= 2.5) {
        return 3
      }

      if (daysDown <= 4) {
        return 4
      }

      if (daysDown <= 5) {
        return 5
      }

      return 6
    }
  }
}
</script>
<style scoped>
.grade {
  margin: 25px auto;
  width: 100px;
  height: 100px;
  padding-top: 12px;
  font-size: 50px;
  border: 1px solid black;
}

.grade--small {
  margin: 0;
  width: 24px;
  height: 24px;
  padding-top: 0;
  font-size: 14px;
  font-weight: bold;
}

.grade--1 {
  background:green;
  color: white;
}

.grade--2 {
  background: lightgreen;
  color: black;
}

.grade--3 {
  background: yellow;
  color: black;
}

.grade--4 {
  background: #ffc107;
  color: black;
}

.grade--5 {
  background: crimson;
  color: white;
}

.grade--6 {
  background: red;
  color: white;
}
</style>