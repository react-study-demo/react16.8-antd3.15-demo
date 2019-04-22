/**
 * 路由组件文件
 *
 */
// import Loadable from 'react-loadable';
// import Loading from './widget/Loading';
import Icons from './ui/Icons';
import Buttons from './ui/Buttons';
import AllPeopleList from './ui/AllPeopleList';
import EditPeople from './ui/EditPeople';
import Dashboard from '../container/dashboard/index.js';

// const WysiwygBundle = Loadable({
//   // 按需加载富文本配置
//   loader: () => import('./ui/Wysiwyg'),
//   loading: Loading
// });

export default {
  Icons,
  Buttons,
  Dashboard, // 后台首页
  AllPeopleList, // 所有人员列表
  EditPeople // 编辑人员
  // WysiwygBundle
};
