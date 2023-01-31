import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonFab, ToastController } from '@ionic/angular';
import { City } from '../../models/city.model';
import { generic } from '../../models/generic.model';
import { Person } from '../../models/person.model';
import { schoolingLevel } from '../../models/schoolingLevel.model';
import { schoolingStatus } from '../../models/schoolingStatus.model';
import { State } from '../../models/state.model';
import { AuthService } from '../../services/auth.service';
import { BasicDataService } from '../../services/basic-data.service';
import { ReactiveFormsService } from 'src/app/shared/services/reactive-forms';
import { AdmissionService } from '../../services/admission.service';
import { CepIntegrationService } from '../../services/cep-integration.service';
import { CepDirectiveDirective } from '../../directive/cep-mask.directive';

@Component({
    selector: 'app-basic-data',
    templateUrl: './basic-data.component.html',
    styleUrls: ['./basic-data.component.scss'],
    providers: [ReactiveFormsService, CepIntegrationService, CepDirectiveDirective]

})
export class BasicDataComponent implements OnInit {

    @Input() address;
    @Input() admission;
    @Input() data;

    loggedInUser: Person = null;
    formBasic;
    contactsList: generic[];
    bankAccountList: generic[];
    cityList: City[];
    cityOfBirth: City[];
    contactList: generic[];
    deficiencyList: generic[];
    genderList: generic[];
    maritalStatusList: generic[];
    raceColorList: generic[];
    schoolingLevelList: schoolingLevel[];
    schoolingStatusList: schoolingStatus[];
    stateList: State[];
    stateOfBirth: State[];
    selectedCep: any;
    selectedCityName: any;


    constructor(
        private formBuilder: FormBuilder,
        private basicDataService: BasicDataService,
        private admissionService: AdmissionService,
        private toastController: ToastController,
        private alertCtrl: AlertController,
        private authService: AuthService,
        private formService: ReactiveFormsService,
        private cepService: CepIntegrationService
    ) {
    }

    ngOnInit() {
        const userData = this.authService.getUser();

        if (userData && userData.user) {

            if (userData.user.person) {
                this.loggedInUser = userData.user.person;
            }
        };

        this.formBasic = new FormGroup({
            admissionId: new FormControl(null, [
                Validators.required
            ]),
            name: new FormControl(null, [
                Validators.required
            ]),
            jobTitle: new FormControl(null, [
            ]),
            cpf: new FormControl(null, [
                Validators.required
            ]),
            bithDay: new FormControl(null, [
                Validators.required
            ]),
            deficiency: new FormControl(null, [
                Validators.required
            ]),
            gender: new FormControl(null, [
                Validators.required
            ]),
            address: new FormGroup({
                id: new FormControl(null, [
                    Validators.required
                ]),
                street: new FormControl(null, [
                    Validators.required
                ]),
                number: new FormControl(null, [
                    Validators.required
                ]),
                district: new FormControl(null, [
                    Validators.required
                ]),
                complement: new FormControl(null, [
                    Validators.required
                ]),
                zipCode: new FormControl(null, [
                    Validators.required
                ]),
                latitude: new FormControl(null, [
                ]),
                longitude: new FormControl(null, [
                ]),
                city: new FormControl(null, [
                    Validators.required
                ]),
                state: new FormControl(null, [
                    Validators.required
                ]),
            }),
            socialName: new FormControl(null, [
                Validators.required
            ]),
            raceColor: new FormControl(null, [
                Validators.required
            ]),
            fatherName: new FormControl(null, [
                Validators.required
            ]),
            motherName: new FormControl(null, [
                Validators.required
            ]),
            maritalStatus: new FormControl(null, [
                Validators.required
            ]),
            placeOfBirthCuntry: new FormControl(null, [
                Validators.required
            ]),
            placeOfBirthCityState: new FormControl(null, [
                Validators.required
            ]),
            contacts: this.formBuilder.array([]),
            bankAccount: this.formBuilder.array([]),
            schoolingList: this.formBuilder.array([]),
            emergencyContactList: this.formBuilder.array([]),
        })
        this.getInitialDataInsert()

    }

