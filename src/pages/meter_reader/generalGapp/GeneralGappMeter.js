var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
var GeneralGappMeter = (function () {
    function GeneralGappMeter(navCtrl, navParams, http, loadingCtrl, nativeStorage, alert) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.nativeStorage = nativeStorage;
        this.alert = alert;
        // Get Host
        this.nativeStorage.getItem('rootHost').then(function (data) {
            _this.host = data.host;
        });
        this.selectedSchedule = navParams.get('item');
        this.nik = navParams.get('nik');
        this.initialize();
    }
    GeneralGappMeter.prototype.initialize = function () {
        this.meter = { print_black: 0, print_color: 0, miss_copy_bw: 0, print_copy_color: 0, total: 0 };
    };
    GeneralGappMeter.prototype.calc = function () {
        var count = Math.floor(this.meter.print_black) + Math.floor(this.meter.miss_copy_bw) + Math.floor(this.meter.print_copy_color) + Math.floor(this.meter.print_color);
        this.meter.total = count;
    };
    GeneralGappMeter.prototype.save = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        var alert = this.alert.create({
            title: 'Are you sure ?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: function () {
                        console.log('canceling input meter');
                    }
                }, {
                    text: 'Yes',
                    handler: function () {
                        loading.present();
                        var detailMeter = [{
                                name: 'print_black',
                                qty: _this.meter.print_black
                            }, {
                                name: 'print_color',
                                qty: _this.meter.print_color
                            }, {
                                name: 'miss_copy_bw',
                                qty: _this.meter.miss_copy_bw
                            }, {
                                name: 'print_copy_color',
                                qty: _this.meter.print_copy_color,
                            }, {
                                name: 'total',
                                qty: _this.meter.total
                            }];
                        var sendMeter = {
                            id_contract: _this.selectedSchedule.id_contract,
                            banner_option: _this.selectedSchedule.machineType.type,
                            nik: _this.nik,
                            detail: detailMeter,
                            id_schedule_customer: _this.selectedSchedule.id_schedule_customer
                        };
                        _this.http.post(_this.host + 'MeterCtrl/insertMeter/', JSON.stringify(sendMeter))
                            .subscribe(function (data) {
                            _this.http.get(_this.host + 'MeterCtrl/updateSchedule/' + _this.selectedSchedule.id_schedule_customer, {})
                                .subscribe(function (res) {
                                loading.dismiss();
                                _this.initialize();
                                _this.navCtrl.popToRoot();
                            });
                        });
                    }
                }
            ]
        }); // Alert
        alert.present();
    };
    return GeneralGappMeter;
}());
GeneralGappMeter = __decorate([
    Component({
        templateUrl: 'GeneralGappMeter.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Http, LoadingController, NativeStorage, AlertController])
], GeneralGappMeter);
export { GeneralGappMeter };
//# sourceMappingURL=GeneralGappMeter.js.map