import { createRouter, createWebHistory } from 'vue-router';
import ConnectDB from '../views/dbConnect/ConnectDB.vue'
import UploadFile from '../views/dbConnect/UploadFile.vue'
import ScanTable from '../views/tableScan/ScanDB.vue'
import ScanTable2 from '../views/tableScan/ScanDB2.vue'
import HomePage from '../views/HomePage.vue'
import EditTable from '../views/editTable/EditTable.vue'
import EditTable2 from '../views/editTable/EditTable2.vue'
import JoinSingle from '../views/joinSingle/JoinSingle.vue'
import SJoinSource from '../views/joinSingle/SearchSingleSource'
import SJoinTarget from '../views/joinSingle/SearchSingleTarget'
import MJoinSource from '../views/joinMulti/SearchMultiSource.vue'
import MJoinTarget from '../views/joinMulti/SearchMultiTarget.vue'
import JoinMulti from '../views/joinMulti/JoinMulti.vue'
import ShowResult from '../views/showResult/ShowResult.vue'


const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/connect',
    name: 'ConnectDB',
    component: ConnectDB,
  },
  {
    path: '/uploadfile',
    name: 'uploadFile',
    component: UploadFile
  },
  {
    path: '/scan',
    name: 'ScanDB',
    component: ScanTable
  },
  {
    path: '/scanattr/:file',
    name: 'ScanDB2',
    component: ScanTable2
  },
  {
    path: '/edit',
    name: 'EditTable',
    component: EditTable
  },
  {
    path: '/editattr/:file',
    name: 'EditTable2',
    component: EditTable2
  },
  {
    path: '/joinsingle/:source/:target',
    name: 'JoinSingle',
    component: JoinSingle
  },
  {
    path: '/joinmulti/:source/:target',
    name: 'JoinMulti',
    component: JoinMulti
  },
  {
    path: '/sjoinssearch',
    name: 'SJoinSource',
    component: SJoinSource
  },
  {
    path: '/sjointsearch/:source',
    name: 'SJoinTarget',
    component: SJoinTarget
  },
  {
    path: '/mjoinssearch',
    name: 'MJoinSource',
    component: MJoinSource
  },
  {
    path: '/mjointsearch/:source',
    name: 'MJoinTarget',
    component: MJoinTarget
  },
  {
    path: '/showresult',
    name: 'ShowResult',
    component: ShowResult
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router