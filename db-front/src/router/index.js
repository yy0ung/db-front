import { createRouter, createWebHistory } from 'vue-router';
import ConnectDB from '../views/dbConnect/ConnectDB.vue'
import UploadFile from '../views/dbConnect/UploadFile.vue'
import ScanTable from '../views/tableScan/ScanDB.vue'
import ScanTable2 from '../views/tableScan/ScanDB2.vue'
import HomePage from '../views/HomePage.vue'
import EditTable from '../views/editTable/EditTable.vue'
import JoinSingle from '../views/JoinSingle.vue'
import JoinMulti from '../views/JoinMulti.vue'
import ShowResult from '../views/ShowResult.vue'


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
    path: '/scanattr',
    name: 'ScanDB2',
    component: ScanTable2
  },
  {
    path: '/edit',
    name: 'EditTable',
    component: EditTable
  },
  {
    path: '/joinsingle',
    name: 'JoinSingle',
    component: JoinSingle
  },
  {
    path: '/joinmulti',
    name: 'JoinMulti',
    component: JoinMulti
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