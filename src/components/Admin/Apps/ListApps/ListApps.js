import {Card, Divider, Button, Row, Col, Drawer} from 'antd';
import {AppstoreAddOutlined, EditOutlined} from '@ant-design/icons';
import {useState, useEffect} from 'react';
import AddApp from '../AddApp';
import {LOGOS_APPS_PATH} from '../../../../api/config';
import './ListApps.scss';
import EditApp from '../EditApp';

export default function ListApps (props) {
  const {data, reloadApps} = props;
  const {Meta} = Card;
  var rows = [], rowElements = [], ri = 0, index = 1;
  const elements4row = 5;

  data.forEach ((e, i) => {
    if (index < elements4row) {
      index++;
      rows[ri] = rowElements;
    } else {
      rowElements = [];
      index = 2;
      ri++;
    }
    rowElements.push (e);
  });

  const [isVisibleDrawer, setIsVisibleDrawer] = useState (false);
  const [titleDrawer, setTitleDrawer] = useState ('');
  const [drawerContent, setDrawerContent] = useState (null);
  const [appSelected, setAppSelected] = useState ({
    name: '',
    description: '',
    isSecure: false,
    typePlatform: '',
    versionAPI: '',
    avatar: '',
  });

  const addApp = () => {
    setTitleDrawer ('Create');
    setIsVisibleDrawer (true);
    setDrawerContent (<AddApp reloadApps={reloadApps} />);
  };

  useEffect (
    () => {
      if (appSelected && appSelected._id) {
        setTitleDrawer ('Edit');
        setIsVisibleDrawer (true);
        setDrawerContent (
          <EditApp
            appSelected={appSelected}
            reloadApps={reloadApps}
          />
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [appSelected]
  );

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
            <>
            <Row gutter={16}>
              {r.map ((e, ie) => {
                return (
                  <Col span={6}>
                    <Card
                      cover={
                        <img
                          alt={e.name}
                          src={LOGOS_APPS_PATH + '/' + e.avatar}
                        />
                      }
                      actions={[<EditOutlined key="edit" onClick={() => setAppSelected(e)}/>]}
                    >
                      <Meta title={e.name} description={e.description} />
                    </Card>
                  </Col>
                );
              })}
            </Row>
            <Divider />
            </>
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
          setAppSelected ({
            name: '',
            description: '',
            isSecure: false,
            typePlatform: '',
            versionAPI: '',
            avatar: '',
          });
        }}
        destroyOnClose="true"
        height="500"
      >
        {drawerContent}
      </Drawer>
    </div>
  );
}
