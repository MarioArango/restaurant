import { useState } from 'react'
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { Upload, Modal, Form, Row, Col, Input, Button, message, Card } from 'antd'
import { requiredField, cardProps, getBase64, currencyOnly } from '../../util/config'
import { rxAddDishes } from '../../apis';


const { Item } = Form

const AddDish = () => {

  const [loadingAddDish, setLoadingAddDish] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([])

  const [ form ] = Form.useForm()
  const { validateFields, resetFields } = form

  /**
   * ---------------
   * SAVE DISH FORM
   * ---------------
   */
  const handleSaveDish = (e) => {
    validateFields().then((values) => {
      const sPhotoDish = fileList[0]?.thumbUrl;
      if(sPhotoDish){
        setLoadingAddDish(true)
        const dish = {
          sPhoto: sPhotoDish?? '',
          sName: values.sName?? '',
          sType: values.sType?? '',
          nPrice: values.nPrice?? 0,
          nQuantity: 0
        } 
        rxAddDishes(dish, () => {
          setLoadingAddDish(false)
          setFileList([])
          resetFields()
        })
      }else {
        message.warning("Ingrese una foto.")
      }
    }).catch(_ => {
      message.error("Error del servidor.")
    })
  }

  /**
   * -------------
   * UPLOAD PHOTO
   * -------------
   */
   const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  )

   const beforeUpload  = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('Solo puedes cargar imagenes de tipo JPG/PNG')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Imagen debes menor a 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  /**
   * -----------
   * SHOW MODAL
   * -----------
   */
   const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  }

   const handleCancel = () => setPreviewVisible(false);
  
  return (
    <div>
      <Card
        {...cardProps}
        hoverable
        style={{
          width: 240,
        }}
        loading={loadingAddDish}
        bordered
      >
        <Form
          name="form-save-dish"
          form={form}
          onFinish={handleSaveDish}
          layout="vertical"
        >
          <Row gutter={12}>
            <Col xs={24} sm={24} md={24} lg={12}>
              <Item label="Imagenes del plato." required={requiredField}>
                <Upload
                  name="sPhoto"
                  listType="picture-card"
                  accept=".pdf,.png,.jpg"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  beforeUpload={beforeUpload}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
              </Item>
            </Col>
            <Col span={24}>
              <Item label="Nombre" name="sName">
                <Input required={requiredField}/>
              </Item>
            </Col>
            <Col span={24}>
              <Item label="Tipo" name="sType">
                <Input/>
              </Item>
            </Col>
            <Col span={24}>
              <Item label="Precio" name="nPrice">
                <Input onKeyDown={currencyOnly} required={requiredField}/>
              </Item>
            </Col>
            <Col span={24}>
              <Button htmlType='submit' type='primary'><SaveOutlined />Agregar</Button>
            </Col>
          </Row>
        </Form>
      </Card>
      <Modal 
          visible={previewVisible} 
          title={previewTitle} 
          footer={null} 
          onCancel={handleCancel}
        >
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </div>
    
  )
}

export default AddDish