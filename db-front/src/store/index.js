import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import persist from './persist.js'

export default createStore({
  state: {
    dbConnect:{
      host: "",
      port : "",
      db : "",
      user : "",
      pw : ""
    },
    uploadScan : true,
    joinSingle : true,
    joinMulti : true,
    tableSchema :{
      /*
        CREATE TABLE `attr_dic` (
       `id` int(11) DEFAULT NULL,
        `attr` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
        PRIMARY KEY (`attr`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci

        insert into attr_dic values(null, '학업정보');
        insert into attr_dic values(null, '금융정보');
        insert into attr_dic values(null, '회원정보');
        insert into attr_dic values(null, '건강정보');

        insert into key_dic values(null, '주민등록번호');
        insert into key_dic values(null, '전화번호');
        insert into key_dic values(null, '차량번호');
        insert into key_dic values(null, '이메일 주소');
        insert into key_dic values(null, 'IP주소');

        CREATE TABLE `key_dic` (
        `id` int(11) DEFAULT NULL,
        `key_attr` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
        PRIMARY KEY (`key_attr`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      */

      one : "CREATE TABLE IF NOT EXISTS `1_fitness_measurement` ("
        +"`PHONE_NUM` text COLLATE utf8_bin DEFAULT NULL,"
        +"`MAIL_ADDR` text COLLATE utf8_bin DEFAULT NULL,"
        +"`TEST_CNT` int(11) DEFAULT NULL,"
        +"`CENTER_NM` text COLLATE utf8_bin DEFAULT NULL,"
        +"`AGE_GBN` text COLLATE utf8_bin DEFAULT NULL,"
        +"`TEST_GBN` text COLLATE utf8_bin DEFAULT NULL,"
        +"`TEST_AGE` int(11) DEFAULT NULL,"
        +"`INPUT_GBN` text COLLATE utf8_bin DEFAULT NULL,"
        +"`CERT_GBN` text COLLATE utf8_bin DEFAULT NULL,"
        +"`TEST_YMD` int(11) DEFAULT NULL,"
        +"`TEST_SEX` text COLLATE utf8_bin DEFAULT NULL"
        +") ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;",

      two : "CREATE TABLE IF NOT EXISTS `2_physical_instructor_practice_info` ("
        +"`TEL_NO` text COLLATE utf8_bin DEFAULT NULL,"
        +"`EMAIL_ADDRESS` text COLLATE utf8_bin DEFAULT NULL,"
        +"`OPERTN_YEAR` int(11) DEFAULT NULL,"
        +"`QUALF_GRAD_NM` text COLLATE utf8_bin DEFAULT NULL,"
        +"`CRSE_NM` text COLLATE utf8_bin DEFAULT NULL,"
        +"`EMPR_NO` text COLLATE utf8_bin DEFAULT NULL,"
        +"`PRCTTQ_TOT_SCORE` int(11) DEFAULT NULL,"
        +"`ORSTT_TOT_SCORE` int(11) DEFAULT NULL,"
        +"`PRCTTQ_PSEXAM_FLAG_NM` text COLLATE utf8_bin DEFAULT NULL,"
        +"`LAST_PSEXAM_AT` text COLLATE utf8_bin DEFAULT NULL,"
        +"`QUALF_ITEM_NM` text COLLATE utf8_bin DEFAULT NULL"
        +") ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;",

      three : "CREATE TABLE IF NOT EXISTS `3_physical_instructor_writing_info` ("
        +"`TEL_NUM` text COLLATE utf8_bin DEFAULT NULL,"
        +"`MAIL_ADDR` text COLLATE utf8_bin DEFAULT NULL,"
        +"`OPERTN_YEAR` int(11) DEFAULT NULL,"
        +"`QUALF_GRAD_NM` text COLLATE utf8_bin DEFAULT NULL,"
        +"`CRSE_NM` text COLLATE utf8_bin DEFAULT NULL,"
        +"`EMPR_NO` text COLLATE utf8_bin DEFAULT NULL,"
        +"`WRTNG_TOT_SCORE` int(11) DEFAULT NULL,"
        +"`WRTNG_PSEXAM_FLAG_NM` text COLLATE utf8_bin DEFAULT NULL,"
        +"`LAST_PSEXAM_AT` text COLLATE utf8_bin DEFAULT NULL,"
        +"`QUALF_ITEM_NM` text COLLATE utf8_bin DEFAULT NULL"
        +") ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;",

      four : "CREATE TABLE IF NOT EXISTS `4_census_income` ("
        +"`phone_number` text COLLATE utf8_bin DEFAULT NULL,"
        +"`email_address` text COLLATE utf8_bin DEFAULT NULL,"
        +"`age` int(11) DEFAULT NULL,"
        +"`workclass` text COLLATE utf8_bin DEFAULT NULL,"
        +"`fnlwgt` int(11) DEFAULT NULL,"
        +"`education` text COLLATE utf8_bin DEFAULT NULL,"
        +"`education_num` int(11) DEFAULT NULL,"
        +"`marital_status` text COLLATE utf8_bin DEFAULT NULL,"
        +"`occupation` text COLLATE utf8_bin DEFAULT NULL,"
        +"`relationship` text COLLATE utf8_bin DEFAULT NULL,"
        +"`race` text COLLATE utf8_bin DEFAULT NULL,"
        +"`sex` text COLLATE utf8_bin DEFAULT NULL,"
        +"`capital_gain` int(11) DEFAULT NULL,"
        +"`capital_loss` int(11) DEFAULT NULL,"
        +"`hours_per_week` int(11) DEFAULT NULL,"
        +"`native_country` text COLLATE utf8_bin DEFAULT NULL"
        +") ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;",

      five : "CREATE TABLE IF NOT EXISTS `5_bank_marketing` ("
        +"`contect_num` text COLLATE utf8_bin DEFAULT NULL,"
        +"`contect_mail` text COLLATE utf8_bin DEFAULT NULL,"
        +"`age` int(11) DEFAULT NULL,"
        +"`job` text COLLATE utf8_bin DEFAULT NULL,"
        +"`marital` text COLLATE utf8_bin DEFAULT NULL,"
        +"`education` text COLLATE utf8_bin DEFAULT NULL,"
        +"`df` text COLLATE utf8_bin DEFAULT NULL,"
        +"`balance` int(11) DEFAULT NULL,"
        +"`housing` text COLLATE utf8_bin DEFAULT NULL,"
        +"`loan` text COLLATE utf8_bin DEFAULT NULL,"
        +"`contact` text COLLATE utf8_bin DEFAULT NULL,"
        +"`day` int(11) DEFAULT NULL,"
        +"`month` text COLLATE utf8_bin DEFAULT NULL,"
        +"`duration` int(11) DEFAULT NULL,"
        +"`campaign` int(11) DEFAULT NULL,"
        +"`pdays` int(11) DEFAULT NULL,"
        +"`previous` int(11) DEFAULT NULL"
        +") ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;"
    }
  },
  
  modules:{
    persist : persist
  },
  plugins:[
    createPersistedState()
  ]
})