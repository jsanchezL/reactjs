import {Card, Divider, Button, Row, Col, Drawer} from 'antd';
import {AppstoreAddOutlined, EditOutlined} from '@ant-design/icons';
import {useState, useEffect} from 'react';
import AddApp from '../AddApp';
import {LOGOS_APPS_PATH} from '../../../../api/config';

export default function ListApps (props) {
  const {data, reloadApps} = props;
  const {Meta} = Card;
  var rows = [], rowElements = [], ri = 0;

  data.forEach ((e, i) => {
    var index = i + 1;

    if (!(index % 5)) {
      ri++;
      rowElements = [];
    }

    rowElements.push (e);
    rows[ri] = rowElements;
  });

  const [isVisibleDrawer, setIsVisibleDrawer] = useState (false);
  const [titleDrawer, setTitleDrawer] = useState ('');
  const [drawerContent, setDrawerContent] = useState (null);

  const addApp = () => {
    setTitleDrawer ('Create');
    setIsVisibleDrawer (true);
    setDrawerContent (<AddApp reloadApps={reloadApps} />);
  };

  return (
    <div>
      <Row>
        <Col span={24} style={{textAlign: 'right'}}>
          <Button
            icon={<AppstoreAddOutlined />}
            type="primary"
            size="small"
            onClick={() => addApp ()}
          >
            Add App
          </Button>
        </Col>
      </Row>
      <Divider />
      <div className="site-card-wrapper">
        {rows.map ((r, ir) => {
          return (
            <Row gutter={16}>
              {r.map ((e, ie) => {
                return (
                  <Col span={6}>
                    <Card
                      style={{height: 300}}
                      cover={
                        <img
                          alt={e.name}
                          src={LOGOS_APPS_PATH + '/' + e.avatar}
                        />
                      }
                      actions={[<EditOutlined key="edit" />]}
                    >
                      <Meta title={e.name} description={e.description} />
                    </Card>
                  </Col>
                );
              })}
            </Row>
          );
        })}
      </div>
      <Drawer
        placement="top"
        visible={isVisibleDrawer}
        key="top"
        title={titleDrawer}
        onClose={() => {
          setIsVisibleDrawer (false);
          setTitleDrawer ('');
          // setUserSelected ({
          //   name: '',
          //   lastname: '',
          //   email: '',
          //   isAdmin: false,
          //   status: '',
          //   avatar: '',
          // });
        }}
        destroyOnClose="true"
        height="500"
      >
        {drawerContent}
      </Drawer>
    </div>
  );
}