    async getInitialDataInsert() {
        this.contactsList = this.data.contactsList;
        this.bankAccountList = this.data.bankAccountList;
        this.cityList = this.data.cityList;
        this.contactList = this.data.contactList;
        this.deficiencyList = this.data.deficiencyList;
        this.genderList = this.data.genderList;
        this.maritalStatusList = this.data.maritalStatusList;
        this.raceColorList = this.data.raceColorList;
        this.schoolingLevelList = this.data.schoolingLevelList;
        this.schoolingStatusList = this.data.schoolingStatusList;
        this.stateList = this.data.stateList;
        this.stateOfBirth = this.data.stateList;

        this.formBasic.patchValue({
            admissionId: this.admission.id,
            name: this.admission.name,
            cpf: this.admission.cpf,
            bithDay: this.admission.bithDay,
            deficiency: this.admission.deficiency != null && this.admission.deficiency != undefined ? this.admission.deficiency.id : null,
            gender: this.admission.gender != null && this.admission.gender != undefined ? this.admission.gender.id : null,
            socialName: this.admission.socialName,
            raceColor: this.admission.raceColor != null && this.admission.raceColor != undefined ? this.admission.raceColor.id : null,
            fatherName: this.admission.fatherName,
            motherName: this.admission.motherName,
            maritalStatus: this.admission.maritalStatus != null && this.admission.maritalStatus != undefined ? this.admission.maritalStatus.id : null,
            placeOfBirthCuntry: this.admission.placeOfBirthCuntry,
            placeOfBirthCityState: this.admission.placeOfBirthCityState,
        })

        if (this.formBasic.get('placeOfBirthCityState').value != null && this.formBasic.get('placeOfBirthCityState').value !== undefined)
            this.getCities(this.formBasic.get('placeOfBirthCityState').value, true)

        if (this.admission.address != null) {


            this.formBasic.patchValue({
                address: this.admission.address,
            })
            if (this.admission.address != null && this.admission.address.city != null && this.admission.address.city.state != null) {
                this.formBasic.controls["address"].patchValue({
                    state: this.admission.address.city.state
                })
            }
        }

        if (this.admission.contacts.length > 0) {
            this.getContactList.clear();
            this.admission.contacts.forEach(e => this.addContact(e));
        } else {
            this.addContact(null)
        }

        if (this.admission.bankAccount.length > 0) {
            this.getBankAccountList.clear();
            this.admission.bankAccount.forEach(e => this.addBankAccount(e));
        } else {
            this.addBankAccount(null)
        }

        if (this.admission.schoolingList.length > 0) {
            this.getSchoolingList.clear();
            this.admission.schoolingList.forEach(e => this.addSchoolingList(e));
        } else {
            this.addSchoolingList(null)
        }

        if (this.admission.emergencyContactList.length > 0) {
            this.getEmergencyContact.clear();
            this.admission.emergencyContactList.forEach(e => this.addEmergencyContact(e));
        } else {
            this.addEmergencyContact(null)
        }
    }

    get getContactList() {
        return this.formBasic.controls["contacts"] as FormArray;
    }

    addContact(contacts) {
        let form;
        if (contacts == null || contacts == undefined) {
            form = this.formBuilder.group({
                id: new FormControl(0, [
                    Validators.required
                ]),
                type: new FormControl(null, [
                    Validators.required
                ]),
                value: new FormControl(null, [
                    Validators.required
                ]),
            })
        } else {
            form = this.formBuilder.group({
                id: new FormControl(contacts.id, [
                    Validators.required
                ]),
                type: new FormControl(contacts.type, [
                    Validators.required
                ]),
                value: new FormControl(contacts.value, [
                    Validators.required
                ]),
            })
        }
        this.getContactList.push(form);
    }

    delContact(index: number, contactId: number) {
        this.getContactList.removeAt(index);

        if (contactId != 0 && contactId != null) {
            this.basicDataService.removeContact(contactId).subscribe(async res => {

                if (res) {
                    const toast = await this.toastController.create({
                        message: 'Item removido com sucesso!',
                        duration: 3000,
                        color: 'success',
                        position: 'bottom',
                    });
                    toast.present();
                } else {
                    await this.showMessage('Falha', 'Não foi possível remover o item.');
                }

            })
        }
    }

    get getEmergencyContact() {
        return this.formBasic.controls["emergencyContactList"] as FormArray;
    }

