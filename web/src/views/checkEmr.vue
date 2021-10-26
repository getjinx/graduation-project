<template>
  <div class="home">
    <div class="content">
      <img src="../assets/image/emr.png" width="100%">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;

  .content {
    height: 98%;
    width: 98%;
    margin: 0 auto;
    overflow: auto;
  }
}
</style>

<script>
export default {
  data() {
    return {
      hasAuthority: false,
      dialogVisible: false,
    };
  },

  methods: {
    checkEmrId() {
      localStorage.emrId.length == 0 && this.$router.push("/index/getEmr");
    }
  },

  created() {
    this.dialogVisible = true;
    this.checkEmrId();
  },
};
</script>
