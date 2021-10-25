<template>
  <div class="home">
    <div class="upload-frame">
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png/doc/docx/pdf文件，且不超过500kb
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
export default {};
</script>