    addEmergencyContact(contacts) {
        let form;
        if (contacts == null || contacts == undefined) {
            form = this.formBuilder.group({
                id: new FormControl(0, [
                    Validators.required
                ]),
                name: new FormControl(null, [
                    Validators.required
                ]),
                kinship: new FormControl(null, [
                    Validators.required
                ]),
                phoneNumber: new FormControl(null, [
                    Validators.required
                ]),
                person: new FormControl(this.loggedInUser.id, [
                    Validators.required
                ]),
            })
        } else {
            form = this.formBuilder.group({
                id: new FormControl(contacts.id, [
                    Validators.required
                ]),
                name: new FormControl(contacts.name, [
                    Validators.required
                ]),
                kinship: new FormControl(contacts.kinship, [
                    Validators.required
                ]),
                phoneNumber: new FormControl(contacts.phoneNumber, [
                    Validators.required
                ]),
                person: new FormControl(this.loggedInUser.id, [
                    Validators.required
                ]),
            })
        }
        this.getEmergencyContact.push(form);
    }

    delEmergencyContact(index: number, contactId: number) {
        this.getEmergencyContact.removeAt(index);

        if (contactId != 0 && contactId != null) {
            this.basicDataService.removeEmergencyContact(contactId).subscribe(async res => {
                if (res) {
                    const toast = await this.toastController.create({
                        message: 'Item removido com sucesso!',
                        duration: 3000,
                        color: 'success',
                        position: 'bottom',
                    });
                    toast.present();
                } else {
                    await this.showMessage('Falha', 'Não foi possível remover o item.');
                }
            })
        }
    }

    get getBankAccountList() {
        return this.formBasic.controls["bankAccount"] as FormArray;
    }

    addBankAccount(bankAccount) {
        let form;
        if (bankAccount == null || bankAccount == undefined) {
            form = this.formBuilder.group({
                id: new FormControl(0, [
                    Validators.required
                ]),
                bank: new FormControl(null, [
                    Validators.required
                ]),
                agency: new FormControl(null, [
                    Validators.required
                ]),
                accountNumber: new FormControl(null, [
                    Validators.required
                ]),
                mainAccount: new FormControl(!this.getBankAccountList.value.some(e => e.mainAccount) ? true : false
                    , []),
                type: new FormControl(null, [
                    Validators.required
                ]),
                person: new FormControl(this.loggedInUser.id, [
                    Validators.required
                ]),
            })
        } else {
            form = this.formBuilder.group({
                id: new FormControl(bankAccount.id, [
                    Validators.required
                ]),
                bank: new FormControl(bankAccount.bank, [
                    Validators.required
                ]),
                agency: new FormControl(bankAccount.agency, [
                    Validators.required
                ]),
                accountNumber: new FormControl(bankAccount.accountNumber, [
                    Validators.required
                ]),
                mainAccount: new FormControl(bankAccount.mainAccount, []),
                type: new FormControl(bankAccount.type.id, [
                    Validators.required
                ]),
                person: new FormControl(this.loggedInUser.id, [
                    Validators.required
                ]),
            })
        }

        this.getBankAccountList.push(form);
    }

    delBankAccount(index: number, accountId: number) {

        this.getBankAccountList.removeAt(index);
        if (!this.getBankAccountList.value.some(e => e.mainAccount)) {
            this.markCheckbox(false, this.getBankAccountList.value.findIndex(i => i !== undefined));
        }
        if (accountId != 0 && accountId != null) {
            this.basicDataService.removeBankAccount(accountId).subscribe(async res => {
                if (res) {
                    const toast = await this.toastController.create({
                        message: 'Item removido com sucesso!',
                        duration: 3000,
                        color: 'success',
                        position: 'bottom',
                    });
                    toast.present();
                } else {
                    await this.showMessage('Falha', 'Não foi possível remover o item.');
                }
            })
        }
    }

    markCheckbox(check: boolean, index) {
        if (check == true) {
            this.getBankAccountList.controls.forEach((e, i) => {
                if (i != index)
                    ((this.getBankAccountList).at(i) as FormGroup).get('mainAccount').patchValue(false);

            });
        } else {

            if (!this.getBankAccountList.value.some(e => e.mainAccount)) {
                ((this.getBankAccountList).at(index) as FormGroup).get('mainAccount').patchValue(true);
            }
        }


    };

    validateMainAccount() {
        if (!this.getBankAccountList.value.some(e => e.mainAccount)) {
            ((this.getBankAccountList).at(this.getBankAccountList.value.findIndex(i => i !== undefined)) as FormGroup).get('mainAccount').patchValue(true);
        }
    }

    get getSchoolingList() {
        return this.formBasic.controls["schoolingList"] as FormArray;
    }

