import login_unit_test from "./login.test";
import register_unit_test from "./register.test";
import { Express } from 'express';


function auth_test(app: Express) {
  describe(" ================== Authentication system ====================== \n",  ()=> {
    register_unit_test(app);
    //login_unit_test(app);
  })  
}

export default auth_test