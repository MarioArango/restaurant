import { useEffect, useState } from 'react';
import { PlusOutlined, SaveOutlined, UserOutlined } from '@ant-design/icons';
import { Upload, Modal, Form, Row, Col, Input, Button, message, Card } from 'antd';
import { requiredField, cardProps, getBase64, currencyOnly } from '../../util/config';
import { rxAddDishes } from '../../apis';

const { Item } = Form
const FormDish = (props) => {
  //TODO: PROPS INHERID INSTANCE COMPONENT
  const { 
    view,
    setView,
    dishSelected,
    setDishSelected
  } = props;

  //TODO: STATE OWN COMPONENT
  const [loadingAddDish, setLoadingAddDish] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([])

  //TODO: METHODS INHERID ANT DESIGN
  const [ form ] = Form.useForm();
  const { validateFields, resetFields, setFieldsValue } = form;

  //TODO: SAVE DISH FORM
  const handleSaveDish = () => {
    validateFields().then((values) => {
      const sPhotoDish = fileList[0]?.thumbUrl;
      if(sPhotoDish){
        setLoadingAddDish(true)
        const dish = {
          sPhoto: sPhotoDish?? '',
          sName: values.sName?? '',
          sType: values.sType?? '',
          nPrice: values.nPrice? Number(values.nPrice) : 0,
          nQuantity: 0
        } 
        if(dishSelected){

        }else {
            rxAddDishes(dish, () => {
              setLoadingAddDish(false)
              setFileList([])
              resetFields()
            })
        }
      }else {
        message.warning("Ingrese una imagen del plato.")
      }
    }).catch(_ => {
      message.error("Error del servidor.")
    })
  }

  //TODO: DESIGN UPLOAD PHOTO
   const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{marginTop: 8,}}>
        Cargar imagen
      </div>
    </div>
  )

  //TODO: VERIFY SIZE AND TYPE IMAGE
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

  //TODO: STATE FILE 
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  //TODO: SHOW PREVIEW IMAGE DISH'S PHOTO 
   const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  }

  //TODO: CLOSE PREVIEW IMAGE DISH'S PHOTO
   const handleCancelPreview = () => setPreviewVisible(false);

   //TODO: CLOSE FORM DISH
   const handleCancel = () => {
    setDishSelected(null);
    setPreviewVisible(false);
    setView(false);
   }

   useEffect(() => {
    if(dishSelected && view){
        setPreviewImage(dishSelected.sPhoto)
        setFieldsValue({
            sName: dishSelected.sName,
            sType: dishSelected.sType,
            nPrice: dishSelected.nPrice
        })
    }
   }, [dishSelected])
  
  return (
    <>
        {
            view && (
            <Modal
                title={dishSelected? "Editar Plalto" : "Registrar Usuario"}
                visible={view}
                bodyStyle={{ padding: 10 }}
                width="350px"
                onCancel={handleCancel}
                footer={null}
                maskClosable={false}
                destroyOnClose
                loading={loadingAddDish}
            >
                <Card
                    {...cardProps}
                    hoverable
                    style={{width: 240}}
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
                                <Item label="Imagenes del plato." rules={requiredField}>
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
                                    <Input rules={requiredField}/>
                                </Item>
                            </Col>
                            <Col span={24}>
                                <Item label="Tipo" name="sType">
                                    <Input/>
                                </Item>
                            </Col>
                            <Col span={24}>
                                <Item label="Precio" name="nPrice">
                                    <Input onKeyDown={currencyOnly} rules={requiredField}/>
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
                    onCancel={handleCancelPreview}
                    >
                    <img alt="Imagen del plato."style={{width: '100%'}} src={previewImage}/>
                </Modal>
            </Modal>
        )}       
    </>
  )
}

export default FormDish;