    addSchoolingList(schooling) {
        let schoolingForm;
        if (schooling == null || schooling == undefined) {
            schoolingForm = this.formBuilder.group({
                id: new FormControl(0, [
                    Validators.required
                ]),
                course: new FormControl(null, [
                    Validators.minLength(3),
                    Validators.maxLength(150),
                    Validators.required
                ]),
                type: new FormControl(null, [
                    Validators.required
                ]),
                institution: new FormControl(null, [
                    Validators.minLength(3),
                    Validators.maxLength(150),
                    Validators.required
                ]),
                status: new FormControl(null, [
                    Validators.required
                ]),
                person: new FormControl(this.loggedInUser.id, [
                    Validators.required
                ]),
            })
        } else {
            schoolingForm = this.formBuilder.group({
                id: new FormControl(schooling.id, [
                    Validators.required
                ]),
                course: new FormControl(schooling.course, [
                    Validators.minLength(3),
                    Validators.maxLength(150),
                    Validators.required
                ]),
                type: new FormControl(schooling.type.id, [
                    Validators.required
                ]),
                institution: new FormControl(schooling.institution, [
                    Validators.minLength(3),
                    Validators.maxLength(150),
                    Validators.required
                ]),
                status: new FormControl(schooling.status.id, [
                    Validators.required
                ]),
                person: new FormControl(this.loggedInUser.id, [
                    Validators.required
                ]),
            })
        }
        this.getSchoolingList.push(schoolingForm)

    }
    delSchoolingList(index: number, schoolingId: number) {
        this.getSchoolingList.removeAt(index);

        if (schoolingId != 0 && schoolingId != null) {
            this.basicDataService.removeSchoolingList(schoolingId).subscribe(async res => {
                if (res) {
                    const toast = await this.toastController.create({
                        message: 'Item removido com sucesso!',
                        duration: 3000,
                        color: 'success',
                        position: 'bottom',
                    });
                    toast.present();

                } else {
                    await this.showMessage('Falha', 'Não foi possível remover o item.');
                }
            })
        }
    }

    getCities(name, birth: boolean) {
        let state: State;

        state = this.stateList.find(i => i.name == name)

        if (state != undefined) {
            this.basicDataService.getCities(state.id).subscribe(async (res: any) => {
                if (birth == true) {
                    this.cityOfBirth = res
                } else {
                    this.cityList = res;
                    if (this.selectedCityName != undefined && this.selectedCityName != '' && this.selectedCityName != null)
                        this.formBasic.controls["address"].patchValue({
                            city: this.cityList.find(e => e.name == this.selectedCityName),
                        });

                }
            });
        }

    }

    getCep() {
        if (this.formBasic.controls['address'].controls['zipCode'].invalid) {
            return;
        }
        if (this.selectedCep === this.formBasic.controls['address'].get('zipCode').value) {
            return;
        }
        this.selectedCep = this.formBasic.controls['address'].get('zipCode').value;
        if (this.selectedCep != null && this.selectedCep != '' && this.selectedCep != undefined && this.selectedCep.length >= 8) {
            this.selectedCityName = null;
            this.cepService.getCep(this.selectedCep).subscribe((cep) => {
                if (cep != null && cep != '') {
                    this.selectedCityName = cep.city;
                    const uf: State = this.stateList.find((x) => x.abbreviation === cep.state);
                    if (uf != undefined) {
                        this.getCities(uf.name, false);
                        this.formBasic.controls["address"].patchValue({
                            state: uf,
                            street: cep.street,
                            district: cep.neighborhood,
                        });
                    }
                }
            });
        }
    }



    save() {

        if (this.formBasic.valid) {
            this.admissionService.savePersonalInfo(this.formBasic.value).subscribe(async res => {
                if (res) {
                    const toast = await this.toastController.create({
                        message: 'Dados cadastrados efetuado com sucesso!',
                        duration: 3000,
                        color: 'success',
                        position: 'bottom',
                    });
                    toast.present();
                    this.getInitialDataInsert();
                } else {
                    await this.showMessage('Falha no cadastro', 'Não foi possível efetuar o cadastro.');
                }
            })
        } else {
            this.formService.validateAllFormFields(this.formBasic);
        }

    }

    compareFn(optionOne, optionTwo): boolean {
        return optionOne.id === optionTwo.id;
    }

    private async showMessage(title: string, message: string) {
        const alert = await this.alertCtrl.create({
            header: title, message, buttons: ['OK']
        });

        await alert.present();
    }
}
