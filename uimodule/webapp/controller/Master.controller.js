/* eslint-disable no-trailing-spaces */
sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/f/LayoutType"
], function(
	Controller,
	JSONModel,
	LayoutType
) {
	"use strict";

	return Controller.extend("com.te.pollutionTracker.controller.Master", {
        
        onInit: function () {
            var oCountriesModel = new JSONModel("https://c9542d7f-7fe6-4ab7-865f-110f70712153.mock.pstmn.io/countries");
            oCountriesModel.setSizeLimit(1000);
            this.getView().setModel(oCountriesModel, "countries");
            this.oRouter = this.getOwnerComponent().getRouter();
        },

        onCountryPress: function () {
            var getFCLRef = this.getView().getParent().getParent();
            getFCLRef.setLayout(LayoutType.TwoColumnsMidExpanded);
        }

	});
});