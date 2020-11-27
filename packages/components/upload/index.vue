<template>
  <div class="vc-upload">
    <div class="vc-upload__btns-area">
      <vc-button color="primary">
        <input 
          type="file"
          :multiple="multiple"
          :name="name"
          @change="fileChangeEvt"
        >
        选择文件
      </vc-button>
    </div>

    {{fileList}}
    <FileList :list="fileList"/>
  </div>
</template>

<script>
import VcButton from '../button/index.vue'
import FileList from './fileList.vue'

export default {
  name: 'VcUpload',
  components: {
    FileList,
    VcButton
  },
  props: {
    action: {
      type: String,
      default: ''
    },
    maxSize: {
      type: Number,
      default: Infinity
    },
    // 展现形式 默认为 fileList(文件列表)
    type: {
      type: String,
      default: 'fileList'
    },
    // 上传的文件字段名
    name: {
      type: String,
      default: 'file'
    },
    // 是否在选取文件后立即进行上传
    autoUpload: {
      type: Boolean,
      default: true
    },
    // 是否支持多选文件
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    fileChangeEvt(evt) {
      let { files } = evt.target
      console.log(evt, files)

      for (let i = 0; i < files.length; i++) {
        this.fileList.push({
          file: files[i],
          name: files[i].name,
          __progress: 0,
          __status: 'ready'
        })
      }

      if (this.autoUpload) {
        this.uploadFile()
      }
    },

    uploadFile() {

    }
  }
}
</script>

<style lang="less">
.vc-upload {
  &__btns-area {
    .vc-button {
      position: relative;
      overflow: hidden;
    }

    input {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      opacity: 0;
      cursor: pointer;
      margin: -30px 0;
    }
  }
}
</style>