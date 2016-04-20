"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KEY_CODE_W = 87;
var KEY_CODE_A = 65;
var KEY_CODE_S = 83;
var KEY_CODE_D = 68;
var KEY_CODE_K = 75;
var KEY_CODE_L = 76;
var KEY_CODE_UP = 38;
var KEY_CODE_DOWN = 40;
var KEY_CODE_LEFT = 37;
var KEY_CODE_RIGHT = 39;
var KEY_CODE_SHIFT = 32;
var KEY_CODE_RETURN = 13;

/**
 * 新しいControllerオブジェクトを作成する。
 * ＠class
 */

var Controller = function () {
    _createClass(Controller, null, [{
        key: "KEY_STATE_DOWN",
        get: function get() {
            return "key_state_down";
        }
    }, {
        key: "KEY_STATE_UP",
        get: function get() {
            return "key_state_up";
        }
    }, {
        key: "KEY_TYPE_UP",
        get: function get() {
            return "key_type_up";
        }
    }, {
        key: "KEY_TYPE_LEFT_UP",
        get: function get() {
            return "key_type_left_up";
        }
    }, {
        key: "KEY_TYPE_RIGHT_UP",
        get: function get() {
            return "key_type_right_up";
        }
    }, {
        key: "KEY_TYPE_DOWN",
        get: function get() {
            return "key_type_down";
        }
    }, {
        key: "KEY_TYPE_LEFT_DOWN",
        get: function get() {
            return "key_type_left_down";
        }
    }, {
        key: "KEY_TYPE_RIGHT_DOWN",
        get: function get() {
            return "key_type_right_down";
        }
    }, {
        key: "KEY_TYPE_LEFT",
        get: function get() {
            return "key_type_left";
        }
    }, {
        key: "KEY_TYPE_RIGHT",
        get: function get() {
            return "key_type_right";
        }
    }, {
        key: "KEY_TYPE_A",
        get: function get() {
            return "key_type_a";
        }
    }, {
        key: "KEY_TYPE_B",
        get: function get() {
            return "key_type_b";
        }
    }]);

    function Controller($target, cb) {
        _classCallCheck(this, Controller);

        this.$target_ = $target;
        this.callBackFunction_ = cb;
        //
        this.isPressedKeyUp_ = false;
        this.isPressedKeyLeftUp_ = false;
        this.isPressedKeyRightUp_ = false;
        this.isPressedKeyLeft_ = false;
        this.isPressedKeyRight_ = false;
        this.isPressedKeyDown_ = false;
        this.isPressedKeyLeftDown_ = false;
        this.isPressedKeyRightDown_ = false;
        this.isPressedKeyA_ = false;
        this.isPressedKeyB_ = false;
        this.$window_ = $(window);
        this.startTouchEvent_ = null;
        this.endTouchEvent_ = null;
        this.mouseLeaveEvent_ = null;
        if (0 <= navigator.userAgent.search(/iPhone/)) {
            this.startTouchEvent_ = "touchstart";
            this.endTouchEvent_ = "touchend";
        } else {
            this.startTouchEvent_ = "mousedown";
            this.endTouchEvent_ = "mouseup";
            this.mouseLeaveEvent_ = "mouseleave";
        }
    }

    _createClass(Controller, [{
        key: "addListener",
        value: function addListener() {
            var _this = this;

            if (!this.callBackFunction_) return;
            //
            this.$target_.each(function (i, element) {
                $(element).on("click", function (e) {
                    _this.onClick_(e);
                });
                $(element).on(_this.startTouchEvent_, function (e) {
                    _this.onStartTouch_(e);
                });
                $(element).on(_this.endTouchEvent_, function (e) {
                    _this.onEndTouch_(e);
                });
                if (_this.mouseLeaveEvent_) {
                    $(element).on(_this.mouseLeaveEvent_, function (e) {
                        _this.onEndTouch_(e);
                    });
                }
            });
            this.$window_.on("keydown", function (e) {
                _this.onKeyDown_(e);
            });
            this.$window_.on("keyup", function (e) {
                _this.onKeyUp_(e);
            });
        }
    }, {
        key: "removeListener",
        value: function removeListener() {
            var _this2 = this;

            if (!this.callBackFunction_) return;
            //
            this.$target_.each(function (i, element) {
                $(element).off("click", function (e) {
                    _this2.onClick_(e);
                });
                $(element).off(_this2.startTouchEvent_, function (e) {
                    _this2.onStartTouch_(e);
                });
                $(element).off(_this2.endTouchEvent_, function (e) {
                    _this2.onEndTouch_(e);
                });
                if (_this2.mouseLeaveEvent_) {
                    $(element).off(_this2.mouseLeaveEvent_, function (e) {
                        _this2.onEndTouch_(e);
                    });
                }
            });
            this.$window_.off("keydown", function (e) {
                _this2.onKeyDown_(e);
            });
            this.$window_.off("keyup", function (e) {
                _this2.onKeyUp_(e);
            });
        }
    }, {
        key: "onClick_",
        value: function onClick_(e) {
            e.preventDefault();
        }
    }, {
        key: "onStartTouch_",
        value: function onStartTouch_(e) {
            e.preventDefault();
            switch ($(e.currentTarget).attr("data-id")) {
                case Controller.KEY_TYPE_UP:
                    this.isPressedKeyUp_ = true;
                    this.callBackFunction_(Controller.KEY_STATE_UP, Controller.KEY_TYPE_UP);
                    break;
                case Controller.KEY_TYPE_LEFT_UP:
                    this.isPressedKeyLeftUp_ = true;
                    this.callBackFunction_(Controller.KEY_STATE_UP, Controller.KEY_TYPE_LEFT_UP);
                    break;
                case Controller.KEY_TYPE_RIGHT_UP:
                    this.isPressedKeyRightUp_ = true;
                    this.callBackFunction_(Controller.KEY_STATE_UP, Controller.KEY_TYPE_RIGHT_UP);
                    break;
                case Controller.KEY_TYPE_DOWN:
                    this.isPressedKeyDown_ = true;
                    this.callBackFunction_(Controller.KEY_STATE_UP, Controller.KEY_TYPE_DOWN);
                    break;
                case Controller.KEY_TYPE_LEFT_DOWN:
                    this.isPressedKeyLeftDown_ = true;
                    this.callBackFunction_(Controller.KEY_STATE_UP, Controller.KEY_TYPE_LEFT_DOWN);
                    break;
                case Controller.KEY_TYPE_RIGHT_DOWN:
                    this.isPressedKeyRightDown_ = true;
                    this.callBackFunction_(Controller.KEY_STATE_UP, Controller.KEY_TYPE_RIGHT_DOWN);
                    break;
                case Controller.KEY_TYPE_LEFT:
                    this.isPressedKeyLeft_ = true;
                    this.callBackFunction_(Controller.KEY_STATE_UP, Controller.KEY_TYPE_LEFT);
                    break;
                case Controller.KEY_TYPE_RIGHT:
                    this.isPressedKeyRight_ = true;
                    this.callBackFunction_(Controller.KEY_STATE_UP, Controller.KEY_TYPE_RIGHT);
                    break;
                case Controller.KEY_TYPE_A:
                    this.isPressedKeyA_ = true;
                    this.callBackFunction_(Controller.KEY_STATE_UP, Controller.KEY_TYPE_A);
                    break;
                case Controller.KEY_TYPE_B:
                    this.isPressedKeyB_ = true;
                    this.callBackFunction_(Controller.KEY_STATE_UP, Controller.KEY_TYPE_B);
                    break;
            }
        }
    }, {
        key: "onEndTouch_",
        value: function onEndTouch_(e) {
            e.preventDefault();
            switch ($(e.currentTarget).attr("data-id")) {
                case Controller.KEY_TYPE_UP:
                    if (!this.isPressedKeyUp_) return;
                    this.isPressedKeyUp_ = false;
                    this.callBackFunction_(Controller.KEY_STATE_DOWN, Controller.KEY_TYPE_UP);
                    break;
                case Controller.KEY_TYPE_LEFT_UP:
                    if (!this.isPressedKeyLeftUp_) return;
                    this.isPressedKeyLeftUp_ = false;
                    this.callBackFunction_(Controller.KEY_STATE_DOWN, Controller.KEY_TYPE_LEFT_UP);
                    break;
                case Controller.KEY_TYPE_RIGHT_UP:
                    if (!this.isPressedKeyRightUp_) return;
                    this.isPressedKeyRightUp_ = false;
                    this.callBackFunction_(Controller.KEY_STATE_DOWN, Controller.KEY_TYPE_RIGHT_UP);
                    break;
                case Controller.KEY_TYPE_DOWN:
                    if (!this.isPressedKeyDown_) return;
                    this.isPressedKeyDown_ = false;
                    this.callBackFunction_(Controller.KEY_STATE_DOWN, Controller.KEY_TYPE_DOWN);
                    break;
                case Controller.KEY_TYPE_LEFT_DOWN:
                    if (!this.isPressedKeyLeftDown_) return;
                    this.isPressedKeyLeftDown_ = false;
                    this.callBackFunction_(Controller.KEY_STATE_DOWN, Controller.KEY_TYPE_LEFT_DOWN);
                    break;
                case Controller.KEY_TYPE_RIGHT_DOWN:
                    if (!this.isPressedKeyRightDown_) return;
                    this.isPressedKeyRightDown_ = false;
                    this.callBackFunction_(Controller.KEY_STATE_DOWN, Controller.KEY_TYPE_RIGHT_DOWN);
                    break;
                case Controller.KEY_TYPE_LEFT:
                    if (!this.isPressedKeyLeft_) return;
                    this.isPressedKeyLeft_ = false;
                    this.callBackFunction_(Controller.KEY_STATE_DOWN, Controller.KEY_TYPE_LEFT);
                    break;
                case Controller.KEY_TYPE_RIGHT:
                    if (!this.isPressedKeyRight_) return;
                    this.isPressedKeyRight_ = false;
                    this.callBackFunction_(Controller.KEY_STATE_DOWN, Controller.KEY_TYPE_RIGHT);
                    break;
                case Controller.KEY_TYPE_A:
                    if (!this.isPressedKeyA_) return;
                    this.isPressedKeyA_ = false;
                    this.callBackFunction_(Controller.KEY_STATE_DOWN, Controller.KEY_TYPE_A);
                    break;
                case Controller.KEY_TYPE_B:
                    if (!this.isPressedKeyB_) return;
                    this.isPressedKeyB_ = false;
                    this.callBackFunction_(Controller.KEY_STATE_DOWN, Controller.KEY_TYPE_B);
                    break;
            }
        }
    }, {
        key: "onKeyDown_",
        value: function onKeyDown_(e) {
            switch (e.keyCode) {
                case KEY_CODE_LEFT:
                case KEY_CODE_A:
                    this.callBackFunction_(Controller.KEY_STATE_UP, Controller.KEY_TYPE_LEFT);
                    break;
                case KEY_CODE_UP:
                case KEY_CODE_W:
                    this.callBackFunction_(Controller.KEY_STATE_UP, Controller.KEY_TYPE_UP);
                    break;
                case KEY_CODE_RIGHT:
                case KEY_CODE_D:
                    this.callBackFunction_(Controller.KEY_STATE_UP, Controller.KEY_TYPE_RIGHT);
                    break;
                case KEY_CODE_DOWN:
                case KEY_CODE_S:
                    this.callBackFunction_(Controller.KEY_STATE_UP, Controller.KEY_TYPE_DOWN);
                    break;
                case KEY_CODE_K:
                case KEY_CODE_SHIFT:
                case KEY_CODE_RETURN:
                    this.callBackFunction_(Controller.KEY_STATE_UP, Controller.KEY_TYPE_A);
                    break;
                case KEY_CODE_L:
                    this.callBackFunction_(Controller.KEY_STATE_UP, Controller.KEY_TYPE_B);
                    break;
            }
        }
    }, {
        key: "onKeyUp_",
        value: function onKeyUp_(e) {
            switch (e.keyCode) {
                case KEY_CODE_LEFT:
                case KEY_CODE_A:
                    this.callBackFunction_(Controller.KEY_STATE_DOWN, Controller.KEY_TYPE_LEFT);
                    break;
                case KEY_CODE_UP:
                case KEY_CODE_W:
                    this.callBackFunction_(Controller.KEY_STATE_DOWN, Controller.KEY_TYPE_UP);
                    break;
                case KEY_CODE_RIGHT:
                case KEY_CODE_D:
                    this.callBackFunction_(Controller.KEY_STATE_DOWN, Controller.KEY_TYPE_RIGHT);
                    break;
                case KEY_CODE_DOWN:
                case KEY_CODE_S:
                    this.callBackFunction_(Controller.KEY_STATE_DOWN, Controller.KEY_TYPE_DOWN);
                    break;
                case KEY_CODE_K:
                case KEY_CODE_SHIFT:
                case KEY_CODE_RETURN:
                    this.callBackFunction_(Controller.KEY_STATE_DOWN, Controller.KEY_TYPE_A);
                    break;
                case KEY_CODE_L:
                    this.callBackFunction_(Controller.KEY_STATE_DOWN, Controller.KEY_TYPE_B);
                    break;
            }
        }
    }]);

    return Controller;
}();

exports.default = Controller;