<template>
  <div class="vc-upload">
    <input
      ref="input"
      type="file"
      :multiple="multiple"
      :name="name"
      @change="fileChangeEvt"
    />
    <Avatar v-if="type === 'avatar'" v-bind="$attrs" @selectFile="selectFile" />
    <FileList
      v-else
      :list="fileList"
      @remove="remove"
      @selectFile="selectFile"
      @uploadFile="uploadFile"
    >
      <template v-if="$slots.target" #target>
        <slot name="target" />
      </template>

      <template v-if="$slots.default" #default>
        <slot />
      </template>
    </FileList>
  </div>
</template>

<script>
import FileList from './fileList.vue'
import Avatar from './avatar.vue'

export default {
  name: 'VcUpload',
  components: {
    FileList,
    Avatar
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
    },
    // 最大上传个数
    limit: {
      type: Number,
      default: Infinity
    },
    // 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。
    beforeRemove: {
      type: Function,
      default: null
    },
    // 删除完成时触发
    onRemove: {
      type: Function,
      default: null
    },
    // 超出文件大小时触发，返回超出大小的文件列表
    onExceedSize: {
      type: Function,
      default: null
    },
    // 超出指定上传大小时触发
    onExceedLimit: {
      type: Function,
      default: null
    },
    // 上传成功时触发
    onSuccess: {
      type: Function,
      default: null
    },
    // 默认展示文件列表
    defaultFiles: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      fileList: []
    }
  },
  mounted() {
    this.updateFileList()
  },
  methods: {
    updateFileList() {
      this.fileList = this.defaultFiles.map(file => {
        return {
          file: file.url,
          name: file.name
        }
      })
    },
    fileChangeEvt(evt) {
      let { files } = evt.target
      let exceedSize = []
      let hasExceedLimit = false
      let fileList = []

      for (let i = 0; i < files.length; i++) {
        let file = files[i]
        let size = file.size / 1024 / 1024
        let status = 'ready'
        let total = this.fileList.length + fileList.length

        if (total >= this.limit) {
          hasExceedLimit = true
        } else {
          if (size > this.maxSize) {
            status = 'error'
            exceedSize.push(file)
          }

          fileList.push({
            file: file,
            name: file.name,
            __progress: 0,
            __status: status
          })
        }
      }

      if (exceedSize.length) {
        // 返回超出大小的文件列表
        this.onExceedSize &&
          this.onExceedSize({
            list: exceedSize, // 超出大小的文件数组
            size: exceedSize.length // 总共超出的个数
          })
        return
      }

      if (hasExceedLimit) {
        // 超出上传限制
        this.onExceedLimit &&
          this.onExceedLimit({
            files, // 当前选中文件
            list: this.fileList // 目前已经上传文件å
          })
        return
      }
      // 在没有错误情况下，更新文件列表
      this.fileList = this.fileList.concat(fileList)

      if (this.autoUpload && !hasExceedLimit) {
        this.uploadFile()
      }
    },

    uploadFile() {
      if (!this.action) {
        console.error('[Upload Cpmponent Error] 没有上传地址')
        this.$emit('error', '没有上传地址')
        return
      }

      this.fileList.forEach(file => {
        if (file.__status === 'ready') this.sendFile(file)
      })
    },

    sendFile(file) {
      let FD = new FormData()
      FD.append(this.name, file.file)

      let xhr = new XMLHttpRequest()
      xhr.open('POST', this.action, true)
      xhr.onreadystatechange = () => {
        console.log('state change:', xhr.readyState)
        if (xhr.readyState == 4) {
          console.log('Done!')
        }
      }
      xhr.onerror = evt => {
        console.error('[VC Error]', evt, file.name)
        this.$emit('error', file, this.fileList)
        file.__status = 'error'
      }
      xhr.onload = evt => {
        file.__status = 'uploaded'
        this.onSuccess &&
          this.onSuccess({
            res: JSON.parse(evt.target.response), // 服务器返回信息
            file, // 上传文件
            list: this.fileList // 当前文件列表
          })
      }
      xhr.onprogress = evt => {
        file.__status = 'uploading'

        if (evt.lengthComputable) {
          file.__progress = (evt.loaded / evt.total) * 100
        }
      }
      xhr.send(FD)
    },

    async remove(item, index) {
      let result = true
      console.log(item, index)
      if (this.beforeRemove) {
        result = this.beforeRemove(item)
      }

      if (result instanceof Promise) {
        result
          .then(() => {
            this.fileList.splice(index, 1)
            this.onRemove && this.onRemove({ file: item })
          })
          .catch(() => {
            // .ignore
          })
      } else {
        result && this.fileList.splice(index, 1)
        result && this.onRemove && this.onRemove({ file: item })
      }
    },

    selectFile() {
      this.$refs.input.click()
    }
  }
}
</script>
