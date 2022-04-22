<template>
    <div class="canvas-container">
        <canvas v-for="page in pages" :id="'the-canvas'+page" :key="page">
        </canvas>
    </div>
</template>
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
      this.previewUrl = "http://localhost:3000/getFile";
      this._loadFile(this.previewUrl);
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
        }
    }
};
</script>
<style lang="scss" scoped>
.canvas-container{
    margin: 0 auto;
    width: 80%;
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