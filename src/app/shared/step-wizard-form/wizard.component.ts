import { Component, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit, Input } from '@angular/core';
import { WizardStepComponent } from './wizard-step.component';


@Component({
  selector: 'form-wizard',
  template:
  `<div class="card">
    <div class="card-header">
      <ul class="nav nav-justified">
        <li class="nav-item"
            *ngFor="let step of steps"
            [ngClass]="{'active': step.isActive, 'enabled': !step.isDisabled, 'disabled': step.isDisabled, 'completed': isCompleted}">
          <a (click)="goToStep(step)">{{step.title}}</a>
        </li>
      </ul>
    </div>
    <div class="card-block">
      <ng-content></ng-content>
    </div>
    <div class="card-footer" [hidden]="isCompleted">
        <button type="button" class="btn btn-secondary float-start" (click)="previous()" [hidden]="!hasPrevStep || !activeStep.showPrev">{{txtBtnPrevious}}</button>
        <button type="button" class="btn btn-secondary float-end" (click)="next()" [disabled]="!activeStep.isValid" [hidden]="!hasNextStep || !activeStep.showNext">{{txtBtnNext}}</button>
        <button type="button" class="btn btn-success float-end" [ngStyle]="{'display':styleDisplayVisabledBtbDone}" (click)="complete()" [disabled]="!activeStep.isValid" [hidden]="hasNextStep">{{txtBtnDone}}</button>
    </div>
  </div>`
  ,
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
})
export class WizardComponent implements AfterContentInit {
  @ContentChildren(WizardStepComponent)
  wizardSteps: QueryList<WizardStepComponent>;
  @Input()
  txtBtnPrevious = 'Previous';

  @Input()
  txtBtnNext = 'Next';

  @Input()
  txtBtnDone = 'Done';

  @Input()
  isActiveBtnDone = false;   // ????????????????????????????????? step ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? ????????????????????? false ????????????????????? ????????????????????? true ???????????????????????? (???????????????????????????????????? PMSgoal)

  @Input()
  isActiveFirstStep = 0;    // ?????????????????????????????????????????????step ????????????????????????????????????????????????????????? step ?????????

  @Input()
  styleDisplayVisabledBtbDone = 'block'

  private _steps: Array<WizardStepComponent> = [];
  private _isCompleted = false;

  @Output()
  onStepChanged: EventEmitter<WizardStepComponent> = new EventEmitter<WizardStepComponent>();

  constructor() { }

  ngAfterContentInit() {
    this.wizardSteps.forEach(step => this._steps.push(step));
    this.steps[this.isActiveFirstStep].isActive = true;
  }

  get steps(): Array<WizardStepComponent> {
    return this._steps.filter(step => !step.hidden);
  }

  get isCompleted(): boolean {
    return this._isCompleted = this.isActiveBtnDone;
  }

  get activeStep(): WizardStepComponent {
    return this.steps.find(step => step.isActive);
  }

  set activeStep(step: WizardStepComponent) {
    if (step !== this.activeStep && !step.isDisabled) {
      this.activeStep.isActive = false;
      step.isActive = true;
      this.onStepChanged.emit(step);
    }
  }

  public get activeStepIndex(): number {
    return this.steps.indexOf(this.activeStep);
  }

  get hasNextStep(): boolean {
    return this.activeStepIndex < this.steps.length - 1;
  }

  get hasPrevStep(): boolean {
    return this.activeStepIndex > 0;
  }

  public goToStep(step: WizardStepComponent): void {
    if (!this.isCompleted) {
      this.activeStep = step;
    }
  }

  public next(): void {
    if (this.hasNextStep) {
      let nextStep: WizardStepComponent = this.steps[this.activeStepIndex + 1];
      this.activeStep.onNext.emit();
      nextStep.isDisabled = false;
      this.activeStep = nextStep;
    }
  }

  public previous(): void {
    if (this.hasPrevStep) {
      let prevStep: WizardStepComponent = this.steps[this.activeStepIndex - 1];
      this.activeStep.onPrev.emit();
      prevStep.isDisabled = false;
      this.activeStep = prevStep;
    }
  }

  public complete(): void {
    this.activeStep.onComplete.emit();
    // this._isCompleted = true;
    this._isCompleted = this.isActiveBtnDone
  }

  

}
