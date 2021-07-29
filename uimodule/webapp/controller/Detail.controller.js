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

	return Controller.extend("com.te.pollutionTracker.controller.Detail", {

        onInit: function () {
            var oOwnerComponent = this.getOwnerComponent();

            this.oRouter = oOwnerComponent.getRouter();
            this.oModel = oOwnerComponent.getModel();

            this.oRouter.getRoute("master").attachPatternMatched(this._onSelectedCountry, this);
            this.oRouter.getRoute("detail").attachPatternMatched(this._onSelectedCountry, this);
        },

        _onSelectedCountry: function (oEvent) {
            this._country = oEvent.getParameter("arguments").country || this._country || "0";
            var stateModel = new JSONModel("https://c9542d7f-7fe6-4ab7-865f-110f70712153.mock.pstmn.io/state?country=" + this._country);
            stateModel.setSizeLimit(1000);
            this.getView().setModel(stateModel, "states");
        },

        onStatePress: function (oEvent) {
            var oState = oEvent.getSource().getBindingContext("states").getObject().state;
            this.oRouter.navTo("city", {
                layout: LayoutType.ThreeColumnsMidExpanded,
                state: oState,
                country: this._country
            });
        },

        onEditToggleButtonPress: function () {
            var oObjectPage = this.getView().byId("ObjectPageLayout"),
                bCurrentShowFooterState = oObjectPage.getShowFooter();

            oObjectPage.setShowFooter(!bCurrentShowFooterState);
        },

        onExit: function () {
            this.oRouter.getRoute("master").dettachPatternMatched(this._onSelectedCountry, this);
            this.oRouter.getRoute("detail").dettachPatternMatched(this._onSelectedCountry, this);
        }

	});
});