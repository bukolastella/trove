import {
  faColumns,
  faHandHoldingUsd,
  faSignOutAlt,
  faTimes,
  faUser,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import classes from "./SideBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "../../store/page-slice";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/dist/client/router";
import { RootState } from "../../store";

interface Props {
  menuState: boolean;
  closeMenu: () => void;
}
const SideBar: React.FC<Props> = ({ menuState, closeMenu }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pagePath = useSelector((state: RootState) => state.page.pagePath);
  const auth = getAuth();
  const user = auth.currentUser;
  const closeHandler = () => {
    closeMenu();
  };
  const changePage = (data: string) => {
    dispatch(pageActions.setPagePath(data));
    closeHandler();
  };
  return (
    <>
      <div className={`${classes.Sidebar} ${menuState && classes.menuState}`}>
        <div className={classes.SidebarHeader}>
          <span className={classes.Iconflex}>
            <FontAwesomeIcon icon={faUser} size="3x" />
            <span onClick={closeHandler}>
              <FontAwesomeIcon icon={faTimes} size="2x" />
            </span>
          </span>

          <div>{`Hello, ${user?.displayName}`}</div>
          <span>Welcome back to Trove</span>
        </div>

        <div
          className={`${classes.SidebarFlex} ${
            pagePath === "/dashboard" && classes.active
          }`}
          onClick={() => changePage("/dashboard")}
        >
          <FontAwesomeIcon icon={faColumns} />
          <span>dashboard</span>
        </div>

        <div
          className={`${classes.SidebarFlex} ${
            pagePath === "/loan" && classes.active
          }`}
          onClick={() => changePage("/loan")}
        >
          <FontAwesomeIcon icon={faHandHoldingUsd} />
          <span>loans</span>
        </div>
        <div
          className={`${classes.SidebarFlex} ${
            pagePath === "/update" && classes.active
          }`}
          onClick={() => changePage("/update")}
        >
          <FontAwesomeIcon icon={faUserEdit} />
          <span>profile</span>
        </div>
        <div
          className={classes.SidebarFlex}
          onClick={() => {
            auth.signOut();
            router.push("/");
            dispatch(pageActions.setLoadingState(false));
          }}
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span>logout</span>
        </div>
      </div>
      {menuState && <div className={classes.Overlay} onClick={closeMenu}></div>}
    </>
  );
};

export default SideBar;
