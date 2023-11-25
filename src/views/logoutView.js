import page from "../../node_modules/page/page.mjs";
import { get } from "../api.js";
import { updateNav } from "../app.js";
import { userData } from "../userDataHelper.js";




export async function logoutView() {
    await get('users/logout');
    userData.clearUserData();
    updateNav()
    page.redirect('/')
}