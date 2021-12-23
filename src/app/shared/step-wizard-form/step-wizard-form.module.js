"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var wizard_component_1 = require("./wizard.component");
var wizard_step_component_1 = require("./wizard-step.component");
__export(require("./wizard.component"));
__export(require("./wizard-step.component"));
var FormWizardCustomModule = FormWizardCustomModule_1 = (function () {
    function FormWizardCustomModule() {
    }
    FormWizardCustomModule.forRoot = function () {
        return {
            ngModule: FormWizardCustomModule_1
        };
    };
    return FormWizardCustomModule;
}());
FormWizardCustomModule = FormWizardCustomModule_1 = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule
        ],
        declarations: [
            wizard_component_1.WizardComponent,
            wizard_step_component_1.WizardStepComponent
        ],
        exports: [
            wizard_component_1.WizardComponent,
            wizard_step_component_1.WizardStepComponent
        ]
    })
], FormWizardCustomModule);
exports.FormWizardCustomModule = FormWizardCustomModule;
var FormWizardCustomModule_1;
//# sourceMappingURL=step-wizard-form.module.js.map