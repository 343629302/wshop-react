//获取枚举的值(该方法专门获取对象里面的值)
const getEnumerateValue = (enumerate: any, key: string) => {
  let val;
  for (let item in enumerate) {
    if (item === key) {
      val = enumerate[item];
      break;
    }
  }
  return val;
};

export default getEnumerateValue;
