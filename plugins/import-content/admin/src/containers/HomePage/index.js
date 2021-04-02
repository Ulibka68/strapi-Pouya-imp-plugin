/*
 *
 * HomePage
 *
 */

import React, {memo, Component} from "react";
import {request} from "strapi-helper-plugin";
import PropTypes from "prop-types";
import pluginId from "../../pluginId";
import UploadFileForm from "../../components/UploadFileForm";

class HomePage extends Component {
  state = {
    analyzing: false,
    analysis: null
  };

  onRequestAnalysis = async analysisConfig => {
    this.analysisConfig = analysisConfig;
    this.setState({ analyzing: true }, async () => {
      try {
        const response = await request("/import-content/preAnalyzeImportFile", {
          method: "POST",
          body: analysisConfig
        });

        this.setState({ analysis: response, analyzing: false }, () => {
          strapi.notification.success(`Analyzed Successfully`);
        });
      } catch (e) {
        this.setState({ analyzing: false }, () => {
          strapi.notification.error(`Analyze Failed, try again`);
          strapi.notification.error(`${e}`);
        });
      }
    });
  };

  render() {
    return (
      <UploadFileForm
        onRequestAnalysis={this.onRequestAnalysis}
        loadingAnalysis={this.state.analyzing}
      />
    );

  };
}

export default memo(HomePage);
