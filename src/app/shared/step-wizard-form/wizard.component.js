"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var wizard_step_component_1 = require("./wizard-step.component");
var WizardComponent = (function () {
    function WizardComponent() {
        this.txtBtnPrevious = 'Previous';
        this.txtBtnNext = 'Next';
        this.txtBtnDone = 'Done';
        this.isActiveBtnDone = false; // ตอนกดบันทึก step สุดท้ายจะให้ปุ่มบันทึกกับปุ่มย้อนกลับหายไปรึป่าว ถ้าเป็น false จะหายไป ถ้าเป็น true จะไม่หาย (ดูที่โปรเจ็ค PMSgoal)
        this.isActiveFirstStep = 0;
        this._steps = [];
        this._isCompleted = false;
        this.onStepChanged = new core_1.EventEmitter();
    }
    WizardComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.wizardSteps.forEach(function (step) { return _this._steps.push(step); });
        this.steps[this.isActiveFirstStep].isActive = true;
    };
    Object.defineProperty(WizardComponent.prototype, "steps", {
        get: function () {
            return this._steps.filter(function (step) { return !step.hidden; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardComponent.prototype, "isCompleted", {
        get: function () {
            return this._isCompleted = this.isActiveBtnDone;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardComponent.prototype, "activeStep", {
        get: function () {
            return this.steps.find(function (step) { return step.isActive; });
        },
        set: function (step) {
            if (step !== this.activeStep && !step.isDisabled) {
                this.activeStep.isActive = false;
                step.isActive = true;
                this.onStepChanged.emit(step);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardComponent.prototype, "activeStepIndex", {
        get: function () {
            return this.steps.indexOf(this.activeStep);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardComponent.prototype, "hasNextStep", {
        get: function () {
            return this.activeStepIndex < this.steps.length - 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardComponent.prototype, "hasPrevStep", {
        get: function () {
            return this.activeStepIndex > 0;
        },
        enumerable: true,
        configurable: true
    });
    WizardComponent.prototype.goToStep = function (step) {
        if (!this.isCompleted) {
            this.activeStep = step;
        }
    };
    WizardComponent.prototype.next = function () {
        if (this.hasNextStep) {
            var nextStep = this.steps[this.activeStepIndex + 1];
            this.activeStep.onNext.emit();
            nextStep.isDisabled = false;
            this.activeStep = nextStep;
        }
    };
    WizardComponent.prototype.previous = function () {
        if (this.hasPrevStep) {
            var prevStep = this.steps[this.activeStepIndex - 1];
            this.activeStep.onPrev.emit();
            prevStep.isDisabled = false;
            this.activeStep = prevStep;
        }
    };
    WizardComponent.prototype.complete = function () {
        this.activeStep.onComplete.emit();
        // this._isCompleted = true;
        this._isCompleted = this.isActiveBtnDone;
    };
    return WizardComponent;
}());
__decorate([
    core_1.ContentChildren(wizard_step_component_1.WizardStepComponent),
    __metadata("design:type", core_1.QueryList)
], WizardComponent.prototype, "wizardSteps", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], WizardComponent.prototype, "txtBtnPrevious", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], WizardComponent.prototype, "txtBtnNext", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], WizardComponent.prototype, "txtBtnDone", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], WizardComponent.prototype, "isActiveBtnDone", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], WizardComponent.prototype, "isActiveFirstStep", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], WizardComponent.prototype, "onStepChanged", void 0);
WizardComponent = __decorate([
    core_1.Component({
        selector: 'form-wizard',
        template: "<div class=\"card\">\n    <div class=\"card-header\">\n      <ul class=\"nav nav-justified\">\n        <li class=\"nav-item\"\n            *ngFor=\"let step of steps\"\n            [ngClass]=\"{'active': step.isActive, 'enabled': !step.isDisabled, 'disabled': step.isDisabled, 'completed': isCompleted}\">\n          <a (click)=\"goToStep(step)\">{{step.title}}</a>\n        </li>\n      </ul>\n    </div>\n    <div class=\"card-block\">\n      <ng-content></ng-content>\n    </div>\n    <div class=\"card-footer\" [hidden]=\"isCompleted\">\n        <button type=\"button\" class=\"btn btn-info float-left\" (click)=\"previous()\" [hidden]=\"!hasPrevStep || !activeStep.showPrev\">{{txtBtnPrevious}}</button>\n        <button type=\"button\" class=\"btn btn-info float-right\" (click)=\"next()\" [disabled]=\"!activeStep.isValid\" [hidden]=\"!hasNextStep || !activeStep.showNext\">{{txtBtnNext}}</button>\n        <button type=\"button\" class=\"btn btn-info float-right\" (click)=\"complete()\" [disabled]=\"!activeStep.isValid\" [hidden]=\"hasNextStep\">{{txtBtnDone}}</button>\n    </div>\n  </div>",
        styles: [
            '.card { height: 100%; }',
            '.card-header { background-color: #fff; padding: 0; font-size: 1.25rem; }',
            '.card-block { overflow-y: auto; }',
            '.card-footer { background-color: #fff; border-top: 0 none; }',
            '.nav-item { padding: 1rem 0rem; border-bottom: 0.5rem solid #ccc; }',
            '.active { font-weight: bold; color: black; border-bottom-color: #1976D2 !important; }',
            '.enabled { cursor: pointer; border-bottom-color: rgb(88, 162, 234); }',
            '.disabled { color: #ccc; }',
            '.completed { cursor: default; }'
        ]
    }),
    __metadata("design:paramtypes", [])
], WizardComponent);
exports.WizardComponent = WizardComponent;
//# sourceMappingURL=wizard.component.js.map