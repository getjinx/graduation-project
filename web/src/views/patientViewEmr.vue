<template>
  <div class="background">
    <div class="top">
      <div class="cancel">
        <i class="el-icon-circle-close" @click="cancel"></i>
      </div>
      <p class="title">查看病历</p>
    </div>
    <div class="content">
      <div class="canvas-container">
        <canvas v-for="page in pages" :id="'the-canvas'+page" :key="page">
        </canvas>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.background {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .top {
    height: 60px;
    background: rgb(64,158,255);
    position: relative;

    .cancel {
      height: 30px;
      font-size: 25px;
      line-height: 30px;
      margin: 20px;
      color: white;
    }

    p {
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: 20px;
      transform: translate(-50%, -50%);
    }
  }

  .content {
    flex: 1;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
.canvas-container{
    margin: 0 auto;
    width: 100%;
    height: auto;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    canvas{
        height: 100vh;
    }
}
</style>
<script>
import * as PDFJS from 'pdfjs-dist/legacy/build/pdf.js';
import workerSrc from 'pdfjs-dist/build/pdf.worker.entry';
PDFJS.GlobalWorkerOptions.workerSrc = workerSrc;
export default {
    name: 'Pdf',
    data() {
        return {
            pages: 5,
            viewportX: 1,
            previewUrl: "",
        };
    },
    created() {
      console.log(this.$route.params);
      this.previewUrl = "http://localhost:3000/getFile";
      this._loadFile(this.previewUrl);
      console.log(this.previewUrl);
    },
    mounted() {
      this.viewportX = document.querySelector(".canvas-container").clientWidth;
    },
    methods: {
        _renderPage (num) {
            this.pdfDoc.getPage(num).then((page) => {
                let canvas = document.getElementById('the-canvas' + num)
                let ctx = canvas.getContext('2d')
                let dpr = window.devicePixelRatio || 1
                let bsr = ctx.webkitBackingStorePixelRatio ||
                    ctx.mozBackingStorePixelRatio ||
                    ctx.msBackingStorePixelRatio ||
                    ctx.oBackingStorePixelRatio ||
                    ctx.backingStorePixelRatio || 1
                let ratio = dpr / bsr
                let viewport = page.getViewport({scale: 1});
                canvas.width = viewport.width
                canvas.height = viewport.height * ratio
                canvas.style.width = viewport.width + "px";
                canvas.style.height = viewport.height + "px";
                ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
                let renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                }
                page.render(renderContext)
                if (this.pages > num) {
                    this._renderPage(num + 1)
                }
            })
        },
        
        _loadFile (url) {
            PDFJS.getDocument(url).promise.then((pdf) => {
                this.pdfDoc = pdf
                this.pages = this.pdfDoc.numPages
                this.$nextTick(() => {
                    this._renderPage(1);
                });
            });
        },
        
        cancel() {
          this.$router.go(-1);
        }
    },
};
</script>
