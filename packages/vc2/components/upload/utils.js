/**
 * 上传文件方法
 * @param {Object} options
 * @param {'GET'|'POST'} options.method 请求方式
 * @param {string} options.action
 * @param {string} options.name 文件名
 * @param {Blob} options.file 文件信息
 * @param {Function} options.onError 错误时触发
 * @param {Function} options.onSuccess 成功回调
 * @param {Function} options.onProgress 进度变化时回调
 */
export function uploadFile(options) {
  let FD = new FormData()

  FD.append(options.name, options.file)

  let xhr = new XMLHttpRequest()

  xhr.onreadystatechange = () => {
    console.log('state change:', xhr.readyState)
    if (xhr.readyState == 4) {
      console.log('Done!')
    }
  }

  xhr.addEventListener('error', e => {
    options.onError && options.onError(e)
  })

  xhr.onload = evt => {
    file.__status = 'uploaded'
    this.onSuccess &&
      this.onSuccess({
        res: JSON.parse(evt.target.response), // 服务器返回信息
        file, // 上传文件
        list: this.fileList // 当前文件列表
      })
  }

  if (xhr.upload) {
    xhr.upload.addEventListener('progress', e => {
      file.__status = 'uploading'
      file.__progress = e.total > 0 ? (e.loaded / e.total) * 100 : 0
    })
  }

  xhr.open(options.method, options.action, true)

  xhr.send(FD)

  return xhr
}
