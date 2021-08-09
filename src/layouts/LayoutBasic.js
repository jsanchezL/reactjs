import {Layout} from 'antd';
import './LayoutBasic.scss';
import LoadRoutes from './LoadRoutes';

export default function LayoutBasic (props) {
  const {routes} = props;
  const {Header, Content, Footer} = Layout;

  return (
    <Layout>
      <h2>Menu Sider Basic</h2>
      <Layout>
        <Header>
          Header Basic
        </Header>
        <Content>
          <LoadRoutes routes={routes} />
        </Content>
        <Footer>
          JLSL
        </Footer>
      </Layout>
    </Layout>
  );
}
