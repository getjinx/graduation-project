<template>
  <div class="home">
    <div class="upload-frame">
      <el-upload
        class="upload-demo"
        drag
        action="http://localhost:3000/uploadEmr"
        :data="uploadData"
        multiple
        :on-progress="upload"
        :before-upload="checkType"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传pdf文件，且不超过5MB
        </div>
      </el-upload>
    </div>
    <el-button @click="download">下载</el-button>
    <el-button @click="preview">预览</el-button>
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
export default {
  data() {
    return {
      url: "",
      allowUpload: false,
      uploadData: {
        uploader: 0,
        owner: 0,
        name: "",
      },
      name: ""
    }
  },

  methods: {
    upload(e,file) {
      console.log(file);
      console.log(e);
      this.uploadData.name = file.name;
    },

    preview() {
      this.$router.push({name : "preview", params: {
        url: this.url
      }});
    },

    async download() {
      const res = await this.$http.get("/getFile");
      console.log(res.data); 
      let blob = new Blob([res.data], {
        type: "application/pdf"
      });
      let url = window.URL.createObjectURL(blob);
      let ele = document.createElement("a");
      ele.style.display = "none";
      ele.href = url;
      this.url = res.data;
      ele.download = "测试下载";
      document.querySelectorAll("body")[0].appendChild(ele);
      ele.click();
      ele.remove();
    },

    checkType(file) {
      const typeArray = file.name.split(".");
      if(typeArray[typeArray.length - 1] == "pdf") {
        this.allowUpload = true;
      }
      else {
        this.allowUpload = false;
        this.$message({
          type: "error",
          message: "只能选择pdf文件"
        })
      }
      return this.allowUpload;
    }
  }
};
</script>
