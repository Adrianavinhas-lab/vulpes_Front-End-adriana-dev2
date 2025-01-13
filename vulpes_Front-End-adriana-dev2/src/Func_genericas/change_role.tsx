import { func_print } from "./func_print";

export function ChangeRole(auth: any, navigate: any) {



  try {
    if (auth.user?.roles.length === 2) {
      auth.user_role === "admin"
        ? auth.func_set_user_role("tecnico")
        : auth.func_set_user_role("admin");
      navigate("/")

    }
  } catch (e) {
    func_print("ChangeRole", e, true);
  }

}
