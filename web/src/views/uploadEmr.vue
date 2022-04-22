<template>
  <div class="home">
    <div class="upload-frame">
      <el-upload
        class="upload-demo"
        drag
        action="http://localhost:3000/uploadEmr"
        :data="uploadData"
        multiple  
        :before-upload="check"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传pdf文件，且不超过5MB
        </div>
      </el-upload>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 100%;
  display: flex;

  .upload-frame {
    width: 400px;
    height: 220px;
    margin: auto; 
  }
}
</style>

<script>
// import { create } from 'ipfs-http-client'
export default {
  data() {
    return {
      url: "/1649662777642.pdf",
      allowUpload: false,
      uploadData: {
        uploader: 0,
        owner: 0,
        name: "",
      },
      name: ""
    }
  },

  async created() {
    this.uploadData.owner = localStorage.userId;
    this.uploadData.uploader = localStorage.hospitalId;
    // connect to a different API
    //const client = create("http://127.0.0.1:5001")

    // call Core API methods
    //const { cid } = await client.add('Hello world!')

    //console.log(cid);
  },

  methods: {
    check(file) {
      const typeArray = file.name.split(".");
      if(typeArray[typeArray.length - 1] == "pdf") {
        this.uploadData.name = typeArray[0];
        this.allowUpload = true;
      }
      else {
        this.allowUpload = false;
        this.$message({
          type: "error",
          message: "只能选择pdf文件"
        })
        return this.allowUpload;
      }
      if(this.uploadData.owner == 0) {
        this.$message({
          type: "error",
          message: "请先获取病人身份信息!"
        });
        this.allowUpload = false;
      }
      else {
        this.allowUpload = true;
      }
      return this.allowUpload;
    }
  }
};
</script>
