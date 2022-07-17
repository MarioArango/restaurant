import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteTwoTone, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import convert from 'client-side-image-resize';
import { Upload, Modal, Form, Row, Col, Input, Button, message, Tooltip, Select } from 'antd';
import { requiredField, currencyOnly } from '../../util/config';
import { rxAddDishes, rxUpdateDish, rxDishSelected, rxShowFormDishes } from '../../appRedux/actions';

const { Item } = Form;
const { Option } = Select;

const FormDish = () => {
  //TODO: REDUX STATE
  const { 
    dishSelected,
    showFormDishes,
    loadingAddDish,
    loadingUpdateDish
  } = useSelector(state => state.get("dishes"));

  const { authSucursal } = useSelector(state => state.get("users"));

  const dispatch = useDispatch();

  //TODO: STATE OWN COMPONENT
  const [fileList, setFileList] = useState([])
  const [fileB64, setFileB64] = useState("")

  //TODO: METHODS INHERID ANT DESIGN
  const [ form ] = Form.useForm();
  const { validateFields, resetFields, setFieldsValue } = form;

  //TODO: SAVE DISH FORM
  const handleSaveDish = () => {
    validateFields().then((values) => {
      if(fileB64){
        const dish = {
          sPhoto: fileB64?? '',
          sName: values.sName?? '',
          sType: values.sType?? '',
          nPrice: values.nPrice? Number(values.nPrice) : 0,
          nQuantity: 0,
          nIdBranchOffice: authSucursal
        } 
        console.log(dish, "dish")
        if(dishSelected){
          dispatch(rxUpdateDish(dishSelected.nIdDish, dish, () => {
            setFileList([])
            resetFields()
          }))
        }else {
          dispatch(rxAddDishes(dish, () => {
              setFileList([])
              resetFields()
            }))
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
    const isJpgOrPng = file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/jpeg'
    if (!isJpgOrPng) {
      message.error('Solo puedes cargar imagenes de tipo JPG/PNG/JPEG')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Imagen debes menor a 2MB!')
    }

    if(isJpgOrPng && isLt2M){
      changeSizeImage(file)
    }

    return isJpgOrPng && isLt2M
  }

  const changeSizeImage = (img) => {
    convert({ 
      file: img,  
      width: 300, 
      height: 300,
      type: 'jpg'
      }).then(resp => {
        const reader = new FileReader();
        reader.onload = function () {
          const base64String = reader.result;
          setFileB64(base64String)
        }
        reader.readAsDataURL(resp);
      })
  }

  //TODO: STATE FILE 
  const handleChange = async ({ fileList: newFileList }) => {
    if(newFileList.length === 0){
      setFileB64("")
    }
    setFileList(newFileList)
  }

   //TODO: CLOSE FORM DISH
   const handleCancel = () => {
    dispatch(rxDishSelected (null));
    dispatch(rxShowFormDishes(false));
   }

   useEffect(() => {
    if(dishSelected && showFormDishes){
      setFileB64(dishSelected.sPhoto);
      setFieldsValue({
          sName: dishSelected.sName,
          sType: dishSelected.sType,
          nPrice: dishSelected.nPrice
      });
    }
    // eslint-disable-next-line
   }, [dishSelected])

  return (
    <>
        {
            showFormDishes && (
            <Modal
                title={dishSelected? "Editar Plato" : "Registrar Plato"}
                visible={showFormDishes}
                bodyStyle={{ padding: 10 }}
                width="350px"
                onCancel={handleCancel}
                footer={null}
                maskClosable={false}
                destroyOnClose
                loading={loadingAddDish || loadingUpdateDish}
            >
                <Form
                    name="form-save-dish"
                    form={form}
                    onFinish={handleSaveDish}
                    layout="vertical"
                >
                    <Row gutter={12}>
                        <Col span={24}>
                            <Item rules={requiredField}>
                              {
                                  fileB64 ?
                                  <div>
                                    <Tooltip title="Eliminar imagen.">
                                      <Button 
                                      className='ml-[298px]'
                                        onClick={() => {
                                          setFileB64("")
                                          setFileList([])
                                        }}
                                        icon={<DeleteTwoTone twoToneColor="#ed4956"/>}
                                      />
                                    </Tooltip>
                                    <img src={fileB64} alt="Imagen del plato"/>
                                  </div>
                                  :
                                  <div className='ml-[115px]'>
                                    <Upload
                                    name="sPhoto"
                                    listType="picture-card"
                                    accept=".png,.jpg,.jpeg"
                                    fileList={fileList}
                                    onChange={handleChange}
                                    beforeUpload={beforeUpload}
                                  >
                                    {fileList.length >= 1 ? null : uploadButton}
                                  </Upload>
                                  </div>
                                }
                            </Item>
                        </Col>
                        <Col>
                        </Col>
                        <Col span={24}>
                            <Item label="Nombre" name="sName">
                                <Input rules={requiredField}/>
                            </Item>
                        </Col>
                        <Col span={24}>
                            <Item label="Tipo" name="sType">
                                <Select>
                                    <Option value="comida">Comida</Option>
                                    <Option value="bebida">Bebida</Option>
                                </Select>
                            </Item>
                        </Col>
                        <Col span={24}>
                            <Item label="Precio" name="nPrice">
                                <Input onKeyDown={currencyOnly} rules={requiredField}/>
                            </Item>
                        </Col>
                        <Col span={24}>
                            <Button block className='bg-primary' htmlType='submit' type='primary'><SaveOutlined />Agregar</Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        )}       
    </>
  )
}

export default FormDish;