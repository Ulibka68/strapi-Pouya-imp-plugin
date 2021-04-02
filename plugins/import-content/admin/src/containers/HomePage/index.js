/*
 *
 * HomePage
 *
 */

import React, { memo, Component } from "react";
import {request} from "strapi-helper-plugin";
import PropTypes from "prop-types";
import pluginId from "../../pluginId";
import UploadFileForm from "../../components/UploadFileForm";

class HomePage extends Component {
  render() {
    return <UploadFileForm />;
  };
}
export default memo(HomePage);
