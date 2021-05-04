import { Form, Input, Row, Col, Radio, Checkbox } from 'antd';
import getEnumerateValue from '@/tools/enumerate';
import { forwardRef, Ref, useImperativeHandle } from 'react';
import { makeStyles } from '@material-ui/styles';

//类型
interface IProps {
  opt: IFormOpt;
}

export interface IRef {
  init: (item: any) => void;
  confirm: () => Record<string, any> | undefined;
  clean: () => void;
}

export interface IFormOpt {
  //数据树
  colums: IFormColumItem[];
  //布局
  col?: number;
  //布局间隔
  gutter?: number | [number, number];
  //标签长度
  labelWidth?: number;
}

interface IFormColumItem {
  label: string;
  name: string;
  rules?: Record<string, any>[];
  type: string;
  col?: number;
  [propName: string]: any;
}

//样式
const useStyles = makeStyles({
  'custom-form': {
    '& .ant-form-item': {
      marginBottom: 22,
    },
    '& .ant-form-item-with-help': {
      marginBottom: 0,
    },
    '& .ant-form-item-explain': {
      minHeight: 22,
      height: 22,
    },
  },
});

const CustomForm = (props: IProps, ref: Ref<IRef>) => {
  const [form] = Form.useForm();
  const classes = useStyles();
  const components = {
    input: ({ attrs }: any) => <Input {...attrs} />,
    radio: ({ attrs }: any) => <Radio.Group {...attrs}></Radio.Group>,
    check: ({ attrs }: any) => <Checkbox.Group {...attrs}></Checkbox.Group>,
  };
  useImperativeHandle(ref, () => ({
    init: handleInitForm,
    confirm: handleConfirm,
    clean: handleClean,
  }));

  //初始化表单
  const handleInitForm = (item: any) => {
    if (item) {
      form.setFieldsValue(item);
    } else {
      form.setFieldsValue({});
    }
  };

  //清空表单
  const handleClean = () => {
    form.resetFields();
  };

  //确认表单
  const handleConfirm = () => {
    return form
      .validateFields()
      .then((res) => {
        return res;
      })
      .catch(() => {
        return undefined;
      });
  };

  return (
    <Form
      form={form}
      labelCol={{ style: { width: props.opt.labelWidth || 70 } }}
      className={classes['custom-form']}
    >
      <Row gutter={props.opt.gutter || 0}>
        {props.opt.colums.map((item) => {
          const col = item.col || props.opt.col || 24;
          const c = getEnumerateValue(components, item.type);
          return (
            <Col span={col} key={item.label}>
              <Form.Item label={item.label} name={item.name} rules={item.rules}>
                {c && c(item)}
              </Form.Item>
            </Col>
          );
        })}
      </Row>
    </Form>
  );
};

export default forwardRef(CustomForm);
