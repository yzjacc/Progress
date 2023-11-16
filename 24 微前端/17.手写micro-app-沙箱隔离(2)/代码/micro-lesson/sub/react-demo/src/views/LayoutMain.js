import { MailOutlined, SettingOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Menu, Layout } from 'antd';
import { Outlet,Link,useLocation } from 'react-router-dom';

const { Header, Content } = Layout;
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem(<Link to="/">首页</Link>, '/', <MailOutlined />),
  getItem(<Link to="/about">关于</Link>, '/about', <AppstoreOutlined />),
  getItem(<Link to="/info">信息</Link>, '/info', <SettingOutlined />)
];

function LayoutMain() {
  const location = useLocation();
  const pathname = location.pathname;
  const onClick = (e) => {
    console.log('click ', e);
  };
  return (
    <>
      <Layout>
        <Header>
          <Menu
            theme="dark"
            onClick={onClick}
            selectedKeys={[pathname]}
            mode="horizontal"
            items={items}
          />
        </Header>
        <Content style={{textAlign: 'center',backgroundColor:'#011528'}}>
          <Outlet />
        </Content>
      </Layout>
    </>
    
  );
}

export default LayoutMain;