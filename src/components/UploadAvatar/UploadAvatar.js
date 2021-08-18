import {Avatar} from 'antd';
import {useDropzone} from 'react-dropzone';
import {useState, useCallback, useEffect} from 'react';
import noAvatar from '../../assets/img/png/noavatar.png';

export default function UploadAvatar (props) {
  const {avatar, setAvatar} = props;
  const [avatarUrl, setAvatarUrl] = useState (null);

  useEffect (
    () => {
      if (avatar) {
        if (avatar.preview) {
          setAvatarUrl (avatar.preview);
        } else {
          setAvatarUrl (avatar);
        }
      } else {
        setAvatarUrl (null);
      }
    },
    [avatar]
  );

  const onDrop = useCallback (
    acceptedFiles => {
      const file = acceptedFiles[0];
      if (file) {
        setAvatar ({
          file,
          preview: URL.createObjectURL (file),
        });
      }
    },
    [setAvatar]
  );

  const {getRootProps, getInputProps, isDragActive} = useDropzone ({
    accept: 'image/jpeg, image/png',
    noKeyboard: true,
    onDrop,
  });

  return (
    <div className="myAvatar" {...getRootProps ()}>
      <input {...getInputProps ()} />
      {isDragActive
        ? <Avatar size={150} src={noAvatar} />
        : <Avatar size={150} src={avatarUrl ? avatarUrl : noAvatar} />}
    </div>
  );
}
