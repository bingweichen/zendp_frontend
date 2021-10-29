import { Button, message, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

// import { modelName } from '../../pages/object/model'

const modelName = 'object'

export const CustomUpload = ({ dispatch }) => {
  const token = localStorage.getItem('token')

  const props = {
    name: 'file',
    action: '/api/image/images',
    headers: {
      authorization: 'bear ' + token,
    },

    beforeUpload: file => {

      const isPNG = file.type === "image/png" || file.type === "image/jpeg";
      if (!isPNG) {
        message.error("图片格式不正确，请修改后重新上传！", 0.8);
        return isPNG;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error(file.name + "图片大小超出限制，请修改后重新上传", 0.8);
        return isLt2M;
      }
      // const isSize = this.isSize(file);
      return isPNG && isLt2M;

      // if (file.type !== 'image/png') {
      //   message.error(`${file.name} 文件格式不正确，请上传图片`);
      // }
      // return file.type === 'image/png' ? true : Upload.LIST_IGNORE;
    },

    onChange(info) {
      if (info.file.status !== 'uploading') {
        // console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 文件上传成功`)
        dispatch({
          type: `${modelName}/successUpload`,

          payload: {
            new_image: info.file.response.data,
          },
        })
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败`)
      }
    },
  }

  return (
    <Upload {...props}>
      <Button type='primary' icon={<UploadOutlined/>}>上传图片</Button>
    </Upload>
  )
}
