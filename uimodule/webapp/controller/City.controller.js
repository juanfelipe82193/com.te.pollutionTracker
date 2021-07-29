/* eslint-disable no-trailing-spaces */
sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function(
	Controller,
	JSONModel
) {
	"use strict";

	return Controller.extend("com.te.pollutionTracker.controller.City", {

        onInit: function () {
            var oOwnerComponent = this.getOwnerComponent();

            this.oRouter = oOwnerComponent.getRouter();
            this.oModel = oOwnerComponent.getModel();
            this.oRouter.getRoute("master").attachPatternMatched(this._onSelectingState, this);
            this.oRouter.getRoute("detail").attachPatternMatched(this._onSelectingState, this);
            this.oRouter.getRoute("city").attachPatternMatched(this._onSelectingState, this);
        },

        _onSelectingState: function (oEvent) {
            this._country = oEvent.getParameter("arguments").country || this._country || "0";
            this._state = oEvent.getParameter("arguments").state || this._state || "0";
            var stateModel = new JSONModel("https://c9542d7f-7fe6-4ab7-865f-110f70712153.mock.pstmn.io/district?country=" + this._country + "&state=" + this._state);
            stateModel.setSizeLimit(1000);
            this.getView().setModel(stateModel, "cities");
        },

        onEditToggleButtonPress: function () {
            var oObjectPage = this.getView().byId("ObjectPageLayout"),
                bCurrentShowFooterState = oObjectPage.getShowFooter();

            oObjectPage.setShowFooter(!bCurrentShowFooterState);
        },

        onExit: function () {
            this.oRouter.getRoute("master").dettachPatternMatched(this._onSelectingState, this);
            this.oRouter.getRoute("detail").dettachPatternMatched(this._onSelectingState, this);
        }

	});
});